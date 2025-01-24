import React from 'react';
import { Button, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const serviceStatusClass = (lastStart, lastUpdate) => {
    if(lastStart === false) return "text-muted";
    if(lastStart < lastUpdate) return "text-warning";
    return "text-success";
}

const ActivationButton = ({toggle}) => <Button color="link" onClick={toggle}><i className="fa fa-toggle-on" /></Button>;
const DeactivationButton = ({toggle}) => <Button color="link" onClick={toggle}><i className="fa fa-toggle-off" /></Button>;

const ServiceSummary = ({name, lastStart, lastUpdate, toggle}) => {
    const tgturl = process.env.PUBLIC_URL.toString() + 'editapi/' + name;
    return (<ListGroupItem> {lastStart!==false?<ActivationButton toggle={()=>{toggle(name)}}/>:<DeactivationButton toggle={()=>{toggle(name)}} />} {name} <Link to={tgturl}>Edit</Link><span className={serviceStatusClass(lastStart, lastUpdate)}> ({lastUpdate} - {lastStart})</span></ListGroupItem>)

}


export default ServiceSummary;
