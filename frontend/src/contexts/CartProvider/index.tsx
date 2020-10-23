import React, { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { usePersistedState } from "../../hooks/usePersistedState";
import { Carrinho, ProdutoDesejado } from "../../models/Carrinho";
import { Produto } from "../../models/Produto";
import { CartContextType } from "./types";

const getTotal = (prev: number, desejo: ProdutoDesejado) => prev + parseFloat(desejo.produto.price) * desejo.quantidade;

const CartContext = createContext<CartContextType>({
    carrinho: { produtosDesejados: [], total: 0 },
    addProduto: (produto: Produto) => { },
    alterarQuantidadeProduto: (idProduto: number, quantidade: number) => { },
    removeProduto: (idProduto: number) => { },
    cleanCarrinho: () => { }
});

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

export default function CartProvider({ children }: PropsWithChildren<any>) {
    const [carrinho, setCarrinho] = usePersistedState<Carrinho>('@user/cart', { produtosDesejados: [], total: 0 });

    const addProduto = useCallback((produto: Produto, quantidade: number = 1) => {
        let novosProdutosDesejados: ProdutoDesejado[] = [];
        if (carrinho.produtosDesejados.some(desejo => desejo.produto.id == produto.id)) {
            // adiciona a quantidade
            const produtoExistente = carrinho.produtosDesejados.find(desejo => desejo.produto.id == produto.id);
            novosProdutosDesejados = [
                ...carrinho.produtosDesejados.filter(desejo => desejo.produto.id !== produto.id),
                { produto, quantidade: (produtoExistente?.quantidade ?? 0) + quantidade }
            ];
        } else {
            // adiciona o produto inteiro
            novosProdutosDesejados = [...carrinho.produtosDesejados, { produto, quantidade }];
        }

        const total = novosProdutosDesejados.reduce(getTotal, 0);
        const carrinhoAtualizado: Carrinho = {
            ...carrinho,
            produtosDesejados: novosProdutosDesejados,
            total
        };
        setCarrinho(carrinhoAtualizado);
        toast.success(`Produto '${produto.title}' foi adicionado ao seu carrinho.`);
    }, [carrinho, setCarrinho]);

    const alterarQuantidadeProduto = useCallback((idProduto: number, quantidade: number = 1) => {
        const produtoExistente = carrinho.produtosDesejados.find(desejo => desejo.produto.id == idProduto);
        if (!produtoExistente) {
            return;
        }
        const novosProdutosDesejados = [
            ...carrinho.produtosDesejados.filter(desejo => desejo.produto.id !== idProduto),
            { produto: produtoExistente.produto, quantidade }
        ];
        const total = novosProdutosDesejados.reduce(getTotal, 0);
        const carrinhoAtualizado: Carrinho = {
            ...carrinho,
            produtosDesejados: novosProdutosDesejados,
            total
        };
        setCarrinho(carrinhoAtualizado);
    }, [carrinho, setCarrinho]);

    const removeProduto = useCallback((idProduto: number) => {
        const produtosDesejadosAtualizados = carrinho.produtosDesejados.filter(desejo => desejo.produto.id !== idProduto);
        const total = produtosDesejadosAtualizados.reduce(getTotal, 0);
        const carrinhoAtualizado: Carrinho = {
            ...carrinho,
            produtosDesejados: produtosDesejadosAtualizados,
            total
        };
        setCarrinho(carrinhoAtualizado);
        toast.info(`Um produto foi removido de seu carrinho.`);
    }, [carrinho, setCarrinho]);

    const cleanCarrinho = useCallback(() => {
        setCarrinho({ produtosDesejados: [], total: 0 });
    }, [setCarrinho]);

    return (
        <CartContext.Provider value={{
            addProduto,
            alterarQuantidadeProduto,
            removeProduto,
            cleanCarrinho,
            carrinho
        }}>
            {children}
        </CartContext.Provider>
    )
}