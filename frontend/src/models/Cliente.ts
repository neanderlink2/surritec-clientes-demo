export type Cliente = {
    id?: number;
    nome: string;
    cpf: string;
    emails: string[];
    telefones: Telefone[];
    endereco: Endereco;
}

export type Telefone = {
    telefone: string;
    tipoTelefone: string;
}

export type Endereco = {
    id?: number;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento?: string;
}