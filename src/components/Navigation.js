// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
    NavLink,
    Button
} from 'reactstrap';

const Navigation = ({onClick,isOpen,links=[{url:`${process.env.PUBLIC_URL}`,text: 'Home'},
 {url:`${process.env.PUBLIC_URL}auth/logout`,text:'Logout'}], active="", buttons=[]}) =>
    <div>
    <Navbar color="faded" light expand="md">
    <NavbarToggler right="" onClick={onClick} />
    <NavbarBrand tag={Link} to={process.env.PUBLIC_URL}>µAPI Manager</NavbarBrand>
    <Collapse isOpen={isOpen} navbar>
    <Nav className="ml-auto" navbar>


    {buttons.map( ({url, text}, i ) =>
		(
			<NavItem key={i.toString()+'_btn'}>
			<Button size="sm">
			<NavLink tag={Link} to={url}>{text}</NavLink>
			</Button>
			</NavItem>
		))
    }

    {links.map( ({url, text}, i ) =>
    {
        let p = {};
        if(active === text) p.active=true;
        return (
			<NavItem key={i} {...p}>
		<NavLink tag={Link} to={url}>{text}</NavLink>
			</NavItem>
		)
    })
    }
    </Nav>
    </Collapse>
    </Navbar>
    </div>

export default Navigation
