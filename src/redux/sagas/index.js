import { all, fork } from 'redux-saga/effects';
import todoSagas from './todoSagas';

export function* rootSaga() {
    yield all([
        fork(todoSagas),
    ])
}

export default rootSaga;
