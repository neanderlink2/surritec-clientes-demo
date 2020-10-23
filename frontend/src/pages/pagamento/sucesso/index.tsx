import React, { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Message } from 'semantic-ui-react';
import { useCart } from '../../../contexts/CartProvider';
import { SaveCartActions } from '../../../store/modules/cart/actions/save';

export default function PagamentoSucessoPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { carrinho, cleanCarrinho } = useCart();
    useEffect(() => {
        if (carrinho) {
            dispatch(SaveCartActions.request({
                data: carrinho,
                onSuccess: () => {
                    cleanCarrinho();
                },
                onFailed: () => {
                    toast.error("Houve um problema enquanto salvávamos a sua compra. Tente novamente mais tarde.");
                }
            }))
        }
    }, [carrinho]);
    return (
        <div>
            <Message icon success>
                <FiCheck size={28} style={{ marginRight: 15 }} />
                <Message.Content>
                    <Message.Header>Parabéns!</Message.Header>
                    Sua compra foi efetuada com sucesso! Em breve o comerciante enviará o produto e estará em suas mãos.
                </Message.Content>
            </Message>
        </div>
    )
}
