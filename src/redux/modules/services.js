import { ofType } from 'redux-observable';
import { concat,  pipe, merge, of as ObservableOf, throwError } from 'rxjs';
import { mapTo, delay, mergeMap, map, switchMap, catchError } from 'rxjs/operators';
//import { ajax } from 'rxjs/ajax';

import { push } from 'connected-react-router';

import { applyTransition } from './definitionTransform';

let initialState = {servicelist: [], servicedefinitions: {} }

export const services = ( state = initialState, action) => {

    switch (action.type) {
        case 'SERVICE.LIST':
          console.log('action', action)
          return {...state, servicelist: action.payload, lastUpdate: new Date()};
        case 'SERVICE.UPDATE.STATUS':
        {
            let idx = state.servicelist.findIndex(s=>s.name===action.id);
            if ( idx === -1 ) {
                console.log(`not found ${action.id} in`, state)
                return state;
            }
            const servicelist = state.servicelist.slice();
            servicelist[idx].lastStart = action.lastStart;
            return {...state, servicelist}
        }
        case 'SERVICE.UNSETNEW':
        {
            let service = state.servicedefinitions[action.name];
            if(service) {
                let servicedefinitions = {...state.servicedefinitions};
                const namedService = {...service}
                delete namedService.isNew;
                servicedefinitions[action.name] = namedService;
                return {...state, servicedefinitions};
            }
            return state;
        }
        case 'SERVICE.SETNAME':
        {
            let service = state.servicedefinitions[action.oldname];
            let renamedService = state.servicedefinitions[action.name];
            if (service && !renamedService) {
                let servicedefinitions = {...state.servicedefinitions};
                delete servicedefinitions[action.oldname];
                const namedService = {...service, name: action.name}
                namedService.definition.name = action.name;
                servicedefinitions[action.name] = namedService;
                return {...state, servicedefinitions};
            }
            return state;
        }
        case 'SERVICE.CHANGEPROP':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'serviceEdit', action)} };
        }
        case 'SERVICE.DETAIL':
        {
            let newDef = {...state.servicedefinitions, [action.payload.name]: {...action.payload, changes:[] } }
            return {...state, servicedefinitions:newDef};
        }
        case 'SERVICE.DELENTRYPOINT':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'delEntry', action)} };
        }
        case 'SERVICE.ADDENTRYPOINT':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'addEntry', action) }}
        }
        case 'SERVICE.ENTRY.CHANGEPROP':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'entryEdit', action) }};
        }
        case 'SERVICE.ENTRY.PIPE.RMSTEP':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'entryPipeRmstep', action) }};
        }
        case 'SERVICE.ENTRY.PIPE.ADDSTEP':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'entryPipeAddstep', action) } }
        }
        case 'SERVICE.ENTRY.PIPE.EDIT':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'entryPipeEdit', action) }}
        }
        case 'SERVICE.ENTRY.PIPE.SORT':
        {
            const sd = {...state.servicedefinitions};
            return {...state, servicedefinitions:{...sd, [action.id]:applyTransition(sd[action.id],'entryPipeSort', action) }}
        }
        default:
          return state;
    }
}

const newService = (name) => {
    return {name:name, isNew:true, definition: {image: undefined, volumes: [{
        "Destination": "/common/etc/dbconn",
        "Source": "/storage/saas/docker_swarm/common/etc/dbconn"
    },
    {
        "Destination": "/var/run/docker.sock",
        "Source": "/var/run/docker.sock"
    }], resources: [], entry_points: []}, changes:[]};
}

export const newServiceEpic = (action$, state$) => action$.pipe(
    ofType('SERVICE.NEW'),
    switchMap(action=> {
        let newName = 'newService'
        let serv = newService(newName);
        return merge(
            ObservableOf({type: 'SERVICE.DETAIL', id: action.id, payload: {...serv}}),
            ObservableOf(push(process.env.PUBLIC_URL.replace(/\/+$/,'/')+`editapi/${newName}`))
        );
    })
)

export const loadServiceEpic = (action$, state$, { ajax, getViaAjax }) => action$.pipe(
  ofType('SERVICES.LOAD'),
  mergeMap(()=> getViaAjax(state$.value.loginStatus.token, "/list-services")),
  map(result=> {
      if(result.status !== 200) {
          return {type: 'NETWORK.ERROR', status: result.status}
      }
      const {data, error} = result.response;
      if(error) {
          return {type: 'RESTAPI.ERROR', error}
      } else {
          return {type: 'SERVICE.LIST', payload: data.services};
      }
  })
);

export const changeNameEpic = (action$, state$) => action$.pipe(
    ofType('SERVICE.SETNAME'),
    mergeMap((action) => {
        //const serviceDef = state$.value.service.definition;
        return ObservableOf(push(process.env.PUBLIC_URL+'editapi/'+action.name));
    })
)


export const loadServDetailEpic = (action$, state$, { getViaAjax, ajax } ) => action$.pipe(
    ofType('SERVICEDETAIL.LOAD'),
    switchMap(
        (action) => {
            let servicename = action.payload;
            let itExists = state$.value.services.servicelist.find(s=>s.name===servicename);
            if(itExists) {
                let service = state$.value.services.servicedefinitions[servicename];
                if( ! service) {
                    return getViaAjax(state$.value.loginStatus.token, `/service/${action.payload}`).pipe(
                        mergeMap( ({response}) => {
                            if(response.error) return throwError({ type: 'APIERROR', error: response.error});
                            if(response.data) return ObservableOf({type: 'SERVICE.DETAIL', id: action.payload, payload: {...response.data, name:action.payload}});
                            return throwError({ type: 'APIERROR', error: JSON.stringify(response,null,'\t')});
                        }),
                        catchError(error=> {
                            console.log('erro getting', error);
                            return merge(
                                ObservableOf({type:'APIERROR',error:error}),
                                ObservableOf(push(process.env.PUBLIC_URL+'/'))
                            )
                        })
                    );
                } else {
                    return ObservableOf({ type: 'NOOP' });
                }
            } else {
                console.log('DO NOT EXIST??');

                return concat(
                    ObservableOf({type:'SERVICES.LOAD'}),
                    ObservableOf({type:'SERVICEDETAIL.LOAD', payload:action.payload}).pipe(delay(1000))
                )

            }
            console.log('new url ', process.env.PUBLIC_URL);
            const homeUrl = (process.env.PUBLIC_URL + '/').replace(/\/+/,'/');
            return ObservableOf(push(homeUrl))
        }
    )

  );


export const serviceSaveEpic = (action$, state$, { ajax, putViaAjax } ) => action$.pipe(
    ofType('SERVICE.SAVE'),
    switchMap((action) => {
        let service = state$.value.services.servicedefinitions[action.id];
        service = {...service, name:action.id};
        return putViaAjax(state$.value.loginStatus.token, `/service/${action.id}`, JSON.stringify(service)).pipe(
            switchMap( ({response}) => {
                console.log('response',response);
                if(response.error) return ObservableOf({type:'APIERROR', error: response.error});
                if(service.isNew) {
                    return merge(
                        ObservableOf({type: 'SERVICE.UNSETNEW', name: action.id}),
                        ObservableOf({type: 'SERVICES.LOAD'})
                    );
                } else {
                    return ObservableOf({type: 'SERVICES.LOAD'});
                }
            }),
            catchError(error=> {
                console.log('erro getting', error);
                return merge(
                    ObservableOf({type:'APIERROR',error:error})
                )
            })
        )
    })
)

export const serviceToggleEpic = (action$, state$, {patchViaAjax, ajax} ) => action$.pipe(
    ofType('SERVICE.TOGGLE'),
    switchMap((action) => {
        let service = state$.value.services.servicelist.find(s=>s.name===action.id);
        let body = { type:'SET.RUNNING', running: service.lastStart===false };
        return patchViaAjax(state$.value.loginStatus.token, `/service/${service.name}`, JSON.stringify(body));
    }),
    map( ({response}) => {
        console.log('response',response);
        if(!response || response.error) return {type:'APIERROR', error: response?response.error:"<no response>" };
        const service = response.data;
        return {type: 'SERVICE.UPDATE.STATUS', id: service.id, lastStart: service.lastStart};
    })
)
