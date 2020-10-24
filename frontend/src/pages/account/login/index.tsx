import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Form as FormUi, Grid, Header, Segment } from 'semantic-ui-react';
import InputField from '../../../components/Forms/input-field';
import { useAuth } from '../../../contexts/AuthProvider';

type SubmitData = {
    login: string,
    password: string
}

export default function LoginPage() {
    const formRef = useRef<FormHandles>(null);
    const { entrar, loading, authenticated } = useAuth();
    const history = useHistory();

    function handleSubmit(data: SubmitData) {
        entrar(data.login, data.password);
    }

    if (authenticated) {
        return <Redirect to="/" />
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
                    <Header as='h2' primary textAlign='center'>
                        Entre em sua conta
                    </Header>
                    <FormUi size="large">
                        <Segment stacked>
                            <InputField
                                label="E-mail"
                                name="login"
                            />
                            <InputField
                                name="password"
                                label="Senha"
                                type="password"                                
                            />
                            <Button loading={loading} primary fluid size="large" type="submit">
                                Entrar
                            </Button>
                        </Segment>
                    </FormUi>
                </Grid.Column>
            </Grid>
        </Form>
    )
}
