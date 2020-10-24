import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card } from 'semantic-ui-react';
import Allowed from '../../../components/Allowed';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RemoveClienteActions } from '../../../store/modules/clientes/actions/remove';

type CardProdutoProps = {
    id: number;
    nome: string;
    cidade: string;
    uf: string;
    qtdeEmails: number;
    qtdeTelefones: number;
    onSuccess?: () => void;
}

const layout = `
    imagem
    nome    
    preco
`;

export default function CardCliente({
    id,
    nome,
    cidade,
    uf,
    qtdeEmails,
    qtdeTelefones,
    onSuccess
}: CardProdutoProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const isRemoving = useTypedSelector(states => states.clientes.remove.isRequesting);

    return (
        <Card style={{ width: '100%', height: 150, margin: '1em 0em' }}>
            <Card.Content>
                <Card.Header>{nome}</Card.Header>
                <Card.Meta>{cidade}, {uf}</Card.Meta>
                <Card.Description>
                    Esse cliente possui <strong>{qtdeEmails}</strong> e-mails e <strong>{qtdeTelefones}</strong> telefones cadastrados.
                </Card.Description>
            </Card.Content>
            <Allowed roles={["ROLE_ADMIN"]}>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color="green" onClick={() => history.push(`/clientes/${id}/form`)}>
                            <FiEdit style={{ marginRight: 10 }} />
                        Editar
                    </Button>
                        <Button basic color='red' loading={isRemoving} onClick={() => dispatch(RemoveClienteActions.request({
                            idCliente: id,
                            onSuccess: () => {
                                toast.success("Cliente foi removido.");
                                if (onSuccess) {
                                    onSuccess();
                                }
                            }
                        }))}>
                            <FiTrash style={{ marginRight: 10 }} />
                        Deletar
                    </Button>
                    </div>
                </Card.Content>
            </Allowed>
        </Card>
    )
}
