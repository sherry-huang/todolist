import { handleActions, createAction } from 'redux-actions';

const createRequestType = baseType => ({
	REQUEST: `TODOLIST/API/${baseType}_REQUEST`,
	SUCCESS: `TODOLIST/API/${baseType}_SUCCESS`,
	FAILURE: `TODOLIST/API/${baseType}_FAILURE`,
});

export const types = {
    RESET_TODOLIST: 'RESET_TODOLIST',
    GET_TODOLIST: createRequestType('GET_TODOLIST'),
    POST_TODOITEM: createRequestType('POST_TODOITEM'),
    PUT_TODOITEM: createRequestType('PUT_TODOITEM'),
    DELETE_TODOITEM: createRequestType('DELETE_TODOITEM'),
}

export const actions = {
    resetTodoList: createAction(types.RESET_TODOLIST),
    getTodoList: createAction(types.GET_TODOLIST.REQUEST),
    postTodoItem: createAction(types.POST_TODOITEM.REQUEST),
    putTodoItem: createAction(types.PUT_TODOITEM.REQUEST),
    deleteTodoItem: createAction(types.DELETE_TODOITEM.REQUEST),
}

const initialState = {
    todoList: [],
}

export default handleActions(
    {
        [types.RESET_TODOLIST]: (state) => ({ ...state, ...initialState }),

        [types.GET_TODOLIST.REQUEST]: (state) => ({ ...state}),
        [types.GET_TODOLIST.SUCCESS]: (state, action) => ({
            ...state,
            todoList: action.payload.data
        }),
        [types.GET_TODOLIST.FAILURE]: (state) => ({
            ...state,
            todoList: []
        }),

        [types.POST_TODOITEM.REQUEST]: (state) => ({ ...state }),
        [types.POST_TODOITEM.SUCCESS]: (state) => ({ ...state }),
        [types.POST_TODOITEM.FAILURE]: (state) => ({ ...state }),

        [types.PUT_TODOITEM.REQUEST]: (state) => ({ ...state }),
        [types.PUT_TODOITEM.SUCCESS]: (state) => ({ ...state }),
        [types.PUT_TODOITEM.FAILURE]: (state) => ({ ...state }),

        [types.DELETE_TODOITEM.REQUEST]: (state) => ({ ...state }),
        [types.DELETE_TODOITEM.SUCCESS]: (state) => ({ ...state }),
        [types.DELETE_TODOITEM.FAILURE]: (state) => ({ ...state }),
    },
    initialState
);

export const selectors = {
    makeGetTodoList: state => state.todoReducers.todoList,
};