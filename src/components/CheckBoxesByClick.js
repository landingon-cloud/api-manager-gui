import React, { Component, useState } from 'react';
import { Button, Input, Label, InputGroup } from 'reactstrap';

const SwitchButton = ({isOn,name,toggle}) => {
    const cName = isOn?"fa fa-toggle-on":"fa fa-toggle-off";
    // or is it <span>{name}</span> ?
    return (<Button color="link" onClick={toggle}><i className={cName} /> {name}</Button>);
}

const SelectorBoxes = ({availableOptions, selectedOptions, save}) => {
    const [checked, setChecked] = useState(selectedOptions);
    const inSelected = (name) => checked.indexOf(name)!== -1;
    const toggle = name => () => {
        const indexOf = checked.indexOf(name);
        if(indexOf === -1) {
            setChecked(checked.concat([name]))
        } else {
            setChecked(checked.slice().splice(indexOf, 1))
        }
    }
    const dosave = () => {
        save(checked);
    }
    return (
        <div>
            {availableOptions.map((o,i) => {
                const name = (typeof o === 'object')?o.name:o;
                const isOn = inSelected(name);
                return (<SwitchButton key={i.toString()} isOn={isOn} name={name} toggle={toggle(name)} />);
            })}
            <Button onClick={dosave}>Save</Button>
        </div>
    );
}

export default ({name, groupName, availableOptions, selectedOptions, enquireEdit, save, editMode}) => {
    if(editMode) {
        const savename = (value) => save(name, value);
        return (<div> {name}: <SelectorBoxes availableOptions={availableOptions} save={savename} selectedOptions={selectedOptions} /> </div>)
    } else {
        const toggle = (evt) => {
            enquireEdit(name);
        }
        return (<div title="click to change" onClick={toggle}>{groupName}: <strong>{selectedOptions.map( (o,i) => {return <Button color="light" size="sm" key={i.toString()}>{o}</Button>} )}</strong> <i className="fa fa-edit"></i></div>)
    }
}
