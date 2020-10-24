import numeral from 'numeral';
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { swrConfiguration } from './api';
import AuthProvider from './contexts/AuthProvider';
import ThemeToggleProvider from './contexts/ThemeToggleProvider';
import ModulesRoutes from './routes/index.account';
import store from './store';

export default function App() {
    useEffect(() => {
        function startup() {
            numeral.register('locale', 'pt-br', {
                delimiters: {
                    thousands: '.',
                    decimal: ','
                },
                abbreviations: {
                    thousand: 'mil',
                    million: 'milhões',
                    billion: 'b',
                    trillion: 't'
                },
                ordinal: function (number: number) {
                    return 'º';
                },
                currency: {
                    symbol: 'R$'
                }
            });
            numeral.locale('pt-br');
        }
        startup();
    }, []);

    return (
        <ReduxProvider store={store}>
            <ThemeToggleProvider initialSchema="light">
                <AuthProvider>
                    <SWRConfig value={swrConfiguration}>
                        <BrowserRouter>
                            <ModulesRoutes onlyAuthenticated />
                            <ToastContainer />
                        </BrowserRouter>
                    </SWRConfig>
                </AuthProvider>
            </ThemeToggleProvider>
        </ReduxProvider>
    )
}