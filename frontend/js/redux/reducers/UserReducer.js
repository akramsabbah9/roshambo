import { userConstants } from '../actions/types';
import { activeUsers } from '../../utils/api';

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
                ...state,
                usersLoading: true
            }
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                users: action.users,
                usersLoading: false
            }
        case userConstants.GETALL_FAILURE:
            return {
                ...state,
                userLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function user(state = userInitialState, action) {
    switch(action.type) {
        // Get Current User
        case userConstants.GETCURRENT_REQUEST:
            return {
                ...state,
                userLoading: true
            }
        case userConstants.GETCURRENT_SUCCESS:
            return {
                ...state,
                currentUser: action.user,
                userLoading: false,
            }
        case userConstants.GETCURRENT_FAILURE:
            return {
                ...state,
                error: action.error,
                userLoading: false,
            }

        // Change Email 
        case userConstants.CHANGE_EMAIL_REQUEST:
            return {
                ...state,
            }
        case userConstants.CHANGE_EMAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.user,
            }
        case userConstants.CHANGE_EMAIL_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        // Change Password
        case userConstants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
            }
        case userConstants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
            }
        case userConstants.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        // Change Guild
        case userConstants.CHANGE_GUILD_REQUEST:
            return {
                ...state,
            }
        case userConstants.CHANGE_GUILD_SUCCESS:
            return {
                ...state,
            }
        case userConstants.CHANGE_GUILD_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        //Update Stats
        case userConstants.CHANGE_STATS_REQUEST:
            return {
                ...state,
            }
        case userConstants.CHANGE_STATS_SUCCESS:
            return {
                ...state,
            }
        case userConstants.CHANGE_GUILD_FAILURE:
            return {
                ...state,
                error: action.error,
            }
    
        default:
            return state
    }
}