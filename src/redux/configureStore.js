import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router'
//import { rootEpic, rootReducer } from './modules/root';
import { rootEpic, rootReducer } from './mainReducer';
import { createBrowserHistory } from 'history';

import { createLogger } from 'redux-logger';

export const history = createBrowserHistory()

const epicMiddleware = createEpicMiddleware();

const logger = createLogger();

const getCookieByName = (name) => {
  let namedCookie = document.cookie.split(';').find((coo)=> coo.split('=')[0].trim()===name)
  if(namedCookie) return namedCookie.split('=')[1];
  return undefined;
}

const getInitialState = () => {
    let token = getCookieByName('admin_token');
    if(token) {
        return {
            loginStatus: {
                token,
                logged: true
            }
        }
    }
    else return {}
}
const initialState = getInitialState();

function configureStore() {
  const store = createStore(
    rootReducer(history),
    initialState,
        applyMiddleware(
            epicMiddleware,
            logger,
            routerMiddleware(history)
        )

  );

  epicMiddleware.run(rootEpic);

  return store;
}

export const store = configureStore();
