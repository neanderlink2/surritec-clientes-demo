import { Cliente } from "../../../models/Cliente"

export type CreateClientePayload = {
    data: Cliente,
    onSuccess?: SuccessCallback,
    onFailed?: FailedCallback
}

export type UpdateClientePayload = {
    idCliente: number;
    data: Cliente;
    onSuccess?: SuccessCallback;
    onFailed?: FailedCallback;
}

export type RemoveClientePayload = {
    idCliente: number;
    onSuccess?: SuccessCallback;
    onFailed?: FailedCallback;
}
