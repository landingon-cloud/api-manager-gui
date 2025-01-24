import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { loginStatus, loginEpic, loginOkEpic, loginKOEpic } from './modules/loginStatus';
import { services, loadServiceEpic, changeNameEpic, loadServDetailEpic, serviceSaveEpic, serviceToggleEpic, newServiceEpic } from './modules/services';
import { resources, loadResourceEpic } from './modules/resources';
import { apierror } from './modules/apierror';

import { ajax } from 'rxjs/ajax';

const apiman_servicebase = process.env.API_BASE;

const getViaAjax = (token, call) => ajax({
    url: apiman_servicebase + 'api' + call,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },
    withCredentials: false,
    crossDomain: true,
    responseType: 'json'
})


const jsonBodyViaAjax = (token, call, body, method) => ajax({
    url: apiman_servicebase + 'api' + call,
    method,
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
    },
    body,
    withCredentials: false,
    crossDomain: true,
    responseType: 'json'
})

const patchViaAjax = (token, call, body) => jsonBodyViaAjax(token, call, body, 'PATCH');
const postViaAjax = (token, call, body) => jsonBodyViaAjax(token, call, body, 'POST');
const putViaAjax = (token, call, body) => jsonBodyViaAjax(token, call, body, 'PUT');

export const rootEpic = (...args) => combineEpics(
  loginEpic,
  loginOkEpic,
  loginKOEpic,
  loadServiceEpic,
  loadResourceEpic,
  loadServDetailEpic,
  newServiceEpic,
  changeNameEpic,
  serviceSaveEpic,
  serviceToggleEpic
)(...args, { ajax, getViaAjax, patchViaAjax, postViaAjax, putViaAjax });

export const rootReducer = (history) => (...args) => combineReducers({
    router: connectRouter(history),
  services: services,
  resources: resources,
  loginStatus: loginStatus,
  apierror: apierror
})(...args, { ajax });
