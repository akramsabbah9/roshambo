import { combineReducers } from 'redux';
import { auth } from './AuthReducer';
import { reg } from './RegReducer';
import { users, user } from './UserReducer';
import { skins } from './SkinsReducer';

const rootReducer = combineReducers({
    auth,
    reg,
    users,
    user,
    skins,
})

export default rootReducer;