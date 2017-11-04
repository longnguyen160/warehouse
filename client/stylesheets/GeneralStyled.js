import styled, { css, keyframes } from 'styled-components';

const zoomIn = keyframes`
 0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const FormStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${props => props.homepage ? `flex-start` : `center`};
  align-items: center;
  height: ${props => props.mobile ? '95%' : '100%'};  
  animation: ${zoomIn} 0.2s;
`;
export const PageStyled = styled.div`
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0px 0px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  min-width: 320px;
  max-width: ${props => props.medium ? `700px` : `320px`};
  width: 100%;
  ${props => props.fixed && css`
    width: 700px;
    max-width: 700px;
    height: 568px;
  `};
  ${props => props.chatBox && css`
    width: 100%;
    max-width: 700px;
    height: 100%;
  `};
  @media(max-width: 700px) {
    padding: 0 0 35px;
    ${props => props.fullHeight && css`
      height: 100%;
      min-width: 100%;
      padding: 20px 0;
    `};        
  }
`;
export const PageCustomStyled = styled.div`
  padding: 30px 20px;
  min-width: 320px;
  max-width: ${props => props.medium ? `700px` : `320px`};
  width: 100%;
  ${props => props.chatBox && css`
    padding: 10px 0;
    max-width: 100%;    
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;  
    -webkit-overflow-scrolling: touch;
  `}
`;
export const TitleAccountStyled = styled.div`
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 23px;
  font-weight: 600;
  color: #026a95;
`;

export const FormBlockStyled = styled.div`
  transition: all 0.5s;
  ${props => props.hideInput === true ?
    css`
      height: 0;
    `
  : props.hideInput === false ?
    css`
      height: 84px;
    `
    : null
  };
  ${props => props.auto && css`
    margin: auto;
    width: 50%;
  `}  
  ${props => props.show ? css`
    display: initial;    
  ` :
  css`
    display: none;
  `}
  ${props => props.fullWidth && css`
    width: 100%;    
  `}
  ${props => props.margin && css`
    margin: 6px;
    display: block;
  `}
  ${props => (props.isShowed === true) ?
    css`      
      opacity: 1;      
      visibility: visible;
      max-height: 200px;
    `
  : (props.isShowed === false) ?
    css`      
      max-height: 0;
      opacity: 0;      
      visibility: hidden;
    ` : null
  }
  ${props => props.borderBottom && css`
    border-bottom: 1px solid #d1d1d1;
  `}
`;

export const FormGroupStyled = styled.div`
  display: flex;
  font-size: ${props => props.big ? '16px' : '13px'};
  transition: all 1s;
  ${props => props.hideInput === true ?
    css`
      height: 0;
    `
  : props.hideInput === false ?
    css`
      height: 42px;
    `
    : null
  };
  span {
    margin-right: 5px;
  }
  ${props => props.right && css`
    justify-content: flex-end;
  `};
  ${props => props.border && css`
    border-bottom: 1px solid #626262;
    margin: 10px 0;    
  `};
  ${props => props.margin && css`
    margin: 10px 0;
  `};
  ${props => props.chatBox && css`
    margin-bottom: 10px;
    height: 90%;       
  `};
  ${props => props.chatForm && css`
    height: 100%;
  `};
  @media(max-width: 700px) {
    ${props => props.input && css`
      padding: 0 5px;    
    `};
  }
`;

export const LineFormStyled = styled.div`
  display: flex;
  margin: 0 5px;
  font-size: ${props => props.big ? '15px' : '13px'};
  align-items: center;
  flex: 1;
  position: relative;  
  ${props => props.isShowed === false ?
    css`      
      opacity: 0;
      height: 0;
    `
  : props.isShowed === true ?
    css`
      opacity: 1;
      height: 33px;
    `
    : null
  };
  ${props => props.hideInput === true ?
    css`
      flex: 0;
      margin: 0;
      input {
        padding: 0 !important;
      }
    `
  : props.hideInput === false ?
    css`
      flex: 1;
    `
    : null
  };
  transition: all 0.5s;
  textarea, input, select {
    background: #fff;
    padding: 5px 8px;
    color: #626262;
    font-style: italic;
    ${props => props.borderBottom ?
      css`
        border: none;
        border-bottom: 1px solid #d1d1d1;
      ` :
      css`
        border: 1px solid #d1d1d1;
    `};    
    border-radius: 3px;
    width: 100%;
    &:focus{
      border-color: ${props => props.error ? 'red': '#036a95'};
      outline: 0;
    }
  }
  .icon-cl-expand{
    font-size:  8px;
    color: #036a95;
    cursor: pointer;
    &:hover{
      color: #333;
    }
  }
  span[name="calendar"]{
    font-size: 12px;
    padding: 3px 10px;
    position: absolute;
    top: -14px;
    left: -36px;
    display: flex;
    height: 28px;
    border-radius: 0px 2px 2px 0px;
    align-items: center;
  }
  ${props => props.alignCenter && css`
    select {
      padding: 6px;      
    }
    justify-content: center;
  `}
  ${props => props.image && css`
    height: 100%;    
    align-items: center !important;
  `}
  ${props => props.hasTitle && css`
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    textarea, input{
      border: 1px solid #626262;
      font-style: normal;
      padding: 8px;
    }
    i {
      margin-right: 5px;
    }
  `}
  ${props => props.searchBox && css`
    flex: 2;    
  `}
  ${props => props.right && css`
    align-items: flex-end;
  `}
  ${props => props.noMargin && css`
    margin: 0;    
  `}
  ${props => props.center && css`
    align-items: center;
  `}
  ${props => props.marginBottom && css`
    margin-bottom: 10px;
  `}
  ${props => props.hover && css`
    &:hover {
      color: #026a95;
      cursor: pointer;
    }
  `}
  ${props => props.position === 'left' ? css`
    align-items: flex-start;
  ` :
  props.position === 'right' && css`
    align-items: flex-end;
  `}
  ${props => props.pointer && css`
    cursor: pointer;
  `}
`;

export const TitleFormStyled = styled.span`
  margin-bottom: 5px;
  font-weight: 600;
  ${props => props.flex && css`
    flex: 1;
  `}
`;

export const Image = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
  margin-bottom: 5px;
  ${props => props.topNav && css`
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 25px;
  `}
  ${props => props.search && css`
    width: 50px;
    height: 50px;
    margin: 0 5px;
    border-radius: 25px;
  `}
`;

export const TextErrorStyled = styled.span`
  visibility: hidden;
  width: 100%;
  text-align: center;  
  font-weight: 600;
  transition: all 0.3s ease;  
  color: red;
  display: block;  
  height: 0;
  ${props => props.error && css`
    height: 19px;
    min-height: 13px;
    margin-bottom: 10px;
    visibility: visible;
  `}
`;

export const Input = styled.input`
  font-size: 1.15em;
  padding: 0.5em;
  color: #000;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 280px;
  ${props => props.borderBottom ?
    css`        
      border-bottom: 1px solid #d1d1d1;
    ` :
    css`
      border: 1px solid #d1d1d1;
  `};  
  transition: all 0.3s ease;
  ${props => props.chat && css`
    width: 100%;
    margin-right: 5px;
  `}
  &:hover {
    ${props => props.borderBottom ?
      css`
        border: none;
        border-bottom: 1px solid #026a95;
      ` :
      css`
        border: 1px solid #026a95;
    `};    
  }
  &:focus{
    outline :none;
    ${props => props.borderBottom ?
      css`
        border: none;
        border-bottom: 1px solid #026a95;
      ` :
      css`
        border: 1px solid #026a95;
    `};    
  }
`;

export const TextArea = styled.textarea`
  font-size: 1.25em;
  padding: 0.5em;
  color: #000;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 100%;
  border: 1px solid #626262;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid #026a95;
  }
  &:focus{
    outline :none;
    border: 1px solid #026a95;
  }
`;

export const Label = styled.label`
  width: 100%;
  text-align: center;
  margin-top: ${props => props.error ? '' : '10px'};
  transition: all 0.3s ease;
  cursor: ${props => props.error ? 'normal' : 'pointer'};
  color: ${props => props.error ? 'red' : 'black'};
  a{
    color: black
  }
  a:hover{
    color: #026a95
  }
`;

export const Span = styled.span`
  color: ${props => props.max ? '#ff3000'
  : props.current === 'empty' ? '#026a95'
    : props.current === 'full' ? '#ff3000'
      : '#01c587'};
`;

export const InputSearchStyled = styled.div`
  width: 100%;
  display: inline-block;
  height: 22px;
  input{
    background-color: #7f7f7f;
    width: 100%;
    padding-left: 25px;
    padding-right: 10px;
    font-size: 11px;
    height: 100%;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 10px;
    background-image: url(/images/cl-search.svg);
    background-repeat: no-repeat;
    background-size: 11px;
    background-position: 6px 4px;
    outline: none;
    &:focus{
      border: 1px solid #fff;
    }
  }
`;
