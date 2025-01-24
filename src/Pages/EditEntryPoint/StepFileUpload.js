import React, { Component, useState } from 'react'

import { Container, Collapse, Button} from 'reactstrap';

import DropDownByClick from '../../components/DropDownByClick';
import InputTextByClick from '../../components/InputTextByClick';

const legend = 'limits: {\n \
fieldNameSize: 100, // Max field name size in bytes\n \
fieldSize: 1000000, // Max field value size in bytes\n \
fields: 10,         // Max number of non-file fields\n \
fileSize: 100,      // For multipart forms, the max file size\n \
files: 1,           // Max number of file fields\n \
headerPairs: 2000   // Max number of header key=>value pairs\n \
}'
export default ({enquireEdit,step,editProp,save}) => {
    const [collapse,setCollapse] = useState(true);
    const toggle = () => setCollapse(!collapse);
    return (
        <Container>
        <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
    <Collapse isOpen={!collapse}>
            <small>Save file limits definition. Place this step once, it is excluded but counted. It is only meant to define the limits for file upload options. Also, it must be selected multipart/form-data as requestContentType</small>
            <pre>{legend}</pre>
            <InputTextByClick name="fieldNameSize" value={step.fieldNameSize||100} save={save('fieldNameSize')} enquireEdit={enquireEdit} editMode={editProp==="fieldNameSize"} />

            <InputTextByClick name="fieldSize" value={step.fieldSize|| 1000000}
            save={save('fieldSize')} enquireEdit={enquireEdit} editMode={editProp==="fieldSize"} />

            <InputTextByClick name="fields" value={step.fields || 10}
            save={save('fields')} enquireEdit={enquireEdit} editMode={editProp==="fields"} />

            <InputTextByClick name="fileSize" value={step.fileSize || 100}
            save={save('fileSize')} enquireEdit={enquireEdit} editMode={editProp==="fileSize"} />

            <InputTextByClick name="files" value={step.files || 1}
            save={save('files')} enquireEdit={enquireEdit} editMode={editProp==="files"} />

            <InputTextByClick name="headerPairs" value={step.headerPairs || 2000}
            save={save('headerPairs')} enquireEdit={enquireEdit} editMode={editProp==="headerPairs"} />

            </Collapse>
        </Container>
    );
}
