import styled, { keyframes } from 'styled-components';

export const AlanWalker = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const MichaelJackson = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const MyModal = styled.div`  
  position: fixed;  
  display: flex;  
  visibility: ${props => props.isOpen === true ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen === true ? 1 : 0};
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  animation: ${props => props.isOpen === true ? AlanWalker : MichaelJackson} 0.5s;
  transition: visibility 0.5s, opacity 0s;
`;

export const SlideOpen = keyframes`
  0% {
    top:-300px;
    opacity:0
  }
  100% {
    top:0;
    opacity:1
  }
`;

export const ModalContent = styled.div`
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  min-width: 320px;
  max-width: 320px;
  width: 100%;  
`;
