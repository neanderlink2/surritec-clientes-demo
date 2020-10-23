import { Carrinho } from "../../models/Carrinho";

export type CartContextType = {
    carrinho: Carrinho;
    addProduto: (produto: Produto, quantidade: number = 1) => void;
    alterarQuantidadeProduto: (idProduto: number, quantidade: number) => void;
    removeProduto: (idProduto: number) => void;
    cleanCarrinho: () => void;
};
