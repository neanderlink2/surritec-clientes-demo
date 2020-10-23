import numeral from 'numeral';
import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Preco } from './styles';

type CardProdutoProps = {
    imagem: string;
    nome: string;
    preco: number;
    onCardClick: () => void;
}

const layout = `
    imagem
    nome    
    preco
`;

export default function CardProduto({ imagem, nome, preco, onCardClick }: CardProdutoProps) {
    console.log(preco, 'PREÇO');
    return (
        <div style={{ width: '100%' }}>
            <Card link onClick={onCardClick}>
                <Image src={imagem} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{nome}</Card.Header>
                    <Card.Description>
                        <Preco>{numeral(preco).format('$ 0,0.00')}</Preco>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}
