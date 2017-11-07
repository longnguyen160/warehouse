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

class AdminTopNavBar extends Component {

  constructor(props) {
    super(props);
  }

  logOut = () => {
    Meteor.logout();
  };

  openMenu = () => {
    document.getElementById('OverlayStyled').style.visibility = 'visible';
    document.getElementById('OverlayStyled').style.opacity = 1;
    document.getElementById('SideMenuMobile').style.width = '250px';
  };

  closeMenu = () => {
    document.getElementById('OverlayStyled').style.visibility = 'hidden';
    document.getElementById('OverlayStyled').style.opacity = 0;
    document.getElementById('SideMenuMobile').style.width = '0';
  };

  renderMobile() {
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

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const { history } = this.props;

    return (
      <HeaderMainStyled admin>
        <HeaderMainBlockStyled>
          <HeaderMainItemsStyled
            admin
            isHidden={history.location.pathname === '/admin'}
            onClick={this.goBack}
          >
            <i className="fa fa-angle-left" />
          </HeaderMainItemsStyled>
          <HeaderMainItemsStyled general center admin>
            <span>Admin</span>
          </HeaderMainItemsStyled>
          <HeaderMainItemsStyled
            admin
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
}

export default AdminTopNavBar;
