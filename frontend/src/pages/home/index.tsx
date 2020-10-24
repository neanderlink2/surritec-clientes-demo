import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import Allowed from '../../components/Allowed';
import { useFetch } from '../../hooks/useFetch';
import { Cliente } from '../../models/Cliente';
import { InlineContainer } from '../../styles/styles.global';
import CardCliente from './card-cliente';
import { CardContainer } from './styles';

export default function HomePage() {
    const { isLoading, response, reload } = useFetch<Cliente[]>('/clientes');
    const history = useHistory();

    if (isLoading) {
        return <span>Carregando...</span>
    }
    return (
        <div>
            <InlineContainer spaceBetween style={{ alignItems: 'center' }}>
                <Header as="h2">Clientes cadastrados</Header>
                <Allowed roles={["ROLE_ADMIN"]}>
                    <Button as={Link} animated primary to="/clientes/form">
                        <Button.Content visible>Novo</Button.Content>
                        <Button.Content hidden>
                            <FiPlus />
                        </Button.Content>
                    </Button>
                </Allowed>
            </InlineContainer>
            <CardContainer>
                {response.map(cliente => (
                    <CardCliente
                        id={cliente.id ?? 0}
                        nome={cliente.nome}
                        cidade={cliente.endereco.cidade}
                        uf={cliente.endereco.uf}
                        qtdeEmails={cliente.emails.length}
                        qtdeTelefones={cliente.telefones.length}
                        onSuccess={reload}
                    />
                ))}
            </CardContainer>
        </div>
    )
}
