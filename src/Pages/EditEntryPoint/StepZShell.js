import React, { Component } from 'react'

import { Container, Alert} from 'reactstrap';

import InputTextareaByClick from '../../components/InputTextareaByClick';

import {ServiceFilterFormat} from './ServiceFilterFormat';
import { useSelector } from 'react-redux';

export default ({enquireEdit, editProp, step, save}) => {
    const availableFolders = useSelector(s=>s.resources.zshell_folders) || [];
    
    return (
        <Container>
            {step.service?'':<Alert color="danger">
            Service must be selected!
            </Alert>}
            <small>Shell command execution by a service (command over ZMQ channel)</small>
                <div>
                    <small>Available Folders: </small> {availableFolders.map((f,i,c,a)=>(<span key={i.toString()}><strong>{f}</strong> , </span>))}
                </div>
            <ServiceFilterFormat format="zshell"
                step={step}
                save={save('service')} enquireEdit={enquireEdit} editMode={editProp==="service"} />
        <InputTextareaByClick name="command" value={step.command}
                save={save('command')} enquireEdit={enquireEdit} editMode={editProp==="command"} />

        </Container>
    )
}
