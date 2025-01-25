import React, { Component, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
//import EditEntryPoint from './EditEntryPoint';
import * as homeactions from './actions/loads.js'

import SaveBox from '../SaveBox';

import { Container, Button, ListGroupItem, ListGroup } from 'reactstrap';

import PipelineStep from './PipelineStep';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import EntryPointDetail from './EntryPointDetail';

const BASE_REALURL = process.env.BASE_REALURL;


const SortableStep = SortableElement(({ stepDef }) => {
    const { step, apiName, entry, edit, remove, stepIdx } = stepDef;
    //const handle =<DragHandle />
    return (<ListGroupItem>
            <PipelineStep apiName={apiName} entryPoint={entry} edit={edit} removeSelf={remove} step={step} stepIdx={stepIdx} />
        </ListGroupItem>)
});

const SortableList = SortableContainer(({ steps }) => {
    return (
        <ListGroup>
            {steps.map((stepDef, index) => (
                <SortableStep key={`item-${index}`} index={index} stepDef={stepDef} />
            ))}
        </ListGroup>
    );
});

let calcInputParameters = (EntryPoint)  => {
    const { url, method, type, authtype } = EntryPoint;
    let params = ['get.*','body.*','service.remoteAddress', 'service.remotePort'];
    let urlParams = url.split('/').filter((p)=>/^:/.test(p)).map(p=>'url.'+p.substr(1));
    params = params.concat(urlParams);
    if(authtype == 'JWT') {
        params.push('claim.sswid')
        params.push('claim.user_name')
        params.push('claim.user_email')
        params.push('claim.perms')
    }
    return params;
}

function AddStepButton({addStep}) {
    //const { id, entry } = this.props.match.params;
    //const addStep = () => this.props.entryPipeAddstep(id, entry);
    return (<Button size="sm" onClick={addStep}>Add Step</Button>);
}

function PipeSteps({id, entry, steps}) {
    const dispatch = useDispatch()
    const edit = (stepIdx) => (propName, value) => {
        const act = homeactions.entryPipeEdit(id, entry, stepIdx, propName, value);
        dispatch(act);
    }
    const remove = (stepIdx) => (target, value) =>{
        const act = homeactions.entryPipeRmstep(id, entry, stepIdx);
        dispatch(act);
    }

    let items = steps.map((step, index) => {
        return { step: step, apiName: id, entry: entry, edit: edit(index), remove: remove(index), stepIdx: index };
    })

    const sortPipe = ({ index, oldIndex, newIndex }) => {
        const act = homeactions.entryPipeSort(id, entry, index, oldIndex, newIndex);
        dispatch(act);
    }
    return <SortableList useDragHandle={true} steps={items} onSortEnd={sortPipe} />

}

function EntryPoint({detail, entry})
{
    const entrypoint = detail.definition.entry_points[entry];
    const { url, method, type, authtype, jwt_perms, contentType } = entrypoint;
    const inputParameters = calcInputParameters(entrypoint);
    const dispatch = useDispatch();

    const saveEntryProp = (propName, propValue) => {
        const act = homeactions.entryEdit(detail.name, entry, propName, propValue);
        dispatch(act);
    }
    const steps = entrypoint.pipeline_steps;
    const realUrl = BASE_REALURL + detail.name + entrypoint.url;
    const entryPipeAddstep = (id, entryIdx) => {
        dispatch({type: 'SERVICE.ENTRY.PIPE.ADDSTEP',
        id,
        entryIdx})
    }
    const addStep = () => entryPipeAddstep(detail.name, entry);

    return (
        <Container className="container-border">
        <div><small>real url: <a href={realUrl} target="blank">{realUrl}</a></small></div>
            <h3>{detail.name}</h3>
            <h2>{entrypoint.method} {entrypoint.url}</h2>
            <EntryPointDetail {...entrypoint} url={url} method={method} type={type} authtype={authtype} jwt_perms={jwt_perms} saveEntryProp={saveEntryProp} contentType={contentType} />
            <div>
                <small><em>self</em>===[this service name]. Available input parameters (use <strong>get.</strong><i>&lt;anything&gt;</i> and <strong>body.</strong><i>&lt;anything&gt;</i> freely):</small>
                <p>
                {inputParameters.map((p,i)=><em key={'i'+i.toString()}>{p}</em>).reduce((prev, curr) => [prev, ', ', curr])}
                </p>
                <p>For file uploaded, an array of files[], each with <em>filepath</em>, <em>filename</em>, <em>field</em></p>
            </div>
            <Container className="container-border">
                <h3>Steps</h3>
                <PipeSteps id={detail.name} entry={entry} steps={steps} />
                <AddStepButton addStep={addStep} />
            </Container>
        </Container>
    )
}

function EditEntryPointPage({match})
{
    const { id, entry } = match.params;
    const detail = useSelector(s=>s.services.servicedefinitions[id]);
    console.log(detail);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('match', match);
        dispatch(homeactions.loadService(match.params.id));
        //loadService(match.params.id);
    }, [id, detail])

    useEffect(() => {
        console.log('match', match);
        dispatch({ type: 'RESOURCES.LOAD' })
        //loadService(match.params.id);
    }, [])

    if(detail && detail.definition) {
        return (
            <Container>
            <div>
            <EntryPoint detail={detail} entry={entry} />
            {match.url} - {id} - {entry}
            </div>
            <div>
            </div>
            <hr />
            <SaveBox serviceid={id} />
            </Container>
        )
    } else {
        return (
            <Container>
            <div>
            <div>loading ...</div>
            {match.url} - {id} - {entry}
            </div>
            <hr />
            </Container>
        )
    }

}

export default EditEntryPointPage;
