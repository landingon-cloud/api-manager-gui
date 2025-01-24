export function loadService(id) {
    return {
        type: 'SERVICEDETAIL.LOAD',
        payload: id
    };
}


export function resourceLoad() {
    return {
        type: 'RESOURCES.LOAD'
    }
}


export function saveService(id) {
    return {
        type: 'SERVICE.SAVE',
        id: id
    }
}

export function changeName(id, old, newname) {
    console.log('changeName',old, newname)
    return {
        type: 'SERVICE.SETNAME',
        id,
        oldname: old,
        name: newname
    }
}


export function serviceEdit(id, propName, propValue) {
    return {
        type: 'SERVICE.CHANGEPROP',
        id,
        propName,
        propValue
    }
}


export function deleteEntryPoint(id,entryIdx) {
    return {
        type: 'SERVICE.DELENTRYPOINT',
        id,
        entryIdx
    }
}

export function addEntryPoint(id,newEntryName) {
    return {
        type: 'SERVICE.ADDENTRYPOINT',
        id,
        newEntryName
    }
}
