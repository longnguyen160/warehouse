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
    const {children} = this.props;

    return (
      <div className="app-wrapper">
        <TopNavBar />
        {children}
      </div>
    );
  }
}

export default MainLayout;
