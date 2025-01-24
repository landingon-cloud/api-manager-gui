import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, Button, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'


export default () => {
    const _user = useRef(null);
    const _pass = useRef(null);
    const logged = useSelector(s=>s.loginStatus.logged);
    //let _user ={value:''}, _pass = {value:''};
    useEffect(()=>{
        if(_user.current) {
            _user.current.focus()
        }
    },[])
    const dispatch = useDispatch();

    const login = () => {
        const u = _user.current.value;
        const p = _pass.current.value;
        dispatch({
            type: 'LOGIN',
            payload: {"login": u, "password": p}
        });
    };
    //const { logged } = this.props;
    if (logged) {
        return <Redirect to="/" />
    }
    return (
          <Container>
            <h1>Login</h1>
            <h4>Service Management</h4>
            <div>
            <form onSubmit={login}>
            <div><Input innerRef={_user} type="text" placeholder="login" name="login"/></div>
            <div><Input type="password" innerRef={_pass} placeholder="password" name="password"/></div>
            <Button onClick={login}>Login</Button>
            </form>
            </div>
          </Container>
    )

}
