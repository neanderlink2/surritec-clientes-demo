export type HttpMethods = "get" | "post" | "put" | "delete" | "patch" | "head" | "link";

export type SuccessCallback = (data: any | undefined) => void;
export type FailedCallback = (errors: any | undefined) => void;