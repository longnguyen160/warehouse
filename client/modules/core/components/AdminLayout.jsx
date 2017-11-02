import React from 'react';
import AdminTopNavBar from '../components/AdminTopNavBar';

class AdminLayout extends React.Component {

  redirect = () => {
    const { isAdmin, history } = this.props;

    if(!isAdmin)
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
        <AdminTopNavBar history={history} />
        {children}
      </div>
    );
  }
}

export default AdminLayout;
