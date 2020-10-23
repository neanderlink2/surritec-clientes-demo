import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form as FormUi, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import InputField from '../../../components/Forms/input-field';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RegisterForm } from '../../../models/RegisterForm';
import { RegisterActions } from '../../../store/modules/account/actions/register';
import { createSchema } from './register.schema';

export default function RegisterPage() {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const isLoading = useTypedSelector(states => states.account.register.isRequesting);

    async function handleSubmit(data: RegisterForm) {        
        try {
            formRef.current?.setErrors({});
            const schema = createSchema(data.password);
            data.username = data.email;
            await schema.validate(data, {
                abortEarly: false,
            });
            dispatch(RegisterActions.request({
                data,
                onSuccess: () => {
                    toast.success("O seu cadastro foi criado com sucesso!");
                    formRef.current?.reset();
                }
            }));

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
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                    <Header as='h2' primary textAlign='center'>
                        Crie sua conta
                    </Header>
                    <FormUi size="large">
                        <Button type="button" icon labelPosition='left' onClick={() => history.push("/")}>
                            <Icon name='arrow left' />
                            Voltar
                        </Button>
                        <Segment stacked>
                            <InputField
                                name="first_name"
                                label="Primeiro nome"
                            />
                            <InputField
                                name="last_name"
                                label="Sobrenome"
                            />
                            <InputField
                                name="email"
                                label="E-mail"
                                autoComplete="off"
                            />
                            <InputField
                                name="password"
                                label="Senha"
                                type="password"
                                autoComplete="off"
                            />
                            <Message>
                                <small>
                                    Para criar sua senha, ela deve conter:
                                    <Message.List>
                                        <Message.Item>No mínimo 8 caracteres</Message.Item>
                                        <Message.Item>Deve possuir letras e um número ou um caracter especial</Message.Item>
                                        <Message.Item>Não deve possuir seu nome.</Message.Item>
                                    </Message.List>
                                </small>
                            </Message>
                            <InputField
                                name="re_password"
                                label="Confirme a sua senha"
                                type="password"
                                autoComplete="off"
                            />
                            <Button loading={isLoading} primary fluid size="large" type="submit">
                                Cadastrar
                            </Button>
                        </Segment>
                    </FormUi>
                </Grid.Column>
            </Grid>
        </Form>
    )
}
