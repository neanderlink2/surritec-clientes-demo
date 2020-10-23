import { useMediaQuery } from 'atomic-layout';
import React from 'react';
import { FiLogIn, FiLogOut, FiMenu, FiSearch, FiShoppingCart, FiUser, FiUserPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header as HeaderUi, Input, Label } from 'semantic-ui-react';
import { useAuth } from '../../contexts/AuthProvider';
import { useCart } from '../../contexts/CartProvider';
import { SearchbarActions } from '../../store/modules/searchbar/actions/search';
import { debounce } from '../../utils/debounce';
import IconButton from '../IconButton';
import { ActionButtons, Container } from './styles';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const { authenticated, user, sair } = useAuth();

    const { carrinho, cleanCarrinho } = useCart();

    function handleSearch(search: string) {
        debounce(() => {
            dispatch(SearchbarActions.save(search))
        }, 750)();
    }

    if (isMobile) {
        return (
            <MobileHeader onSearch={handleSearch} />
        )
    }

    return (
        <Container>
            <HeaderUi as="h1" textAlign="center">Ateliê livre</HeaderUi>
            <div style={{ maxWidth: 550, width: '100%' }}>
                <Input
                    fluid
                    labelPosition='left'
                    icon={<IconButton title="Busca"><FiSearch /></IconButton>}
                    placeholder='Buscar...'
                    onChange={({ target }: any) => handleSearch(target.value)}
                />
            </div>
            <ActionButtons>
                {authenticated ? (
                    <>
                        <Label as={Link} to="/conta/detalhes" style={{ minWidth: 120, marginRight: 10 }}>
                            <FiUser style={{ marginRight: 10 }} /> {user?.first_name}
                        </Label>
                        {carrinho.produtosDesejados.length > 0 && (
                            <Label as={Link} to="/carrinho" color="blue" style={{ minWidth: 60, marginRight: 10 }}>
                                <FiShoppingCart style={{ marginRight: 10 }} />
                                {carrinho.produtosDesejados.reduce((prev, desejo) => prev + desejo.quantidade, 0)}
                            </Label>
                        )}
                        <Button animated onClick={() => {
                            cleanCarrinho();
                            sair();
                        }}>
                            <Button.Content visible>Sair</Button.Content>
                            <Button.Content hidden>
                                <FiLogOut />
                            </Button.Content>
                        </Button>
                    </>
                ) : (
                        <>
                            <Button animated onClick={() => history.push('/register')}>
                                <Button.Content visible>Cadastrar</Button.Content>
                                <Button.Content hidden>
                                    <FiUserPlus />
                                </Button.Content>
                            </Button>

                            <Button animated primary onClick={() => history.push('/login')}>
                                <Button.Content visible>Entrar</Button.Content>
                                <Button.Content hidden>
                                    <FiLogIn />
                                </Button.Content>
                            </Button>
                        </>
                    )}

            </ActionButtons>
        </Container>
    )
}

type MobileHeaderProps = {
    onSearch: (search: string) => void;
}

function MobileHeader({ onSearch }: MobileHeaderProps) {
    return (
        <Container>
            <HeaderUi as="h1" textAlign="center"><FiMenu /> Ateliê livre</HeaderUi>
            <div style={{ maxWidth: 350, width: '100%' }}>
                <Input
                    fluid
                    labelPosition='left'
                    icon={<IconButton title="Busca"><FiSearch /></IconButton>}
                    placeholder='Buscar...'
                    onChange={({ target }: any) => onSearch(target.value)}
                />
            </div>
        </Container>
    )
}