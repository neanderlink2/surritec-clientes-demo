import { useMediaQuery } from 'atomic-layout';
import React from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { useFetch } from '../../hooks/useFetch';
import { Categoria } from '../../models/Categoria';
import { PagedList } from '../../models/PagedList';
import { LeftMenuContainer } from './styles';

const categorias = [
    { nome: 'Bebê', keyName: 'bebe' },
    { nome: 'Acessórios', keyName: 'acessorios' },
    { nome: 'Aniversário e Festas', keyName: 'aniversario-festas' },
    { nome: 'Bijuterias', keyName: 'bijuterias' },
    { nome: 'Casa', keyName: 'casa' },
    { nome: 'Decoração', keyName: 'decoracao' },
    { nome: 'Doces', keyName: 'doces' },
    { nome: 'Infantil', keyName: 'infantil' },
]

export default function LeftMenu() {
    const history = useHistory();
    const { response } = useFetch<PagedList<Categoria>>("/categorias/");
    const isMobile = useMediaQuery({ maxWidth: 768 }, false);

    if (isMobile) {
        return null;
    }

    return (
        <LeftMenuContainer>
            <List selection divided as="nav" verticalAlign='middle'>
                <List.Item as="a"
                    onClick={() => history.push('/')}
                    active={history.location.pathname === '/'}
                    style={{ padding: 10 }}
                >
                    <FiHome style={{ marginRight: 10 }} />
                    Início
                </List.Item>
                <List.Item disabled>
                    <List.Header>Categorias</List.Header>
                </List.Item>
                {response?.results.map(categoria => (
                    <List.Item as="a"
                        key={`nav-${categoria.slug}`}
                        onClick={() => history.push(`/categoria/${categoria.slug}`)}
                        active={history.location.pathname.includes(categoria.slug)}
                        style={{ padding: 10 }}
                    >
                        <FiChevronRight style={{ marginRight: 10 }} />
                        {categoria.title}
                    </List.Item>
                ))}
            </List>
        </LeftMenuContainer>
    )
}
