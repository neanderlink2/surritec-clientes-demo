import { FiUserCheck } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

const placeholderAnimate = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
`;

export const LoadingIcon = styled(FiUserCheck).attrs({ size: 100 })`    
  overflow: hidden;
  background: #000;
  position: relative;
  animation-duration: 2.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${placeholderAnimate};
  background: transparent;
`;

export const LoadingText = styled.span`
  animation-duration: 2.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${placeholderAnimate};
  font-size: 20px;
  margin-top: 25px;  
`;

export const Container = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    height: 100vh;
    width: 100%;
`;