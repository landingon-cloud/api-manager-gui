import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';

const SaveBox = ({serviceid}) => {
    const dispatch = useDispatch()
    const id = serviceid;
    const services = useSelector(s=>s.services.servicedefinitions);
    const detail = services[id];

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

export default SaveBox;