import { RegisterForm } from "../../../models/RegisterForm";
import { FailedPayload as FailedCallback, SuccessPayload as SuccessCallback } from "../../../models/Requests/RequestsMethods";

export type TryLoginPayload = {
    login: string,
    password: string,
    onSuccess?: SuccessCallback,
    onFailed?: FailedCallback
}

export type RegisterPayload = {
    data: RegisterForm,
    onSuccess?: SuccessCallback,
    onFailed?: FailedCallback
}