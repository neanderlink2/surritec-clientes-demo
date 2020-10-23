import { loadStripe } from '@stripe/stripe-js';
import numeral from 'numeral';
import React, { useCallback } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Image, List } from 'semantic-ui-react';
import api from '../../api';
import AmountButton from '../../components/AmountButton';
import IconButton from '../../components/IconButton';
import { useCart } from '../../contexts/CartProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { DescricaoProduto, PrecoTotal } from './styles';

const stripePromise = loadStripe('pk_test_51HaB87Da9E4DnCFSAcHdNaM1MChFTdVBAUuwfqLx2UsYLOZdTjT6apZY0zMWSn031K1Yy3yA9AeBNED7nKrGvEiA00X6NUkoCu');

export default function ListaCarrinhoPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { carrinho, alterarQuantidadeProduto, removeProduto, cleanCarrinho } = useCart();
    const loadingSave = useTypedSelector(states => states.cart.save.isRequesting);

    const processarCompra = useCallback(async (event: any) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;
        const body = carrinho.produtosDesejados.map(desejo => ({
            id_produto: desejo.produto.id,
            quantidade: desejo.quantidade
        }));
        // Call your backend to create the Checkout Session
        const response = await api.post('/pedidos/create-checkout-session/', body);

        // When the customer clicks on the button, redirect them to Checkout.
        if (stripe) {
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.session_id,
            });

            if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
            }
        }
    }, [carrinho]);  

    if (carrinho.produtosDesejados.length === 0) {
        return (
            <Container fluid style={{ paddingRight: 35 }}>
                <span>Nenhum produto foi adicionado ao seu carrinho ainda...</span>
            </Container>
        )
    }

    return (
        <Container fluid style={{ paddingRight: 35 }}>
            <List divided animated>
                {carrinho.produtosDesejados.sort((a, b) => {
                    if (a.produto.title > b.produto.title) {
                        return 1;
                    } else if (a.produto.title < b.produto.title) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).map((desejo) => (
                    <List.Item>
                        <Image avatar src={desejo.produto.image} size="tiny" centered style={{ marginTop: 20 }} />
                        <List.Content style={{ width: '75%', paddingTop: 10, paddingBottom: 10 }}>
                            <List.Header as={Link} to={`/produto/${desejo.produto.slug}`}>{desejo.produto.title}</List.Header>
                            <List.Description style={{ marginTop: 10 }}>
                                Quantidade:
                                <AmountButton
                                    style={{ marginLeft: 10 }}
                                    value={desejo.quantidade}
                                    onAddClick={() => {
                                        if (desejo.quantidade < 99) {
                                            alterarQuantidadeProduto(desejo.produto.id, desejo.quantidade + 1)
                                        }
                                    }}
                                    onRemoveClick={() => {
                                        if (desejo.quantidade > 1) {
                                            alterarQuantidadeProduto(desejo.produto.id, desejo.quantidade - 1)
                                        }
                                    }}
                                />
                                <br />
                                <DescricaoProduto>
                                    {desejo.produto.description}
                                    <IconButton title="Remover produto" onClick={() => removeProduto(desejo.produto.id)}
                                        color="red">
                                        <FiTrash />
                                    </IconButton>
                                </DescricaoProduto>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <PrecoTotal><label>Total:</label> {numeral(carrinho.total).format('$ 0,0.00')}</PrecoTotal>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={cleanCarrinho} style={{ marginRight: 10 }}>Limpar carrinho</Button>
                <Button primary loading={loadingSave} onClick={processarCompra}>Completar compra</Button>
            </div>
        </Container>
    )
}
