import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ConfigInterface } from 'swr';
import { HttpMethods } from '../models/Requests/RequestsMethods';

export const URL_BASE_API = "http://localhost:8080/api";
const api = axios.create({ baseURL: URL_BASE_API });
api.interceptors.request.use(config => {
    const userToken = JSON.parse(localStorage.getItem("@app/userToken") ?? "");
    if (!userToken) {
        return config;
    }

    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
});

async function dataFetcher<TResponse = any>(url: string, method: HttpMethods = "get") {
    try {
        const response = await api.request({ method, url, params: { format: 'json' } });
        return response.data as TResponse;
    } catch (error) {
        console.error("ERRO NA REQUISIÇÃO: ", error);
        throw error;
    }
}

export const swrConfiguration: ConfigInterface = {
    fetcher: dataFetcher,
    errorRetryCount: 1,
    revalidateOnFocus: false,
    shouldRetryOnError: true
}

export function formatError(error: AxiosError) {
    if (error.response) {
        if (error.response.status === 400) {
            if (error.response.data.errors) {
                toast.error('Não foi possivel realizar a operação');
            } else {
                for (const key of Object.keys(error.response.data)) {
                    for (const errorMessage of error.response.data[key]) {
                        toast.error(errorMessage);
                    }
                }
            }
            return error.response.data;
        }
        if (error.response.status === 401) {
            return;
        }
        if (error.response.status === 404) {
            return;
        }
    }

    toast.error('Não foi possivel realizar a operação');
    return ['Internal server error'];
}

export default api;