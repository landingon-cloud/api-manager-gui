import React, { Component } from 'react'

import { Container, Alert} from 'reactstrap';

import InputTextareaByClick from '../../components/InputTextareaByClick';

import {ServiceFilterFormat} from './ServiceFilterFormat';

export default ({enquireEdit, editProp, step, save}) => {
    return (
        <Container>
            {step.service?'':<Alert color="danger">
            Service must be selected!
            </Alert>}
            <small>Query execution by a service (command over HTTP channel). Compact version: an array of arrays, the first being the fieldnames, others are values.</small>
            <ServiceFilterFormat format="hsql"
                step={step}
                save={save('service')} enquireEdit={enquireEdit} editMode={editProp==="service"} />
        <InputTextareaByClick name="query" value={step.query}
                save={save('query')} enquireEdit={enquireEdit} editMode={editProp==="query"} />

        </Container>
    )
}
