import { combineReducers } from 'redux';
import { auth } from './AuthReducer';
import { registration } from './RegReducer';
import { users, user } from './UserReducer';
import { skins } from './SkinsReducer';

const rootReducer = combineReducers({
    auth,
    registration,
    users,
    user,
    skins,
})

export default rootReducer;