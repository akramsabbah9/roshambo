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
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
            }
        case userConstants.LOGIN_FAILURE:
            console.log(action.error.message);
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                error: action.error
            }
        case userConstants.LOGOUT: 
            return {}
            
        default:
            return state
    }
}


