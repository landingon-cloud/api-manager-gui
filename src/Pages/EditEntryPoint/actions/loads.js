export function loadService(id) {
    return {
        type: 'SERVICEDETAIL.LOAD',
        payload: id
    };
}

export function entryPipeEdit(id, entryIdx, stepIdx, propName, value) {//editPipe
    return {
        type: 'SERVICE.ENTRY.PIPE.EDIT',
        id,
        entryIdx,
        stepIdx,
        propName,
        value
    }
}

export function entryPipeAddstep(id, entryIdx) {
    return {
        type: 'SERVICE.ENTRY.PIPE.ADDSTEP',
        id,
        entryIdx
    }
}

export function entryPipeRmstep(id, entryIdx, stepIdx) {
    return {
        type: 'SERVICE.ENTRY.PIPE.RMSTEP',
        id,
        entryIdx,
        stepIdx
    }
}

export function entryPipeSort(id, entryIdx, index, oldIndex, newIndex) {
    return {
        type: 'SERVICE.ENTRY.PIPE.SORT',
        id,
        entryIdx,
        oldIndex,
        newIndex
    }
}


export function entryEdit(id, entryIdx, propName, propValue) {
    return {
        type: 'SERVICE.ENTRY.CHANGEPROP',
        id,
        entryIdx,
        propName,
        propValue
    }
}