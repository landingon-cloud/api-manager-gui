import React, { Component } from 'react'

import { Container, Alert} from 'reactstrap';

import InputTextareaByClick from '../../components/InputTextareaByClick';

import {ServiceFilterFormat} from './ServiceFilterFormat';

export default ({enquireEdit, editProp, step, save}) => {
    const availableFolders = ["/storage/saas/script_over_server_execution",
     "/storage/saas/SHAREDCODE",
     "/storage/saas/SharedPHPClasses", "/storage/saas/aftersales", "/storage/saas/customerfiles", "/storage/saas/CENTRAL_LOG"];
    return (
        <Container>
            {step.service?'':<Alert color="danger">
            Service must be selected!
            </Alert>}
            <small>Shell command execution by a service (command over ZMQ channel)</small>
                <div>
                    <small>Available Folders: </small> {availableFolders.map((f,i,c,a)=>(<span key={i.toString()}><strong>{f}</strong> </span>))}
                </div>
            <ServiceFilterFormat format="shell"
                step={step}
                save={save('service')} enquireEdit={enquireEdit} editMode={editProp==="service"} />
        <InputTextareaByClick name="command" value={step.command}
                save={save('command')} enquireEdit={enquireEdit} editMode={editProp==="command"} />

        </Container>
    )
}
