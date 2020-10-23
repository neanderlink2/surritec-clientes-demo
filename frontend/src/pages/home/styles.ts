import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    width: 100%;
    margin-top: 15px;
    
    @media(max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;