import React, {Component} from 'react';
//import { Jumbotron } from 'reactstrap';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../Pages/LoginPage/LoginPage';
import Logout from '../Pages/LoginPage/Logout';

export default () =>
{
    return (
        <div>
                <Routes>
                    <Route path={process.env.PUBLIC_URL+'auth/login'} component={LoginPage} />
                    <Route path={process.env.PUBLIC_URL+'auth/logout'} component={Logout} />
                    <Navigate to={process.env.PUBLIC_URL+'auth/login'} />
                </Routes>
        </div>
    )
}
