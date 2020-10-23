import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useAuth } from '../contexts/AuthProvider'
import { useThemeToggle } from '../contexts/ThemeToggleProvider'
import Pages from '../pages'
import Login from '../pages/account/login'
import Register from '../pages/account/register'
import { GlobalStyles } from '../styles/styles.global'
import dark from '../styles/theme.dark'
import light from '../styles/theme.light'

type ModulesRoutesProps = {
    onlyAuthenticated?: boolean;
}

export default function ModulesRoutes({ onlyAuthenticated = false }: ModulesRoutesProps) {
    const { scheme } = useThemeToggle();
    const { hydrating, loading, authenticated } = useAuth();
    if (onlyAuthenticated && (!hydrating || !loading) && !authenticated) {
        return <Route exact path="*" render={(props: any) => <Login {...props} />} />
    }
    return (
        <ThemeProvider theme={scheme === 'light' ? light : dark}>
            <GlobalStyles />
            <Switch>
                <Route exact path="/login" render={(props: any) => <Login {...props} />} />
                <Route exact path="/register" render={(props: any) => <Register {...props} />} />
                <Route path="/" render={(props: any) => <Pages {...props} />} />
            </Switch>
        </ThemeProvider>
    )
}
