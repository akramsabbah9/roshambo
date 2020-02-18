import { userConstants } from '../actions/types';

const initialState = {
    loading: false,
    users: [],
    error: null
}

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                
                users: action.users
            }
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}