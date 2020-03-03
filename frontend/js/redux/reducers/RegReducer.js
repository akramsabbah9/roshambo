import { userConstants } from '../actions/types';

const initialState = {
    registering: false,
    success: false,
    error: null
}

export function reg(state=initialState, action) {
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            return { 
                ...state,
                registering: true, 
                error: null,
            }
        case userConstants.REGISTER_SUCCESS:
            return { 
                ...state,
                registering: false,
                success: true,
                error: null,
            }
        case userConstants.REGISTER_FAILURE:
            return { 
                ...state,
                error: action.error 
            }

        default:
            return state
    }
}