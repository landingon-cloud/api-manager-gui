import React, { Component } from 'react';

import { Button, Input } from 'reactstrap';


export default class InputTextByClick extends Component
{

    getSelector(save, defaultValue) {
        let _ipt;
        const dosave = (e) => {
            save(_ipt.value);
        }
        const assign = (i) =>{
            _ipt = i;
            if(i) i.focus();
        }
        return (<span><Input innerRef={i=>assign(i)} defaultValue={defaultValue} /><Button onClick={dosave}>Save</Button></span>)
    }

    render() {
        const toggle = (evt) => {
            this.props.enquireEdit(this.props.name);
        }
        const save = (value) => {
            this.props.save(this.props.name, value);
        }

        let selection = this.getSelector(save, this.props.value)
        if( this.props.editMode) {
            return (<div> {this.props.name}: {selection} </div>)
        } else {
            return (<div title="click to change" onClick={toggle}>{this.props.name}: <strong>{this.props.value}</strong> <i className="fa fa-edit"></i></div>)
        }
    }
}

