import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import './App.css';
import './index.css';

import { store, history } from './redux/configureStore';

import UnauthorizedLayout from './RouteList/UnauthorizedLayout';
import AuthorizedRoute from './RouteList/AuthorizedRoute';
import PrimaryLayout from './RouteList/PrimaryLayout';

export default () => {
    return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
           <Switch>
             <Route path={process.env.PUBLIC_URL+'auth/'} component={UnauthorizedLayout} />
             <AuthorizedRoute path={`${process.env.PUBLIC_URL}`} component={PrimaryLayout} />
           </Switch>
          </ConnectedRouter>
        </Provider>
    );
}
