
import { ofType } from 'redux-observable';
import { merge, of as ObservableOf } from 'rxjs';
import { mapTo, mergeMap, map} from 'rxjs/operators';

import { push } from 'connected-react-router'

const apiman_authurl = process.env.API_AUTH

const getCookieByName = (name) => {
  let namedCookie = document.cookie.split(';').find((coo)=> coo.split('=')[0].trim()===name)
  if(namedCookie) return namedCookie.split('=')[1];
  return undefined;
}

const getInitialState = () => {
    let token = getCookieByName('admin_token');
    if(token) {
        return {
            token,
            logged: true
        }
    }
    else return { logged: false}
}

const initialState = getInitialState();

function resetCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const loginStatus = ( state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN.GRANTED':
          console.log('action', action)
          return {...state, token: action.token, logged: true };
        case 'LOGIN.ERROR':
          //return {...state};
          return {...state, error: action.error, logged: false};
        case 'LOGOUT':
          resetCookie('admin_token');
          console.log('now cookie', document.cookie);
          return {logged:false };
        default:
          //return {...state, logged: true};
          return state;
    }
}

const getDayDate = (days) => {
    let dd = new Date();
    dd.setDate(dd.getDate() + days);
    return dd.toGMTString();
}
const setCookie = (name,value,days=1) => document.cookie = `${name}=${value}; expires=${getDayDate(days)}`;

export const loginEpic = (action$, state$, {ajax} ) => action$.pipe(
  ofType('LOGIN'),
  mergeMap( action =>
     ajax({
         url: apiman_authurl,
         crossDomain: true,
         method: 'POST',
         body: JSON.stringify({credentials: action.payload}),
         headers: {
             'Content-Type': 'application/json',
         },
         responseType: 'json'})
  ),
  map( (result) => {
      if (typeof result.response.data !== 'undefined' &&
      typeof result.response.data.token !== 'undefined') {
          let token = result.response.data.token
          setCookie('admin_token', token);
          return { type: 'LOGIN.GRANTED', token };
      } else if (result.response.error!==null) {
          return { type: 'LOGIN.ERROR', error: result.response.error };
      }
  })
  //mapTo(history.push('/'))
);

export const loginOkEpic = action$ => action$.pipe(
  ofType('LOGIN.GRANTED'),
  mergeMap(
      (action) => merge(
          ObservableOf(push(process.env.PUBLIC_URL)),
          ObservableOf({type:'SERVICES.LOAD'}),
          ObservableOf({type:'RESOURCES.LOAD'})
      )
  )
);

export const loginKOEpic = action$ => action$.pipe(
  ofType('LOGIN.ERROR'),
  mapTo(push(process.env.PUBLIC_URL+'auth/login'))
);
