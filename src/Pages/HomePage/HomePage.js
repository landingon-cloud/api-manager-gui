import React, { Component, useEffect } from 'react';
import { Button, ListGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import ServiceSummary from './ServiceSummary'

const ServiceList = ({services,toggleService}) => {
    return services.map((service,i)=> <ServiceSummary key={i.toString()} {...service} toggle={toggleService} />)
}

export default () => {
    const dispatch = useDispatch();
    const services = useSelector(s=>s.services.servicelist);
    const toggleService = (id)=>{
        dispatch({ type: 'SERVICE.TOGGLE', id });
    }
    const serviceCreate = () => {
        dispatch({ type: 'SERVICE.NEW' });
    }
    useEffect(()=>{
        dispatch({ type: 'SERVICES.LOAD' })
        dispatch({ type: 'RESOURCES.LOAD' })
    },[])
    return (
        <div>
            <h1>Service List</h1>
            <ListGroup>
                <ServiceList services={services} toggleService={toggleService} />
            </ListGroup>
            <Button onClick={serviceCreate}>Create New µService API</Button>
        </div>
    )
}
