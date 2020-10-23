import React from 'react';
import AccountDetailsPage from '../pages/account/details';
import DetalheProdutoPage from '../pages/detalhe-produto';
import HomePage from '../pages/home';
import ListaCarrinhoPage from '../pages/lista-carrinho';
import PagamentoFalhaPage from '../pages/pagamento/falha';
import PagamentoSucessoPage from '../pages/pagamento/sucesso';

export const publicRoutes = [
    { path: '/', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/home', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/categoria/:slugCategoria', render: (props: any) => <HomePage {...props} />, navigationName: 'Início' },
    { path: '/produto/:slugProduto', render: (props: any) => <DetalheProdutoPage {...props} />, navigationName: 'Início' },
    { path: '/carrinho', render: (props: any) => <ListaCarrinhoPage {...props} />, navigationName: 'Início' },
    { path: '/conta/detalhes', render: (props: any) => <AccountDetailsPage {...props} />, navigationName: 'Início' },
    { path: '/pagamento/sucesso', render: (props: any) => <PagamentoSucessoPage {...props} />, navigationName: 'Início' },
    { path: '/pagamento/falha', render: (props: any) => <PagamentoFalhaPage {...props} />, navigationName: 'Início' },
    
]