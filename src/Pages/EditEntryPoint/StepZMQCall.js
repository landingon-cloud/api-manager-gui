import React, { Component } from 'react'

import { Container, Alert} from 'reactstrap';

import InputTextByClick from '../../components/InputTextByClick';
import InputTextareaByClick from '../../components/InputTextareaByClick';

import {ServiceFilterFormat} from './ServiceFilterFormat';

import {validateJsonReplacement} from './validators';

export default ({enquireEdit, editProp, step, save}) => {
    const help_msg_format = 'The message is a json made of command and data: {cmd: "/callname", data:{"par1":"val1"}}';
    const help_data_format = '{prop: "value"} is BAD. {"prop": "value"} is OK. DO NOT FORGET double-quotes!!!!'
    const help_data_format2 = '{"sellername": "${url.seller}", "ean":[${_swallow(step0).pluck(ean).dqJoin(,)}]}';
    return (
        <Container>
            {step.service?'':<Alert color="danger">
            Service must be selected!
            </Alert>}
            <small>Call an internal ZMQ service</small>
            <ServiceFilterFormat format={false}
                step={step}
                save={save('service')} enquireEdit={enquireEdit} editMode={editProp==="service"} />
            <small>{help_msg_format}</small>
                <InputTextByClick name="cmd" value={step.cmd}
                                save={save('cmd')} enquireEdit={enquireEdit} editMode={editProp==="cmd"}/>
                                <div>
                                <small><strong>USE LEGAL JSON</strong>:{help_data_format} <br />
                                Can be used everything available from the entry point but format with dquotes:<br />
                                {help_data_format2}
                                </small>
                                </div>
        <InputTextareaByClick name="data" value={step.data}
                save={save('data')} enquireEdit={enquireEdit} editMode={editProp==="data"}
                validation={validateJsonReplacement} />

        </Container>
    )
}
