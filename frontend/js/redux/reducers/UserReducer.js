import { userConstants } from '../actions/types';

const usersInitialState = {
    usersLoading: true,
    users: [],
    error: null
}

const userInitialState = {
    userLoading: true,
    currentUser: {},
    error: null
}

export function users(state = usersInitialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                usersLoading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                users: action.users,
                usersLoading: false
            }
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}

export function user(state = userInitialState, action) {
    switch(action.type) {
        case userConstants.GETCURRENT_REQUEST:
            return {
                userLoading: true
            }
        case userConstants.GETCURRENT_SUCCESS:
            return {
                user: action.user,
                error: null,
                userLoading: false,
            }
        case userConstants.GETCURRENT_FAILURE:
            return {
                error: action.error,
                userLoading: false,
            }
        default:
            return state
    }
}