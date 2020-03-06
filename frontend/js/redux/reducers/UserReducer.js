import { userConstants, walletConstants } from '../actions/types';

const usersInitialState = {
    usersLoading: true,
    users: [],
    error: null
}

const userInitialState = {
    userLoading: true,
    walletLoading: false,
    currentUser: {
        cash: 0,
    },
    error: null,
    walletError: null,
}

export function users(state = usersInitialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                usersLoading: true,
                error: null,
            }
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                users: action.users,
                usersLoading: false,
                error: null,
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
        case userConstants.GETCURRENT_REQUEST:
            return {
                ...state,
                userLoading: true,
                error: null,
            }
        case userConstants.GETCURRENT_SUCCESS:
            return {
                ...state,
                currentUser: action.user,
                userLoading: false,
                error: null,
            }
        case userConstants.GETCURRENT_FAILURE:
            return {
                ...state,
                error: action.error,
                userLoading: false,
            }

        case userConstants.CHANGE_EMAIL_REQUEST:
            return {
                ...state,
                error: null,
            }
        case userConstants.CHANGE_EMAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.user,
                error: null,
            }
        case userConstants.CHANGE_EMAIL_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        case userConstants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
            }
        case userConstants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case userConstants.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        case userConstants.CHANGE_GUILD_REQUEST:
            return {
                ...state,
                error: null,
            }
        case userConstants.CHANGE_GUILD_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case userConstants.CHANGE_GUILD_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        case walletConstants.ADD_TO_WALLET_REQUEST:
            return {
                ...state,
                walletLoading: true,
                walletError: null,
            }
        case walletConstants.ADD_TO_WALLET_SUCCESS:
            return {
                ...state,
                walletLoading: false,
                walletError: null,
            }
        case walletConstants.ADD_TO_WALLET_FAILURE:
            return {
                ...state,
                walletError: action.error,
            }
    
        default:
            return state
    }
}