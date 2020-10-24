import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Loader } from 'semantic-ui-react';
import { buscarCep, CEP } from '../../../services/consultarCep';
import { debounce } from '../../../utils/debounce';
import InputField, { InputMaskField } from '../input-field';
import { Endereco } from './styles';

type EnderecoFieldProps = {
    onCepSearched: (dadosLocal?: CEP) => void;
    requiredFields?: {
        cep?: boolean;
        uf?: boolean;
        cidade?: boolean;
        logradouro?: boolean;
        numero?: boolean;
        complemento?: boolean
    }
}

export default function EnderecoField({ onCepSearched, requiredFields }: EnderecoFieldProps) {
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCep() {
            setLoading(true);
            const dados = await buscarCep(cep);
            onCepSearched(dados);
            setLoading(false);
        }
        if (cep && cep.length === 8) {
            fetchCep();
        }
    }, [cep]);

    return (
        <>
            <Endereco>
                <InputMaskField
                    icon={<FiSearch />}
                    name="cep"
                    label="CEP"
                    mask="99999-999"
                    required={requiredFields?.cep}
                    type="search"
                    onChange={debounce((value: any) => {
                        setCep(value.replace(/[_]/g, '').replace(/[.]/g, '').replace(/[-]/g, ''));
                    }, 750)}
                />
                {loading && <Loader active inline style={{ marginTop: 25 }} />}
            </Endereco>
            <Endereco>
                <InputField name="uf" label="Estado" required={requiredFields?.uf} disabled={loading} />
                <InputField name="cidade" label="Cidade" required={requiredFields?.cidade} disabled={loading} />
                <InputField name="bairro" label="Bairro" required={requiredFields?.cidade} disabled={loading} />
                <InputField name="logradouro" label="Logradouro" required={requiredFields?.logradouro} disabled={loading} />
            </Endereco>
            <Endereco>
                <InputField name="numero" label="Número" required={requiredFields?.numero} disabled={loading} />
                <InputField name="complemento" label="Complemento" required={requiredFields?.complemento} disabled={loading} />
            </Endereco>
        </>
    )
}
