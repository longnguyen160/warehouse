import styled, {css} from 'styled-components';

export const HeaderMainStyled = styled.div`
  display: flex;
  min-height: 40px;
  align-items: center;
  background-color: ${props => props.admin ? 'red' : '#026a95'};
  ${props => props.center && css`
    justify-content: center;
  `}
`;
export const HeaderMainBlockStyled = styled.div`
  display: flex;
  flex: 1;
  ${props => props.hasAuto && css`
    flex: 0 0 auto;
  `}
`;
export const HeaderMainItemsStyled = styled.section`
  display: flex;
  flex: ${props => props.center ? '1' : '0 0 auto'};
  padding: 0 15px;
  align-items: center;
  cursor: pointer;
  ${props => props.admin && css`
    justify-content: center;
    .fa-angle-left{
      font-size: 30px;
    }
    .fa-bars{
      font-size: 30px;
    }
  `}
  ${props => props.isHidden && css`
    visibility: hidden;
  `};
  font-family: 'Proxima Nova bold';
  ${props => props.relative ? css`
    position: reltaive;
  ` : ''}
  & > a {    
    color: #91d3ee;
    > i {
      margin-right: 5px;
    }
    &:hover {
      color: #fff;
    }
  }
  & > span {
    font-size: 11px;
    color: ${props => props.admin ? '#fff' : '#91d3ee'};
    text-transform: uppercase;
    transition: color 200ms;
    @media(max-width: 1024px){
      font-size: 10px;
    }
  }
  & > i {
    font-size: 9px;
    color: #91d3ee;
    transition: color 200ms;
    margin-right: 5px;
  }  
  &:hover {
    & > i {
      color: #fff;
    }
    & > span {
      color: #fff;
    }
  }
  ${props => props.active && css`
    & > i {
      color: #fff;
    }
    & > span {
      color: #fff;
    }
  `}
  ${props => props.notification && css`
    position: relative;
    min-width: 55px;
    height: 40px;
    justify-content: center;
    & > i{
      margin-right: 0px;
      font-size: 17px;
      color: #ffffff
    }
    & > span{
      position: absolute;
      left: 30px;
      top: 5px;
      font-size: 9px;
      background: #ff3000;
      min-width: 15px;
      padding: 2px 4px;
      border-radius: 5px;
      color: #ffffff;
      text-align: center;
      line-height: 11px;
    }
    &:after{
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      height: 40px;
      background-color: #015579;
      width: 1px;
    }
    &:before{
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      height: 40px;
      background-color: #015579;
      width: 1px;
    }
  `};
  ${props => props.filter && css`
    min-width: 55px;
    justify-content: center;
    & > i{
      margin-right: 0px;
    }
  `};
  ${props => props.mobileMenu && css`
    display: none;
    height: 40px;
    width: 55px;    
    justify-content: center;
    & > i {
      font-size: 30px;
      margin-right: 0px;
    }
    & > span {
      font-size: 20px;
      font-weight: 800;
    }
  `};
  ${props => props.info && css`
    position: relative;
    height: 40px;
    & > div{
      display: ${props.show ? 'block' : 'none'};
    }
    & > span{
      color: #fff;
      max-width: 140px;
      font-size: 11px;
      text-transform: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > i{
      margin-right: 0px;
      margin-left: 10px;
      font-size: 11px;
      color: #fff
    }
    @media(max-width: 1080px){
      & > span{
        max-width: 90px;
      }
    }
  `};
  @media(max-width: 1170px){
    padding: 0 10px;
  }
  @media(max-width: 1024px){
    padding: 0 8px;
  }
  @media(max-width: 940px){
    ${props => props.general && css`
      display: none;
    `}
    ${props => props.mobileMenu && css`
      display: flex;
      position: relative;
    `}
  }
`;
export const LogoStyled = styled.text`
  font-size: 18px;
  color: #fff;
  font-family: 'Montserrat';
  font-weight: 700;
  a{
    color: #fff;
    &:hover{
      color: #fff;
    }
  }
`;
export const SubSelectStyled = styled.div`
  position: fixed;
  max-width: 200px;
  width: 100%;
  background: #fff;
  top: 40px;
  right: 54px;
  z-index: 9;
  box-shadow: 3px 5px 10px -3px rgba(0, 0, 0, .5);
  border: 1px solid #d1d1d1;
`;

export const SubSelectListStyled = styled.section`
  font-size: 11px;
  padding: 8px 15px;
  color: #333333;
  border-bottom: 1px solid #d1d1d1;
  a{
    color: #333333;
  }
  &:hover{
    background-color: #f7f7f7;
    a{
      color: #626262;
    }
  }
  &:last-child{
    border-bottom: none;
  }
`;

export const OverlayStyled = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 11;
  visibility: hidden;
  top: 0;
  opacity: 1;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
`;

export const CloseMenuStyled = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
  color: #fff;
  font-size: 15px;
`;

export const MenuMobileStyled = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  background-color: #373a47;
  overflow-x: hidden;
  padding-top: 40px;
  transition: 0.3s;
  & > section{
    display: inline-block;
    text-align: end;
    width: 100%;
    text-transform: uppercase;
    transition: background 0.3s, box-shadow 0.3s;
    padding: 12px 15px;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);
    input{
      width: 100%;
      background: #fff;
    }
    & > span{
      margin-left: 8px;
    }
    & > span{
      font-size: 11px;
    }
  }
`;
