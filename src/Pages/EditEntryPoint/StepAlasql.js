import React, { Component } from 'react';
import InputTextareaByClick from '../../components/InputTextareaByClick';

export default (props) => {

return (

    <div>
    <small>
    AlaSQL is a special step that can manipulate other result set.
    For generating a set from which select use the .array() method on
    the _swallow chain.
    </small>
    <InputTextareaByClick name="query" value={props.step.query}
    save={props.save('query')} enquireEdit={props.enquireEdit} editMode={props.editProp==="query"} />
    </div>
)
}

//export default StepAlasql;
