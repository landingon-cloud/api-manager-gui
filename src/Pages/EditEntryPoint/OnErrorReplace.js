import React, { Component } from 'react';
import DropDownByClick from '../../components/DropDownByClick';
import InputTextareaByClick from '../../components/InputTextareaByClick';

const OnErrorRepl = ({onErrorReplacement, enquireEdit, editMode, save, stepIdx, onError}) => {
    /*
    let replacement = (
        <InputTextareaByClick name="onErrorReplacement" value={onErrorReplacement}
                save={saveErrorReplacement} enquireEdit={enquireEditErrorReplacement}
                editMode={editModeErrorReplacement}  validation={validateJson}/>
    )
    */
    return (
        <div>
            <small>onError: 'jump' to the end (default), 'jump_report' to the end (returning error to the caller), 'ignore' the error and replace void ([]) for  step{stepIdx} result</small>
            <DropDownByClick name="onError" value={onError || 'jump'} options={['jump', 'ignore', 'jump_report']}
                save={save} enquireEdit={enquireEdit} editMode={editMode} />
        </div>
    );
}

export default OnErrorRepl;
