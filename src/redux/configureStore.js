import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import createSagaMiddleware from 'redux-saga';

// export const createHistory = require("history").createBrowserHistory;
// export const history = createHistory({ basename: '/portal/meter' });

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [
        sagaMiddleware
    ];

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return {
        ...createStore(
            rootReducers,
            composeEnhancer(applyMiddleware(...middleware)),
        ),
        runSaga: sagaMiddleware.run,
    }
}
