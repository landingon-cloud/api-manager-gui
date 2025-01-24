import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container, Button } from 'reactstrap';

export default () => {
    const dispatch = useDispatch();
    const apierror = useSelector(s=>s.apierror);
    const detail = useSelector(s=>s.service);
    const clear = () => {
        dispatch({type:'APIERROR.CLEAR'});
    }
    return (
        <Container className="api-debug">
        {apierror.errors?apierror.errors.map((error,i)=>(<p key={i}>{i} - {error.toString()}</p>)):(<p />)}
        {apierror.errors&&apierror.errors.length?<Button onClick={clear}>Clear Debug</Button>:""}
        </Container>
    )
}
