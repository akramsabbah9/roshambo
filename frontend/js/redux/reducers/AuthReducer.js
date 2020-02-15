import { userConstants } from '../actions/types';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    user: {}
}

export function auth(state=initialState, action) {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_FAILURE:
            return {}
        case userConstants.LOGOUT: 
            return {}
        default:
            return state
    }
}


