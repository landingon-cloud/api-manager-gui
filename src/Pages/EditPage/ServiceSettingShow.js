import React from 'react'

const ServiceSettingShow = ({detail, edit, ...props}) => {
    if(!detail) {
        return null;
    }
    return (
        <div title="click to change" onClick={edit}>
            <div>
                <span><small>Base image:</small><strong>{detail.definition.image || 'undefined'}</strong>,{' '}</span>
                <span><small>replicas:</small><strong>{detail.definition.replicas || 'undefined'}</strong>,{' '}</span>
                <span><small>cpus_limit:</small><strong>{detail.definition.cpus_limit || 'undefined'}</strong>,{' '}</span>
                <span><small>memory_limit:</small><strong>{detail.definition.memory_limit || 'undefined'}</strong></span>
            </div>
        </div>
    )
}

export default ServiceSettingShow
