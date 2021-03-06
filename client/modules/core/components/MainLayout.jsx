import React from 'react';
import TopNavBar from '../containers/TopNavBar';
import { ROLES } from '../../../../lib/enums';

class MainLayout extends React.Component {

  redirect = () => {
    const { isLoggedIn, history } = this.props;

    if(!isLoggedIn)
      history.push('/signin');
    if (Meteor.user() && Meteor.user().role === ROLES.ADMIN) {
      history.push('/admin');
    }
  }

  componentWillMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  render() {
    const {children, history} = this.props;

    return (
      <div className="app-wrapper">
        <TopNavBar history={history} />
        {children}
      </div>
    );
  }
}

export default MainLayout;
