import React, { Component, useState, useEffect } from 'react';

import DropDownByClick from '../../components/DropDownByClick';
import InputTextByClick from '../../components/InputTextByClick';
import CheckBoxesByClick from '../../components/CheckBoxesByClick';

import {JwtPermissions} from './JwtPermissions';

export default
function EntryPontDetail({saveEntryProp, jwt_perms, jwt_perms_mode, contentType, method, url, type, authtype, requestContentType,cache,debug})
{
    const [editProp, changeEditProp ] = useState(false);

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

    const save = (p, value) => {
        saveEntryProp(p, value);
        changeEditProp(false);
    }
    const enquireEdit = changeEditProp;

    let authTypeSpecific = (type) => {
        if(type === 'JWT') {
            let selected = jwt_perms?jwt_perms:['admin'];
            return (
                <>
                <JwtPermissions selected={selected} enquireEdit={enquireEdit} save={save} editMode={editProp==='jwt_perms'} />
                <DropDownByClick name="jwt_perms_mode" value={jwt_perms_mode} options={['one of', 'all']}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="jwt_perms_mode"} />
                </>
            );
        }
        return '';
    }

    let realContentType = contentType || 'application/json';
    return (
        <div>
            <div>
                <DropDownByClick name="method" value={method} options={['GET','POST', 'PUT', 'PATCH', 'DELETE']}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="method"} />
            </div>
            <div>
            <InputTextByClick name="url" value={url}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="url"} />
            </div>
            <div>
                <DropDownByClick name="type" value={type} options={['sync','async']}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="type"} />
            </div>
            <div>
                <DropDownByClick name="authtype" value={authtype} options={['JWT','FREE']}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="authtype"} />
            </div>
            {authTypeSpecific(authtype)}
            <div>
                <small>Set the content type for response:</small>
            <InputTextByClick name="contentType" value={realContentType}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="contentType"} />
            </div>
            <div>
                <small>Set the request content type (only for POST or PUT):</small>
            <DropDownByClick name="requestContentType" value={requestContentType} options={['application/json','multipart/form-data']}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="requestContentType"} />
            </div>
            <div>
            <small>Cache response for (0 = never, x = x min - only for GET):</small>
            <InputTextByClick name="cache" value={cache}
                save={save} enquireEdit={enquireEdit} editMode={editProp==="cache"} />
            </div>
            <div>
            <strong>debug: </strong>
            <input type="checkbox" checked={debug==true} onClick={()=>save('debug',!debug)}/>
            </div>

        </div>
    );
}
