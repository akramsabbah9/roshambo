import { userConstants } from '../actions/types';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    error: null
}

export function auth(state=initialState, action) {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                error: null
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                error: null
            }
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                error: action.error
            }
        case userConstants.LOGOUT: 
            return {
                ...state,
                loggedIn: false,
            }
            
        default:
            return state
    }
}


