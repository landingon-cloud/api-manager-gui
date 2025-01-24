import React, { Component, useRef, useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';

const ValidState = ({state, validation, gotopos}) => {
    if(!validation) {
        return null;
    }
    if (state.valid) {
        return (<i className="fa fa-check-square"></i>);
    }
    return (
        <small onClick={gotopos} className="fa fa-times-square" title={state.errorDetail}>{state.error}</small>
    );
}

const EditableArea = ({save, defaultValue, updateValidStatus, position}) => {
    const textInput = useRef(null);
    const dosave = (e) => {
        const value = textInput.current.value;
        save(value);
    }
    useEffect(()=>{
        if(textInput.current) {
            let tarea = textInput.current;
            tarea.focus();
            tarea.setSelectionRange(position, position+1);
        }
    },[textInput, position]);
    const updateValid = () => {
        const value = textInput.current.value;
        updateValidStatus(value);
    }
    return (<span><Input innerRef={textInput} type="textarea" onKeyUp={updateValid} defaultValue={defaultValue} /><Button onClick={dosave}>Save</Button></span>);
}

export default ({name, value, editMode, enquireEdit, save, validation}) => {
    const [valid, setValid] = useState({valid:true,error:false});
    const [cursor,setCursor] = useState(value?value.length:0);
    const toggle = (evt) => {
        enquireEdit(name);
    }
    const savename = (value)=>save(name,value);
    const gotopos = ()=>{setCursor(valid.position)};
    const updateValidStatus = validation?(value)=>{
        let result = validation(value);
        if ( result && result.error) {
            setValid(result);
        } else {
            setValid({valid:true});
        }
    }:()=>{};
    if( editMode) {
        const position = (valid.position)?valid.position:0;
        return (<div>
            {name}: <EditableArea save={savename} defaultValue={value} updateValidStatus={updateValidStatus} position={cursor}/>
        <ValidState state={valid} validation={validation} gotopos={gotopos}/>
            </div>)
    } else {
        return (<div title="click to change" onClick={toggle}>
        {name}: <strong>{value}</strong> <i className="fa fa-edit"></i>
    <ValidState state={valid} validation={validation} gotopos={gotopos} />
        </div>)
    }
}
