import { userConstants } from '../actions/types';

const initialState = {
    registering: false,
    success: false,
    error: null
}

export function registration(state=initialState, action) {
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true }
        case userConstants.REGISTER_SUCCESS:
            return { success: true }
        case userConstants.REGISTER_FAILURE:
            return { error: action.error }
        default:
            return state
    }
}