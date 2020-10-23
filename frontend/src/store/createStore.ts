import { configureStore } from "@reduxjs/toolkit";
import { compose, Reducer } from 'redux';

declare global {
    interface Console {
        tron: any
    }
}

export default (reducers: Reducer, middlewares: any[]) => {
    return configureStore({
        middleware: [...middlewares],
        enhancers: process.env.NODE_ENV === 'development' ? [compose(console.tron.createEnhancer())] : [],
        reducer: reducers
    });
};
