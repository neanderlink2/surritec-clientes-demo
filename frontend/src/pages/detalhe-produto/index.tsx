import { Composition } from 'atomic-layout';
import numeral from 'numeral';
import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Icon } from 'semantic-ui-react';
import AmountButton from '../../components/AmountButton';
import { useAuth } from '../../contexts/AuthProvider';
import { useCart } from '../../contexts/CartProvider';
import { useFetch } from '../../hooks/useFetch';
import { Produto } from '../../models/Produto';
import { ContainerProduto, StyledPrice, StyledTitle } from './styles';

const layout = `
    imagem titulo
    imagem preco
    imagem comprar
    descricao descricao
`;

export default function DetalheProdutoPage() {
    const [quantidade, setQuantidade] = useState(1);
    const history = useHistory();
    const { slugProduto } = useParams<{ slugProduto: string }>();
    const { response: produto, isLoading } = useFetch<Produto>(`/produtos/${slugProduto}`);
    const { addProduto, carrinho } = useCart();
    const { authenticated } = useAuth();
    const produtoJaAdicionado = useMemo(() => {
        if (produto && carrinho.produtosDesejados.length > 0) {
            return carrinho.produtosDesejados.some((desejo) => desejo.produto.id === produto.id);
        }
    }, [produto, carrinho]);

    if (isLoading) {
        return <span>Carregando...</span>
    }

    return (
        <ContainerProduto>
            <div style={{ marginBottom: 10 }}>
                <Button type="button" icon labelPosition='left' onClick={() => history.push("/")}>
                    <Icon name='arrow left' />
                    Voltar
                </Button>
            </div>
            <Composition areas={layout} flexGrow="1" templateRows="0.2fr 0.2fr 1fr">
                {({ Imagem, Titulo, Preco, Comprar, Descricao }) => (
                    <>
                        <Imagem>
                            <img src={produto.image} style={{ maxWidth: '400px' }} />
                        </Imagem>
                        <Titulo>
                            <StyledTitle>{produto.title}</StyledTitle>
                        </Titulo>
                        <Preco>
                            <StyledPrice>{numeral(parseFloat(produto.price)).format('$ 0,0.00')}</StyledPrice>
                        </Preco>
                        <Comprar>
                            <AmountButton
                                label="Quantidade"
                                value={quantidade}
                                onChange={({ target }) => setQuantidade(parseInt(target.value))}
                                onAddClick={() => {
                                    if (quantidade < 99) {
                                        setQuantidade((oldValue) => oldValue + 1)
                                    }
                                }}
                                onRemoveClick={() => {
                                    if (quantidade > 1) {
                                        setQuantidade((oldValue) => oldValue - 1)
                                    }
                                }}
                            />
                            <Button primary onClick={() => {
                                if (!authenticated) {
                                    toast.info("Você precisa estar autenticado para adicionar itens ao carrinho.");
                                    return;
                                }
                                if (quantidade <= 0) {
                                    toast.warn("Selecione ao menos 1 unidade.");
                                    return;
                                }
                                addProduto(produto, quantidade);
                            }}>
                                {produtoJaAdicionado ? 'Adicionar mais' : 'Adicionar ao carrinho'}
                            </Button>
                        </Comprar>
                        <Descricao>
                            <span>{produto.description}</span>
                        </Descricao>
                    </>
                )}
            </Composition>
        </ContainerProduto>
    )
}
