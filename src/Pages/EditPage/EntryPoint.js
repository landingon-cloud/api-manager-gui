import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default ({entryPoint, entryIdx, baseUrl, deleteEntry}) => {
    const deleteAction = (evt)=>{
        if( window.confirm(`Are you sure to delete ${entryPoint.method} ${entryPoint.url}?`)) {
            deleteEntry(entryIdx);
        } else {
            console.log('Sie waren nicht sicher');
        }
    }
    return (
        <div>
        {entryPoint.method} - {entryPoint.type} - {entryPoint.url}
        <p>
        <Link to={baseUrl + '/editentry/' + entryIdx}>Edit {entryPoint.url}</Link>
        <Button onClick={deleteAction} color="link">Delete</Button>
        </p>
        </div>
    )
}
