import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import DropDownByClick from '../../components/DropDownByClick';

export const ServiceFilterFormat = ({format, step, editMode, enquireEdit, save}) => {
    const services = useSelector(s=>s.resources.services)
    if (!services || services.error) {
        return (
            <div>error loading services: <strong>{services?services.error:''}</strong></div>
        )
    } else {
        const doFilter = format?s=>s.format===format:()=>true;
        const options = services.filter(doFilter).map(s=>{return {name: s.name + ' (' + s.ztype + ')', value: s.address}}).sort((s1,s2)=>s1.name>s2.name?1:-1)
        return (
            <DropDownByClick name="service" value={step.service} options={options}
                    save={save} enquireEdit={enquireEdit} editMode={editMode} />
        )
    }
}
