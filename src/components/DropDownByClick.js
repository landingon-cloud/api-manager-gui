import React, { Component, useRef } from 'react';
import { Button } from 'reactstrap';

const isAdvancedOptions = (options) => (options && options.length && typeof options[0] === 'object');

const DropDownSelector = ({save, options, defaultValue}) => {
    const _sel = useRef(null);
    const dosave = () => {
        let val = _sel.current.value;
        save(val);
    }
    const getOptMap = (options) =>{
        if(isAdvancedOptions(options)) {
            return options.map((o,i) => {
                const props = (o.disabled?{disabled:'disabled'}:{});
                return (<option {...props} key={i.toString()} value={o.value}>{o.name}</option>);
            });
        } else {
            return options.map((o,i) => {
                return (<option key={i.toString()} value={o}>{o}</option>);
            });
        }
    }
    return (
        <span>
            <select ref={_sel} defaultValue={defaultValue} >
                {getOptMap(options)}
            </select><Button onClick={dosave}>Save</Button>
        </span>
    )
}

export default ({name, value, options, save, enquireEdit, editMode}) => {
    const toggle = (evt) => {
        enquireEdit(name);
    }
    const savename = (value) => {
        save(name, value);
    }

    if( editMode) {
        return (<div> {name}: <DropDownSelector save={savename} options={options} defaultValue={value} /> </div>);
    } else {
        const getValue = (value, options) => {
            if ( isAdvancedOptions(options) ) {
                const selected = options.find(o=>o.value===value)
                if(selected) {
                    return selected.name;
                }
            }
            return value;
        }
        return (<div title="click to change" onClick={toggle}>{name}: <strong>{getValue(value, options)}</strong> <i className="fa fa-edit"></i></div>)
    }

}
