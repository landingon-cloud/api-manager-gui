import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import {getBreadCrumbTo} from './crumbgen';

export default () => {
    const location = useLocation();
    const crumbs = getBreadCrumbTo(location.pathname, process.env.PUBLIC_URL);
    return (
        <div>
        <Breadcrumb>
        {crumbs.map((b,i)=>(<BreadcrumbItem key={i}><Link to={b.path}>{b.name}</Link></BreadcrumbItem>))}
        </Breadcrumb>
        </div>
    )
}
