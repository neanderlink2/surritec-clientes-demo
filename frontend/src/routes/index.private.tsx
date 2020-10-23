
import React from 'react';
import { Route } from "react-router-dom";
import PrivateTest from '../pages/private-test';
export default function PrivateRoutes() {
    return (
        <>
            <Route exact path="/private/test" render={(props: any) => <PrivateTest {...props} />} />
        </>
    )
}