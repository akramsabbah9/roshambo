import { combineReducers } from 'redux';
import { auth } from './AuthReducer';
import { registration } from './RegReducer';
import { users } from './UserReducer';

const rootReducer = combineReducers({
    auth,
    registration,
    users,
})

export default rootReducer;