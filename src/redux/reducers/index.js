import { combineReducers } from 'redux';

// common
import todoReducers from './todoReducers';

const rootReducers = combineReducers({
    todoReducers,
})

export default rootReducers;
