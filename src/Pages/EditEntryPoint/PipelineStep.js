import React, { Component, useState, useEffect } from 'react';

import { SortableHandle } from 'react-sortable-hoc';

import DropDownByClick from '../../components/DropDownByClick';

import {validateJson} from './validators'

import OnErrorRepl from './OnErrorReplace';

import {step_types} from './step_types';

const StepProperties = ({type, step, editProp, enquireEdit, save}) => {
    const def = step_types.find(t=>t.value===type);
    if ( ! def) {
        return (<div>undefined step type</div>);
    }
    const Comp = def.component
    return (<Comp enquireEdit={enquireEdit} editProp={editProp} step={step} save={save} />)
}

function PipelineStepComponent({step,stepIdx,edit,removeSelf})
{
    const [editProp, changeEditProp ] = useState(false);
    const simpleConfirm = (e) => {
        e.stopPropagation();
        if(window.confirm(`Are you sure to remove this step ${stepIdx}?`)) {
            removeSelf();
        }
    }

    const onEscape = ({ keyCode }) => {
        if (keyCode === 27) {
            changeEditProp(false);
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', onEscape);
        return () => {
            document.removeEventListener('keydown', onEscape);
        }
    })

    const DragHandle = SortableHandle(() => <span className="drag-handle" title="drag to arrange">step#: {stepIdx}</span>);

    const save = (ed) => (prop, value) =>  {
        edit(ed, value);
        changeEditProp(false);
    }

    const enquireEdit = (p) => () => changeEditProp(p);

    return (
        <div className="container-border-relative">
        <div>
        <DropDownByClick name="Type" value={step.type} options={step_types}
                save={save('type')} enquireEdit={enquireEdit('type')} editMode={editProp==="type"} />
        </div>
        <div>
            <StepProperties type={step.type}
                editProp={editProp}
                enquireEdit={(p) => enquireEdit(p)()}
                step={step}
                save={save} />
        </div>
        <div>
            <OnErrorRepl stepIdx={stepIdx} onError={step.onError} save={save('onError')}
                enquireEdit={enquireEdit('onError')} editMode={editProp === "onError"}
                />
        </div>
        <div>
        <strong>debug step: </strong>
        <input type="checkbox" checked={step.debug==true} onClick={()=>save('debug')('debug',!step.debug)}/>
        </div>
        <DragHandle />
        <span className="remove-handle" title="remove" onClick={simpleConfirm}>X</span>
        </div>
    )
}

export default PipelineStepComponent;
