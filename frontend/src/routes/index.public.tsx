import React from 'react';
import { Route } from "react-router-dom";
import { publicRoutes } from './navigation';

export default function PublicRoutes() {
    return (
        <>
            {publicRoutes.map(route => (
                <Route exact path={route.path} render={route.render} />
            ))}
        </>
    )
}