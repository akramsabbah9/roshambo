import { combineReducers } from 'redux';
import { auth } from './AuthReducer';
import { registration } from './RegReducer';
import { users } from './UserReducer';
import { skins } from './SkinsReducer';

const rootReducer = combineReducers({
    auth,
    registration,
    users,
    skins,
})

export default rootReducer;