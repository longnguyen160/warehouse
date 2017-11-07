import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import MainLayout from './containers/MainLayout';
import AdminLayout from './containers/AdminLayout';
import SignIn from '../account/containers/SignIn';
import HomePage from './components/HomePage';
import CheckItems from '../checkItems/containers/CheckItems';
import AdminDashBoard from '../admin/components/DashBoard';
import StockIn from '../stockIn/containers/StockIn';
import StockOut from '../stockOut/containers/StockOut';
import StaffManagement from '../staffs/containers/StaffManagement';
import Report from '../reports/containers/Report';

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const AdminLayoutCtx = injectDeps(AdminLayout);
  const SignInCtx = injectDeps(SignIn);
  const history = createHistory();
  Meteor.startup(() => {
    ReactDOM.render((
      <Router history={history}>
        <Switch>
          <Route exact path="/signin" component={SignInCtx} />
          <Route
            path="/admin"
            render={() => (
              <AdminLayoutCtx history={history}>
                <Switch>
                  <Route
                    exact
                    path='/admin'
                    render={() => (
                      <AdminDashBoard history={history} />
                    )}
                  />
                  <Route
                    path='/admin/staffs'
                    render={() => (
                      <StaffManagement history={history} />
                    )}
                  />
                  <Route
                    path='/admin/reports'
                    render={() => (
                      <Report history={history} />
                    )}
                  />
                </Switch>
              </AdminLayoutCtx>
            )}
          />
          <Route
            path="/"
            render={() => (
              <MainLayoutCtx history={history}>
                <Switch>
                  <Route
                    path='/checkItems'
                    render={() => (
                      <CheckItems history={history} />
                    )}
                  />
                  <Route
                    path='/'
                    exact
                    render={() => (
                      <HomePage />
                    )}
                  />
                  <Route
                    path='/stockIn'
                    render={() =>
                      <StockIn />
                    }
                  />
                  <Route
                    path='/stockOut'
                    render={() =>
                      <StockOut />
                    }
                  />
                </Switch>
              </MainLayoutCtx>
            )}
          />
        </Switch>
      </Router>
    ), document.querySelector('#reactRoot'));
  });
}