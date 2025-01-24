import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

export default ({ component: Component, ...rest}) => {
    const logged = useSelector(s=>s.loginStatus.logged);
    return (
        <Route {...rest} render={props => {
                return logged?
                <Component {...props} />
                : <Redirect to={process.env.PUBLIC_URL+'auth/login'} />
        }} />
    );
}
