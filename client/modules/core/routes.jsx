import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import MainLayout from './containers/MainLayout';
import SignIn from '../account/containers/SignIn';
import HomePage from './components/HomePage';
import CheckItems from '../checkItems/containers/CheckItems';
import StockIn from '../stockIn/components/StockIn';

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const SignInCtx = injectDeps(SignIn);
  const history = createHistory();
  Meteor.startup(() => {
    ReactDOM.render((
      <Router history={history}>
        <Switch>
          <Route exact path="/signin" component={SignInCtx}/>
          <Route
            path="/"
            render={() => (
              <MainLayoutCtx history={history}>
                <Switch>
                  <Route
                    path='/checkItems'
                    render={() => (
                      <CheckItems history={history}/>
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
                </Switch>
              </MainLayoutCtx>
            )}
          />
        </Switch>
      </Router>
    ), document.querySelector('#reactRoot'));
  });
}