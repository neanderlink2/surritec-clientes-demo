import React from 'react'
import { Container, LoadingIcon, LoadingText } from './styles'

export default function Hydrating() {
    return (
        <Container>
            <LoadingIcon />
            <LoadingText>Acessando o sistema, aguarde um instante...</LoadingText>
        </Container>
    )
}
