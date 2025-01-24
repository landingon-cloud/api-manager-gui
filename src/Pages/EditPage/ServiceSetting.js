import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeactions from './actions/loads.js'

import DropDownByClick from '../../components/DropDownByClick';
import InputTextByClick from '../../components/InputTextByClick';


class ServiceSetting extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            editProp: undefined
        };
        this.onEscape = this.onEscape.bind(this);
        if(!props.resources.service_images) {
            props.resourceLoad();
        }
    }

    onEscape({ keyCode }) {
        if (keyCode === 27) {
            this.setState(()=>{return {editProp:undefined}});
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onEscape);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscape);
    }

    render() {
        if(!this.props.resources.service_images) {
            return (<div>Loading ...</div>);
        }
        const id = this.props.name;
        const detail = this.props.detail;
        const save = (prop) => (fake, value) => {
            //console.log('save called', prop, value);
            this.props.serviceEdit(id, prop, value);
            this.setState(()=>{return {editProp:undefined}})
        }
        const enquireEdit = (prop) => () => {
            this.setState(()=>{return {editProp:prop}})
        }
        const imglist = Object.keys(this.props.resources.service_images);
        return (
            <div>
        <div>
        <small>Select the base image</small>
        <DropDownByClick name="Docker Image" value={detail.definition.image} options={imglist}
    save={save('image')} enquireEdit={enquireEdit('image')} editMode={this.state.editProp==="image"} />
        </div>
        <div>
        <DropDownByClick name="Replicas" value={detail.definition.replicas} options={['1','2','3','4','5','12']}
    save={save('replicas')} enquireEdit={enquireEdit('replicas')} editMode={this.state.editProp==="replicas"} />
        </div>
        <div>
        <small>It is a number from 0 to 1</small>
        <InputTextByClick name="cpus_limit" value={detail.definition.cpus_limit}
                        save={save('cpus_limit')} enquireEdit={enquireEdit('cpus_limit')} editMode={this.state.editProp==="cpus_limit"}/>
        </div>
        <div>
        <small>120M == 120 MBytes of memory limit</small>
        <InputTextByClick name="memory_limit" value={detail.definition.memory_limit}
                        save={save('memory_limit')} enquireEdit={enquireEdit('memory_limit')} editMode={this.state.editProp==="memory_limit"}/>
        </div>
        </div>);
    }
}


const mapStateToProps = (state, ownProps) =>{
    return {
        ...ownProps,
        //servicelist: [{name:'idealo'},{name:'rakuten µApi'},{name:'ArtikelVervaltung µApi'}]
        //services: state.services.servicedefinitions,
        resources: state.resources
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(homeactions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSetting);
