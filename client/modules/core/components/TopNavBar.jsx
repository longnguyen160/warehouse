import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  CloseMenuStyled,
  HeaderMainBlockStyled,
  HeaderMainItemsStyled,
  HeaderMainStyled,
  MenuMobileStyled,
  OverlayStyled
} from '../../../stylesheets/TopNavBar';

class TopNavBar extends Component {

  constructor(props) {
    super(props);
  }

  logOut = () => {
    Meteor.logout();
  };

  openMenu = () => {
    document.getElementById('OverlayStyled').style.visibility = 'visible';
    document.getElementById('SideMenuMobile').style.width = '250px';
  };

  closeMenu = () => {
    document.getElementById('OverlayStyled').style.visibility = 'hidden';
    document.getElementById('SideMenuMobile').style.width = '0';
  };

  renderMobile() {
    const { history } = this.props;

    if (history.location.pathname === '/') {
      return (
        <MenuMobileStyled id="SideMenuMobile">
          <CloseMenuStyled onClick={this.closeMenu}>
            <i className="fa fa-times" onClick={this.closeMenu} />
          </CloseMenuStyled>
          <HeaderMainItemsStyled general onClick={this.logOut}>
            <Link to="/signin">
              <i className="fa fa-power-off"/>
              <span>Logout</span>
            </Link>
          </HeaderMainItemsStyled>
        </MenuMobileStyled>
      );
    }
    return (
      <MenuMobileStyled id="SideMenuMobile">
        <CloseMenuStyled onClick={this.closeMenu}>
          <i className="fa fa-times" onClick={this.closeMenu} />
        </CloseMenuStyled>
        <HeaderMainItemsStyled general onClick={this.closeMenu}>
          <Link to="/">
            <i className="fa fa-home"/>
            <span>Dashboard</span>
          </Link>
        </HeaderMainItemsStyled>
        <HeaderMainItemsStyled general onClick={this.closeMenu}>
          <Link to="/checkItems">
            <i className="fa fa-check"/>
            <span>Check Items</span>
          </Link>
        </HeaderMainItemsStyled>
        <HeaderMainItemsStyled general onClick={this.closeMenu}>
          <Link to="/stockIn">
            <i className="fa fa-download"/>
            <span>Stock in</span>
          </Link>
        </HeaderMainItemsStyled>
        <HeaderMainItemsStyled general onClick={this.closeMenu}>
          <Link to="/stockOut">
            <i className="fa fa-upload"/>
            <span>Stock out</span>
          </Link>
        </HeaderMainItemsStyled>
        <HeaderMainItemsStyled general onClick={this.closeMenu}>
          <Link to="/printReport">
            <i className="fa fa-print"/>
            <span>Print report</span>
          </Link>
        </HeaderMainItemsStyled>
        <HeaderMainItemsStyled general onClick={this.logOut}>
          <Link to="/signin">
            <i className="fa fa-power-off"/>
            <span>Logout</span>
          </Link>
        </HeaderMainItemsStyled>
      </MenuMobileStyled>
    );
  }

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const { user, history } = this.props;
    let title = '';

    switch (history.location.pathname) {
      case '/':
        title = 'DASHBOARD';
        break;
      case '/checkItems':
        title = 'CHECK ITEMS';
        break;
      case '/stockIn':
        title = 'STOCK IN';
        break;
      case '/stockOut':
        title = 'STOCK OUT';
        break;
      case '/printReport':
        title = 'PRINT REPORT';
        break;
    }

    if (user) {
      return (
        <HeaderMainStyled>
          <HeaderMainBlockStyled>
            <HeaderMainItemsStyled
              mobileMenu
              isHidden={history.location.pathname === '/'}
              onClick={this.goBack}
            >
              <i className="fa fa-angle-left" />
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled general mobileMenu center>
              <span>{title}</span>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled
              mobileMenu
              onClick={this.openMenu}
            >
              <i className="fa fa-bars" />
            </HeaderMainItemsStyled>
          </HeaderMainBlockStyled>
          <OverlayStyled
            id="OverlayStyled"
            onClick={this.closeMenu}
          >
          </OverlayStyled>
          {this.renderMobile()}
        </HeaderMainStyled>
      );
    }
    return null;
  }
}

export default TopNavBar;
