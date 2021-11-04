import { take, call, put, fork } from 'redux-saga/effects'; // all
import { createAction } from 'redux-actions';
// import { push } from 'react-router-redux';
import * as todo from '../api/todoApi';
import { types } from '../reducers/todoReducers';

// 取得 TodoList
export function* watchGetTodoList() {
    while (true) {
        try {
            const { payload } = yield take(types.GET_TODOLIST.REQUEST);
            const response = yield call(todo.getTodoListApi, payload);
            yield put(createAction(types.GET_TODOLIST.SUCCESS)(response));
        } catch (error) {
            const msg = { type: 'error', message: "error" };
            yield put(createAction(types.GET_TODOLIST.FAILURE)(msg));
        }
    }
}

// 新增資料
export function* watchPostTodoItem() {
    while (true) {
        try {
            const { payload } = yield take(types.POST_TODOITEM.REQUEST);
            const response = yield call(todo.postTodoItemApi, payload);
            yield put(createAction(types.POST_TODOITEM.SUCCESS)(response.data));
            yield put(createAction(types.GET_TODOLIST.REQUEST)());
        } catch (error) {
            const msg = { type: 'error', message: "error" };
            yield put(createAction(types.POST_TODOITEM.FAILURE)(msg));
        }
    }
}

// 更新某筆資料
export function* watchPutTodoItem() {
    while (true) {
        try {
            const { payload } = yield take(types.PUT_TODOITEM.REQUEST);
            const response = yield call(todo.putTodoItemApi, payload);
            yield put(createAction(types.PUT_TODOITEM.SUCCESS)(response.data));
            yield put(createAction(types.GET_TODOLIST.REQUEST)());
        } catch (error) {
            const msg = { type: 'error', message: "error" };
            yield put(createAction(types.PUT_TODOITEM.FAILURE)(msg));
        }
    }
}

// 刪除某筆資料
export function* watchDeleteTodoItem() {
    while (true) {
        try {
            const { payload } = yield take(types.DELETE_TODOITEM.REQUEST);
            const response = yield call(todo.deleteTodoItemApi, payload);
            yield put(createAction(types.DELETE_TODOITEM.SUCCESS)(response.data));
            yield put(createAction(types.GET_TODOLIST.REQUEST)());
        } catch (error) {
            const msg = { type: 'error', message: "error" };
            yield put(createAction(types.DELETE_TODOITEM.FAILURE)(msg));
        }
    }
}

export default function* todoSagas() {
    yield fork(watchGetTodoList);
    yield fork(watchPostTodoItem);
    yield fork(watchPutTodoItem);
    yield fork(watchDeleteTodoItem);
}
