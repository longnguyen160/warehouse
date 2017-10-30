import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderMainBlockStyled,
  HeaderMainItemsStyled,
  HeaderMainStyled,
  LogoStyled,
  SubSelectListStyled,
  SubSelectStyled
} from '../../../stylesheets/TopNavBar';
import { Image } from "../../../stylesheets/GeneralStyled";

class TopNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogout: false
    }
  }
  logOut = () => {
    Meteor.logout();
  }

  toggleLogout = () => {
    const { showLogout } = this.state;
    this.setState({ showLogout: !showLogout });
  }

  render() {
    const { user } = this.props;
    const { showLogout } = this.state;

    if (user) {
      return (
        <HeaderMainStyled center>
          <HeaderMainBlockStyled hasAuto>
            <HeaderMainItemsStyled general mobileMenu>
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled general mobileMenu>
              <span>Staff ID: {user._id}</span>
            </HeaderMainItemsStyled>
            <HeaderMainItemsStyled
              info
              show={showLogout}
              onClick={this.toggleLogout}
            >
              <i className="fa fa-chevron-down"/>
              <SubSelectStyled>
                <SubSelectListStyled onClick={this.logOut}>
                  <Link to='/signin'>Logout</Link>
                </SubSelectListStyled>
              </SubSelectStyled>
            </HeaderMainItemsStyled>
          </HeaderMainBlockStyled>
        </HeaderMainStyled>
      );
    }
    return null;
  }
}

export default TopNavBar;
