// To finish. Use: https://sinonjs.org/releases/v4.3.0/fake-xhr-and-server/
/*

server = sinon.createFakeServer();
server.respondWith("GET", "/some/article/comments.json",
            [200, { "Content-Type": "application/json" },
             '[{ "id": 12, "comment": "Hey there" }]']);
this.server.respond();
server.restore();
*/

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { spy } from 'sinon';

import { pipe, merge, of as ObservableOf, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';


import { ActionsObservable } from 'redux-observable';

import { loginEpic, loginOkEpic, loginKOEpic } from './loginStatus';

configure({ adapter: new Adapter() });

const action$ = ActionsObservable.of(
    {type: 'LOGIN', payload: {url: '/api/endpoint/9999/'}}
);

describe('loginEpic Epic', () => {
    it('dispatches the correct actions when it is successful', (done) => {
        const ajax = () => ObservableOf({response:{token:"astring"}});
        const expectedOutputActions = {type: "LOGIN.GRANTED", token:"astring"};
        //done();
        loginEpic(action$, null, {ajax})
            .subscribe(actualOutputActions => {
                expect(actualOutputActions).toEqual(expectedOutputActions)

                //assert.deepEqual(actualOutputActions, expectedOutputActions);
                done();
            }
        );
    });
})
