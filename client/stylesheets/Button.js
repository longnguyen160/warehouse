import styled, {css} from 'styled-components';

export const Button = styled.button`
  font-weight: bold;
  text-align: center;
  background: #036a95;
  border: 1px solid transparent;
  border-radius: 3px;
  margin: 0px;
  color: #fff;
  ${props => props.small && css`
    padding: 3px 9px;
  `}
  ${props => props.btnModal && css`
    font-family: Proxima Nova bold;
    font-size: 14px;
    color: white;
    background-color: #01abc5;
    max-width: 100%;
    width: 100%;
    height: 47px;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 0px;
    text-transform: uppercase;
    margin-top: 10px;
  `}
  ${props => props.none && css`
    background: transparent;
    color: #036a95;
    font-weight: 400;
    &:hover{
      text-decoration: underline;
    }
  `}
  ${props => props.hasBorder && css`
    background: transparent;
    font-size: 14px;
    height: 38px;
    width: 115px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 4px 11px;
    border: 2px solid #026a95;
    border-radius: 3px;
    transition: all 0.3s ease;
    cursor: pointer;
    color: #026a95;
    justify-content: center;
    i{
      margin-right: 5px;
    }
    &:hover{
      background-color:#026a95;
      color: #fff;
    }
  `}
  ${props => props.dashboard && css`
    width: 300px;
    height: 100px;
    font-size: 20px;
    font-weight: 400;
  `}
  ${props => props.fullHeight && css`
    height: 100%;
  `}
  ${props => props.fullWidth && css`
    width: 100%;    
  `}
  ${props => props.right && css`
    margin: 0;
  `}
  ${props => props.stockOut && css`
    width: 135px;
  `}
  ${props => props.edit && css`
    border: 2px solid #00c056;
    color: #00c056;
    &:hover {
      background-color: #00c056;
      color: #fff;
    }
  `}
  ${props => props.admin && css`
    border: 2px solid #ff3000;
    color: #ff3000;
    &:hover {
      background-color: #ff3000;
      color: #fff;
    }
  `}
  ${props => props.no && css`
    border: 2px solid #626262;
    color: #626262;
    &:hover {
      background-color: #626262;
      color: #fff;
    }
  `}
  ${props => props.marginLeft && css`
    i {
      margin-left: 5px;
      margin-right: 0;
    }
  `}
  ${props => props.modal && css`
    font-size: 18px;
  `}
`;
