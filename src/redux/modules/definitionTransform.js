import {fromJS} from 'immutable';
import {arrayMove} from 'react-sortable-hoc';


export function entryPipeEdit(definition, a) {
    let de = fromJS(definition).toJS();
    let pipeStep = de.entry_points[a.entryIdx].pipeline_steps[a.stepIdx];
    let oldValue = pipeStep[a.propName];
    pipeStep[a.propName] = a.value;
    if (a.propName == 'type') {
        if (a.value == 'hquery-standard') {
            de.entry_points[a.entryIdx]['out_format'] = "standard";
        } else {
            de.entry_points[a.entryIdx]['out_format'] = undefined;
        }
    }
    if(oldValue === a.value) {
        return {definition:de, change: undefined}
    } else {
        return {definition:de, change: {op:'entryPipeEdit', action: a, oldValue}};
    }
}
export function entryPipeAddstep(definition, a) {
    let de = fromJS(definition).toJS();
    let pipeStep = de.entry_points[a.entryIdx].pipeline_steps;
    pipeStep.push(newPipeEntry());
    return {definition:de, change: {op:'entryPipeAddstep', action:a}};
}

export function entryPipeSort(definition, a) {
    let de = fromJS(definition).toJS();
    let pipeStep = de.entry_points[a.entryIdx].pipeline_steps;
    de.entry_points[a.entryIdx].pipeline_steps = arrayMove(pipeStep, a.oldIndex, a.newIndex);
    return {definition:de, change: {op:'entryPipeSort', action:a}};
}

export function entryPipeRmstep(definition, a) {
    let de = fromJS(definition).toJS();
    let deleted = de.entry_points[a.entryIdx].pipeline_steps[a.stepIdx]
    de.entry_points[a.entryIdx].pipeline_steps.splice(a.stepIdx,1);
    return {definition:de, change: {op:'entryPipeRmstep', action:a, deleted}};
}

export function entryEdit(definition, a) {
    let de = fromJS(definition).toJS();
    let entryPoint = de.entry_points[a.entryIdx]
    let oldValue =undefined;
    if (a.propName !== 'pipeline_steps') {
        oldValue = entryPoint[a.propName];
        entryPoint[a.propName] = a.propValue;
    } else {
        console.log('not found that prop', a)
    }
    return {definition:de, change: {op:'entryEdit', oldValue, action:a}};
}

export function addEntry(definition, a) {
    let de = fromJS(definition).toJS();
    let epoint = newEntryPoint( makeAnUrl(a.newEntryName?a.newEntryName:'/newurl') )
    de.entry_points.push(epoint);
    return {definition:de, change: {op:'addEntry', val:epoint, action:a}};

}

export function delEntry(definition, a) {
    let de = fromJS(definition).toJS();
    let deleted = de.entry_points[a.entryIdx];
    de.entry_points.splice(a.entryIdx,1);
    return {definition:de, change: {op:'delEntry',val:deleted, action:a}};
}

export function serviceEdit(definition, a) {
    let de = fromJS(definition).toJS();
    let oldValue =undefined;
    if (a.propName !== 'entry_points') {
        oldValue = de[a.propName];
        de[a.propName] = a.propValue;
    } else {
        console.log('not found that prop', a)
    }
    if(oldValue === a.propValue) {
        return {definition:de, change: undefined}
    }
    return {definition:de, change: {op:'serviceEdit', oldValue, action:a}};
}

export const applyTransition = function (st, op, action) {
    const {change, definition } = eval(op)(st.definition,action);
    return {...st, changes: change?st.changes.concat(change):st.changes, definition};
}
















function newPipeEntry() {
    return {type:"zquery","container": "PHP7"}
}

function newEntryPoint(newEntryUrl) {
    return {
        method: 'GET',
        type: 'sync',
        url: newEntryUrl,
        authtype: "FREE",
        pipeline_steps: []
    };
}

function makeAnUrl(aString) {
    return aString.replace(/[^a-zA-Z_\-]/g,'_').replace(/_?/,'/');
}
