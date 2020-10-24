import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { useAuth } from "../contexts/AuthProvider";

type FetchReturn<TResponse, TErrorResponse = any> = {
    response: TResponse,
    error?: AxiosError<TErrorResponse>,
    isLoading: boolean,
    reload: () => void,
}

export function useFetch<TResponse = any, TErrorResponse = any>(url?: string): FetchReturn<TResponse, TErrorResponse> {
    const { data, error } = useSWR<TResponse, AxiosError<TErrorResponse>>(url ?? null);
    const { sair } = useAuth();

    if (error?.response?.status === 401) {
        toast.info("Seu token expirou, entre novamente em sua conta.");
        sair();
    }

    return {
        error,
        response: data as TResponse,
        isLoading: !data && error?.response?.status !== 404,
        reload: () => mutate(url ?? null)
    };
}