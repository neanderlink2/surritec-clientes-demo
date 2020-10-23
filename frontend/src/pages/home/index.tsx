import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Message } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthProvider';
import { useFetch } from '../../hooks/useFetch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PagedList } from '../../models/PagedList';
import { Produto } from '../../models/Produto';
import CardProduto from './card-produto';
import { Container } from './styles';

export default function HomePage() {
    const [page, setPage] = useState(1);
    const history = useHistory();
    const term = useTypedSelector(states => (
        states.searchbar.search.term
    ));
    const { slugCategoria } = useParams<{ slugCategoria: string }>();

    const { response, isLoading } = useFetch<PagedList<Produto>>(slugCategoria ?
        `/produtos/categoria/${slugCategoria}/?search=${term}&page=1`
        : `/produtos/?search=${term}&page=${page}`);

    const { user, sair } = useAuth();

    if (isLoading) {
        return <span>Carregando...</span>
    }
    return response?.results.length > 0 ? (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {response?.previous && (
                    <Button type="button" icon labelPosition='left' onClick={() => setPage(oldValue => oldValue - 1)}>
                        <Icon name='arrow left' />
                        Voltar
                    </Button>
                )}
                {response?.next && (
                    <Button type="button" icon labelPosition='left' onClick={() => setPage(oldValue => oldValue + 1)}>
                        <Icon name='arrow right' />
                        Próxima
                    </Button>
                )}
            </div>
            <Container>
                {response?.results.map(produto => (
                    <CardProduto
                        imagem={produto.image}
                        nome={produto.title}
                        preco={parseFloat(produto.price)}
                        onCardClick={() => history.push(`/produto/${produto.slug}`)}
                    />
                ))}
            </Container>
        </div>

    ) : (
            <div>
                <Message icon>
                    <FiEye size={28} style={{ marginRight: 15 }} />
                    <Message.Content>
                        <Message.Header>Opa, parece que nada foi encontrado.</Message.Header>
                    Nenhum produto foi encontrado, experimente alterar a sua busca ou procurar em outras categorias!
                </Message.Content>
                </Message>
            </div>
        )
}
