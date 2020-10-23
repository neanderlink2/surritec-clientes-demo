import React from 'react'
import { FiX } from 'react-icons/fi'
import { Message } from 'semantic-ui-react'

export default function PagamentoFalhaPage() {
    return (
        <div>
            <Message icon error>
                <FiX size={28} style={{ marginRight: 15 }} />
                <Message.Content>
                    <Message.Header>Desculpe-nos por isso!</Message.Header>
                    Parece que houve algum problema ao processar sua compra. Mas não se preocupe, nenhum valor será cobrado de você e 
                    estornaremos qualquer custo que possa ter ocorrido.                    
                </Message.Content>
            </Message>
        </div>
    )
}
