import React from 'react';
import TopNavBar from '../containers/TopNavBar';

class MainLayout extends React.Component {

  redirect = () => {
    const { isLoggedIn, history } = this.props;

    if(!isLoggedIn)
      history.push('/signin');
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
