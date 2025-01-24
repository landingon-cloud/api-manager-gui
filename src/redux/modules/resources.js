import { ofType } from 'redux-observable';
import { pipe, merge, of as ObservableOf, throwError } from 'rxjs';
import { mapTo, mergeMap, map, switchMap, catchError } from 'rxjs/operators';


const apiman_servicebase = process.env.API_BASE

export function resources(state={},action ) {
    switch (action.type) {
        case 'RESOURCES.LIST':
        {
            return action.payload;
        }
        default:
        return state;
    }
}


export const loadResourceEpic = ( action$, state$, {ajax}) => action$.pipe(
    ofType('RESOURCES.LOAD'),
    switchMap((action) => {
        let ajaxOpt = {}
        let token = state$.value.loginStatus.token
        ajaxOpt = {
            url: `${apiman_servicebase}api/list-resources`,
            headers: {
                'Authorization': 'Bearer '+ token
            },
            crossDomain: true,
            method: 'GET',
            responseType: 'json'
        }
        return ajax(ajaxOpt).pipe(
            map( ({response}) => {
                console.log('response',response);
                if(response.error) return {type:'APIERROR', error: response.error};
                return {type: 'RESOURCES.LIST', payload: response};
            })
        ).pipe(
            catchError(error=> {
                console.log('erro getting', error);
                return merge(
                    ObservableOf({type:'APIERROR',error:error})
                )
            })
        )
    })
)
