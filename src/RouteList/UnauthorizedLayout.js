import React, {Component} from 'react';
import { Jumbotron } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '../Pages/LoginPage/LoginPage';
import Logout from '../Pages/LoginPage/Logout';

export default () =>
{
    return (
        <div>
            <Jumbotron>
                <Switch>
                    <Route path={process.env.PUBLIC_URL+'auth/login'} component={LoginPage} />
                    <Route path={process.env.PUBLIC_URL+'auth/logout'} component={Logout} />
                    <Redirect to={process.env.PUBLIC_URL+'auth/login'} />
                </Switch>
            </Jumbotron>
        </div>
    )
}
