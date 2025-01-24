
import { push } from 'connected-react-router'

import { of as ObservableOf } from 'rxjs';
import { toArray} from 'rxjs/operators';


import { ActionsObservable } from 'redux-observable';

import { loginEpic, loginOkEpic, loginKOEpic } from './loginStatus';


const action$ = ActionsObservable.of(
    {type: 'LOGIN', payload: {login:"user", password:"pass"}}
);

const actionGrant$ = ActionsObservable.of(
    {type: 'LOGIN.GRANTED', token: "tokenString"}
);

describe('loginEpic Epic', () => {
    it('dispatches the correct actions when it is successful', (done) => {
        const ajax = (par) => {
            let obj = JSON.parse(par.body);
            expect(obj.credentials.login).toEqual("user");
            return ObservableOf({response:{token:"astring"}});
        };
        const expectedOutputActions = {type: "LOGIN.GRANTED", token:"astring"};

        loginEpic(action$, null, {ajax})
            .subscribe(actualOutputActions => {
                expect(actualOutputActions).toEqual(expectedOutputActions)
                done();
            }
        );
    });

    it('dispatches the correct actions when there is an error', (done) => {
        const errorMsg = 'wrong credentials'
        const ajax = () => ObservableOf({response:{error: errorMsg}});
        const expectedOutputActions = {type: "LOGIN.ERROR", error:errorMsg}

        loginEpic(action$, null, {ajax})
            .subscribe(actualOutputActions => {
                expect(actualOutputActions).toEqual(expectedOutputActions)
                done();
            }
        );
    });

    it('dispatch actions on login granted', (done) => {
        const redirRoot = push(process.env.PUBLIC_URL+'/')
        loginOkEpic(actionGrant$, null)
        .pipe(toArray())
        .subscribe( actualActions => {
            console.log(actualActions);
            expect(actualActions[0].type).toEqual(redirRoot.type)
            expect(actualActions[0].payload).toEqual(redirRoot.payload)
            expect(actualActions[1].type).toEqual('SERVICES.LOAD')
            //expect(false).toEqual(true)
            done();
        })
    });
})
