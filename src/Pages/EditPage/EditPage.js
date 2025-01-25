import React, { Component, useEffect, useRef, useState } from 'react';
import { useParams, useRouteMatch, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';

import { Container, Button, Input, ListGroupItem, ListGroup } from 'reactstrap';

import EntryPoint from './EntryPoint';

import ServiceSetting from './ServiceSetting';
import ServiceSettingShow from './ServiceSettingShow';

const AddEntryPoint = ({serviceid}) => {
    const dispatch = useDispatch();
    const _entry = useRef(null);
    const addEntry = () => {
        let newEntryName = _entry.current.value;
        dispatch({
            type: 'SERVICE.ADDENTRYPOINT',
            id: serviceid,
            newEntryName
        })
    }
    return (
        <div>
            <Input innerRef={_entry} placeholder="entry point url" pattern="[a-zA-Z_\-]" />
            <Button onClick={addEntry}>Add entry point</Button>
        </div>
    )
}

const EntryPoints = ({detail,serviceid:id}) => {
    if(!detail) {
        return null;
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const deleteEntry = (entryIdx) => {
        dispatch({ type: 'SERVICE.DELENTRYPOINT', id, entryIdx});
    }
    const list = detail.definition.entry_points.map((r, i) => (
        <ListGroupItem key={`e${i}`}>
            <EntryPoint deleteEntry={deleteEntry} baseUrl={location.pathname} entryIdx={i} entryPoint={r} />
        </ListGroupItem>))
    return (
        <ListGroup>
            {list}
        </ListGroup>
    )
}

const SaveBox = ({detail, serviceid}) => {
    const dispatch = useDispatch()
    const id = serviceid
    let changes = (detail && detail.changes)?detail.changes:[];
    const saveService = () => {
        dispatch({type: 'SERVICE.SAVE',id: id})
    }
    return (<div>
        <div>
        changes: {changes.map((change,i)=>(<span key={`change-${i}`} title={JSON.stringify(change,null,"\t")}>{change.op} </span>))}
        </div>
        <Button onClick={saveService}>Save</Button>
    </div>)
}

const SetNameServiceForm = ({detail}) => {
    const dispatch = useDispatch();
    const _name = useRef(null);
    const changeName = evt => {
        const newname = _name.current.value;
        dispatch({
            type: 'SERVICE.SETNAME',
            id: detail.id,
            oldname: detail.name,
            name: newname
        })
    }
    return (
        <form>
        <Input innerRef={_name} name="name" />
        <Button onClick={changeName}>set name</Button>
        </form>
    )
}

export default () => {
    const [settingOpen, openSetting] = useState(false);
    const dispatch = useDispatch();
    const services = useSelector(s=>s.services.servicedefinitions);
    const resources = useSelector(s=>s.resources);
    const {id} = useParams();
    const detail = services[id];
    useEffect(() => {
        dispatch({
            type: 'SERVICEDETAIL.LOAD',
            payload: id
        })
    },[detail]);
    const editSettings = () => {
        console.log('isedit');
        openSetting(true);
    }
    if (!detail) {
        return <div>loading</div>
    }
    return (
        <div>
            <Container>
                <h1>Edit {id}</h1>
                {detail&&detail.isNew?(<SetNameServiceForm detail={detail} />):''}
                {settingOpen?(<ServiceSetting name={id} detail={detail} />):(<ServiceSettingShow name={id} detail={detail} edit={editSettings} />)}
                <h2>Entry Points</h2>
                <Container>
                    <EntryPoints detail={detail} serviceid={id}/>
                    <AddEntryPoint serviceid={id}/>
                </Container>
                <div>
                    <SaveBox detail={detail} serviceid={id} />
                </div>
            </Container>
        </div>
    )
}
