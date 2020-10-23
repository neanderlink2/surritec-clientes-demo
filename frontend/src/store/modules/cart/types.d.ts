import { Carrinho } from "../../../models/Carrinho"
import { FailedCallback, SuccessCallback } from "../../../models/Requests/RequestsMethods"

export type SaveCartPayload = {
    data: Carrinho;
    onSuccess: SuccessCallback;
    onFailed: FailedCallback;
}