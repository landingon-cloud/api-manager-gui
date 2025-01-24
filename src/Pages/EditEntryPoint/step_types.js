import React from 'react';

import StepFileUpload from './StepFileUpload'

import StepZMQCall from './StepZMQCall'
import StepZquery from './StepZquery'
import StepHquery from './StepHquery'
import StepHqueryCompact from './StepHqueryCompact'
import StepHqueryStandard from './StepHqueryStandard'
import StepZShell from './StepZShell'
import StepHttpCall from './StepHttpCall'
import StepAlasql from './StepAlasql';

export const step_types = [
    {name:"HttpCall", value: "httpcall", component: StepHttpCall},
    {name:"Hquery", value: "hquery", component: StepHquery},
    {name:"HqueryCompact", value: "hquery_compact", component: StepHqueryCompact},
    {name:"HqueryStandard", value: "hquery-standard", component: StepHqueryStandard},
    {name:"Zshell", value: "zshell", component: StepZShell},
    {name:"AlaSQL", value:'alasql', component: StepAlasql},
    {name:"ZMQ Service Call", value:'zmq_service_call', component: StepZMQCall},
    {name:"File Upload Limits", value:'save_files', component: StepFileUpload}
];
