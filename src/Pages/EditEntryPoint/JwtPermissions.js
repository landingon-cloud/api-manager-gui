import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import CheckBoxesByClick from '../../components/CheckBoxesByClick';

export const JwtPermissions = ({selected, editMode, enquireEdit, save}) => {
    const perms = useSelector(s=>s.resources.permissions)
    if (!perms) {
        return (
            <div>error loading services:</div>
        )
    }
    return (
        <div>
    <CheckBoxesByClick name="jwt_perms" groupName="JWT Permissions" availableOptions={perms}
    selectedOptions={selected} enquireEdit={enquireEdit} save={save} editMode={editMode} />
    </div>)
}
