import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import ReactInputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Divider, Dropdown, Form as FormUi, Grid, Header, Icon, Input, Label, List, Loader, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import EnderecoField from '../../components/Forms/endereco';
import InputField, { InputMaskField } from '../../components/Forms/input-field';
import IconButton from '../../components/IconButton';
import { useFetch } from '../../hooks/useFetch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Cliente } from '../../models/Cliente';
import { CreateClienteActions } from '../../store/modules/clientes/actions/create';
import { UpdateClienteActions } from '../../store/modules/clientes/actions/update';
import { schema } from './cliente.schema';

export default function FormClientePage() {
    const dispatch = useDispatch();
    const [telefones, setTelefones] = useState<any[]>([]);
    const [tipoTelefone, setTipoTelefone] = useState('comercial');
    const [telefone, setTelefone] = useState('');

    const [email, setEmail] = useState('');
    const [todosEmails, setTodosEmails] = useState<string[]>([]);
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const isSaving = useTypedSelector(states =>
        states.clientes.create.isRequesting || states.clientes.update.isRequesting);
    const { idCliente } = useParams<{ idCliente?: string }>();
    const { response, isLoading } = useFetch<Cliente>(idCliente ? `/clientes/${idCliente}` : undefined);

    const addTelefone = useCallback(() => {
        if (formRef.current && telefone) {
            if (!telefones || telefones.length === 0) {
                setTelefones([{ telefone, tipoTelefone }]);
            } else {
                setTelefones([...telefones, { telefone, tipoTelefone }]);
            }
            setTelefone('');
        }
    }, [telefone, tipoTelefone, formRef, telefones]);

    const addEmail = useCallback(() => {
        if (formRef.current && email) {
            if (!todosEmails || todosEmails.length === 0) {
                setTodosEmails([email]);
            } else {
                setTodosEmails([...todosEmails, email]);
            }
            setEmail('');
        }
    }, [email, formRef, todosEmails]);

    useEffect(() => {
        if (response) {
            setTelefones(response.telefones);
            setTodosEmails(response.emails);
        }
    }, [response]);

    if (idCliente && isLoading) {
        return <Loader />
    }

    async function handleSubmit(data: Cliente) {
        try {
            data.telefones = telefones;
            data.emails = todosEmails;
            formRef.current?.setErrors({});
            await schema.validate(data, {
                abortEarly: false,
            });
            if (idCliente) {
                dispatch(UpdateClienteActions.request({
                    idCliente: parseInt(idCliente),
                    data,
                    onSuccess: () => {
                        toast.success("Cliente foi atualizado com sucesso!");
                        history.push("/clientes");
                    }
                }));
            } else {
                dispatch(CreateClienteActions.request({
                    data,
                    onSuccess: () => {
                        toast.success("Um novo cliente foi adicionado com sucesso!");
                        history.push("/clientes");
                    }
                }));
            }

        } catch (error) {
            const validationErrors: any = {};
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(e => {
                    validationErrors[e.path] = e.message;
                });
                formRef.current?.setErrors(validationErrors);
            }
        }
    }
    return (
        <div>
            <Button type="button" icon labelPosition='left' as={Link} to="/clientes">
                <Icon name='arrow left' /> Voltar
            </Button>
            <Form ref={formRef} initialData={response} onSubmit={handleSubmit}>
                <FormUi size="large">
                    <Segment>
                        <FormUi.Group widths='equal'>
                            <InputField
                                label="Nome completo"
                                name="nome"
                            />
                            <InputMaskField
                                name="cpf"
                                label="CPF"
                                mask="999.999.999-99"
                            />
                        </FormUi.Group>
                        <Divider />
                        <Segment placeholder>
                            <Grid columns={2} stackable>
                                <Divider vertical>Contato</Divider>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header>E-mails</Header>
                                        <FormUi.Input
                                            label='E-mail'
                                            fluid
                                            onChange={(e, data) => setEmail(data.value)}
                                            value={email} />
                                        <Button type="button" onClick={addEmail}>Adicionar</Button>
                                        <List style={{ textAlign: 'center' }}>
                                            {todosEmails.map((em, index) => (
                                                <List.Item>
                                                    <span>
                                                        {em}
                                                        <IconButton color="red" title="Remover e-mail" style={{ display: 'inline', marginLeft: 10 }}
                                                            onClick={() => setTodosEmails(todosEmails.filter((_, indexRemover) => indexRemover !== index))}>
                                                            <FiTrash />
                                                        </IconButton>
                                                    </span>
                                                </List.Item>
                                            ))}
                                        </List>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Header>Telefones</Header>
                                        <ReactInputMask mask={tipoTelefone === 'celular' ? '(99) 99999-9999' : '(99) 9999-9999'}
                                            value={telefone}
                                            onChange={(e) => {
                                                setTelefone(e.target.value);
                                            }}>
                                            {() => (
                                                <Input
                                                    style={{ minWidth: 250 }}
                                                    placeholder='(00) 0000-0000'
                                                    fluid
                                                    labelPosition="right"
                                                    label={<Dropdown
                                                        defaultValue='comercial'
                                                        options={[
                                                            { key: 'comercial', text: 'Comercial', value: 'comercial' },
                                                            { key: 'residencial', text: 'Residencial', value: 'residencial' },
                                                            { key: 'celular', text: 'Celular', value: 'celular' },
                                                        ]}
                                                        onChange={(e: any, data) => {
                                                            setTipoTelefone(data?.value as string);
                                                        }}
                                                    />}
                                                />
                                            )}
                                        </ReactInputMask>
                                        <Button type="button" style={{ marginTop: 10 }} onClick={addTelefone}>Adicionar</Button>
                                        <List style={{ textAlign: 'center' }}>
                                            {telefones.map((tel, index) => (
                                                <List.Item>
                                                    <Label style={{ marginRight: 10 }}>
                                                        {tel.tipoTelefone}
                                                    </Label>
                                                    <span>
                                                        {tel.telefone}
                                                        <IconButton color="red" title="Remover telefone" style={{ display: 'inline', marginLeft: 10 }}
                                                            onClick={() => setTelefones(telefones.filter((_, indexRemover) => indexRemover !== index))}>
                                                            <FiTrash />
                                                        </IconButton>
                                                    </span>
                                                </List.Item>
                                            ))}
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        <Divider />
                        <Scope path="endereco">
                            <EnderecoField onCepSearched={(cep) => {
                                const dadosAtuais = formRef.current?.getData();
                                formRef.current?.setData({
                                    ...dadosAtuais,
                                    endereco: {
                                        cep: cep?.cep,
                                        uf: cep?.uf ?? '',
                                        cidade: cep?.localidade ?? '',
                                        bairro: cep?.bairro ?? '',
                                        logradouro: cep?.logradouro ?? '',
                                        complemento: cep?.complemento
                                    }
                                });
                            }} />
                        </Scope>

                        <Button loading={isSaving} primary fluid size="large" type="submit">
                            {idCliente ? "Atualizar" : "Cadastrar"} cliente
                        </Button>
                    </Segment>
                </FormUi>
            </Form>
        </div>
    )
}
