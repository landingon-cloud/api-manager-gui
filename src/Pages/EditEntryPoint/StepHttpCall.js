import React, { Component } from 'react'

import { Container, Alert} from 'reactstrap';

import DropDownByClick from '../../components/DropDownByClick';
import InputTextByClick from '../../components/InputTextByClick';
import InputTextareaByClick from '../../components/InputTextareaByClick';

import {ServiceFilterFormat} from './ServiceFilterFormat';

const httpMethods = [
    {name:"GET", value:"GET"},
    {name:"POST", value:'POST'},
    {name:"PUT", value:'PUT'},
    {name:"PATCH", value:'PATCH'},
    {name:"DELETE", value:'DELETE'},
    {name:"OPTIONS", value:"OPTIONS"}
];

const requestContentTypes = [
    "application/json",
    "multipart/form-data"
]

export default ({enquireEdit, editProp, step, save}) => {
    const hasPayload = (method) => {
        return method==='PATCH'||method==='PUT'||method=='POST';
    }
    return (
        <Container>
            {step.service?'':<Alert color="danger">
            Service must be selected!
            </Alert>}
            <small>Query execution by a service (command over ZMQ channel)</small>
            <ServiceFilterFormat format="http"
                step={step}
                save={save('service')} enquireEdit={enquireEdit} editMode={editProp==="service"} />
            <small>(replacement allowed in urlpath!)</small>
            <InputTextByClick name="urlpath" value={step.urlpath}
                save={save('urlpath')} enquireEdit={enquireEdit}
                editMode={editProp==="urlpath"} />
            <small>format: <pre>user:pass</pre> (replacement allowed in httpauth!)</small>
            <InputTextByClick name="httpauth" value={step.httpauth}
                    save={save('httpauth')} enquireEdit={enquireEdit}
                    editMode={editProp==="httpauth"} />
            <DropDownByClick name="method" value={step.method}
                options={httpMethods}
                save={save('method')} enquireEdit={enquireEdit} editMode={editProp==="method"} />
            {hasPayload(step.method)?
                <>
                <DropDownByClick name="requestContentType" value={step.requestContentType}
                options={requestContentTypes}
                save={save('requestContentType')} enquireEdit={enquireEdit} editMode={editProp==="requestContentType"} />
            <InputTextareaByClick name="payload" value={step.payload}
                save={save('payload')} enquireEdit={enquireEdit} editMode={editProp==="payload"} />
            </>:''}

        </Container>
    )
}
