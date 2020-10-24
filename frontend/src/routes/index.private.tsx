
import React from 'react';
import { Route } from "react-router-dom";
import Allowed from '../components/Allowed';
import FormClientePage from '../pages/form-cliente';
import HomePage from '../pages/home';
export default function PrivateRoutes() {
    return (
        <>
            <Route exact path="/" render={(props: any) => <HomePage {...props} />} />
            <Route exact path="/clientes" render={(props: any) => <HomePage {...props} />} />
            <Allowed roles={["ROLE_ADMIN"]}>
                <Route exact path="/clientes/form" render={(props: any) => <FormClientePage {...props} />} />
                <Route exact path="/clientes/:idCliente/form" render={(props: any) => <FormClientePage {...props} />} />
            </Allowed>
        </>
    )
}