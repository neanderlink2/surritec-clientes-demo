import { Produto } from "./Produto"

export type Carrinho = {
    total: number;
    produtosDesejados: ProdutoDesejado[];
}

export type ProdutoDesejado = {
    produto: Produto;
    quantidade: number;
}