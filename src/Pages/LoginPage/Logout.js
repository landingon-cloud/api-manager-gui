import React, { Component, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, Button, Input } from 'reactstrap';
import { Navigate } from 'react-router-dom'

export default () => {
    const logged = useSelector(s=>s.loginStatus.logged);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:'LOGOUT'});
    }, [])

    if (logged) {
        return <Navigate to={process.env.PUBLIC_URL} />
    }
    return (
        <Navigate to={process.env.PUBLIC_URL+"auth/login"} />
    )
}
