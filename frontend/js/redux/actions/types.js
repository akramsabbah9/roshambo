export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    GETCURRENT_REQUEST: 'USERS_GETCURRENT_REQUEST',
    GETCURRENT_SUCCESS: 'USERS_GETCURRENT_SUCCESS',
    GETCURRENT_FAILURE: 'USERS_GETCURRENT_FAILURE',

    CHANGE_EMAIL_REQUEST: 'USERS_CHANGE_EMAIL_REQUEST',
    CHANGE_EMAIL_SUCCESS: 'USERS_CHANGE_EMAIL_SUCCESS',
    CHANGE_EMAIL_FAILURE: 'USERS_CHANGE_EMAIL_FAILURE',

    CHANGE_PASSWORD_REQUEST: 'USERS_CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'USERS_CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILURE: 'USERS_CHANGE_PASSWORD_FAILURE',

    CHANGE_GUILD_REQUEST: 'USERS_CHANGE_GUILD_REQUEST',
    CHANGE_GUILD_SUCCESS: 'USERS_CHANGE_GUILD_SUCCESS',
    CHANGE_GUILD_FAILURE: 'USERS_CHANGE_GUILD_FAILURE',

    CHANGE_STATS_REQUEST: 'USERS_CHANGE_STATS_REQUEST',
    CHANGE_STATS_SUCCESS: 'USERS_CHANGE_STATS_SUCCESS',
    CHANGE_STATS_FAILURE: 'USERS_CHANGE_STATS_FAILURE'
}

export const skinsConstants = {
    CHANGE_REQUEST: 'SKINS_CHANGE_REQUEST',
    CHANGE_SUCCESS: 'SKINS_CHANGE_SUCCESS',
    CHANGE_FAILURE: 'SKINS_CHANGE_FAILURE',

    ADD_REQUEST: 'SKINS_ADD_REQUEST',
    ADD_SUCCESS: 'SKINS_ADD_SUCCESS',
    ADD_FAILURE: 'SKINS_ADD_FAILURE',

    GETACTIVE_REQUEST: 'SKINS_GETACTIVE_REQUEST',
    GETACTIVE_SUCCESS: 'SKINS_GETACTIVE_SUCCESS',
    GETACTIVE_FAILURE: 'SKINS_GETACTIVE_FAILURE',

    GETOWNED_REQUEST: 'SKINS_GETOWNED_REQUEST',
    GETOWNED_SUCCESS: 'SKINS_GETOWNED_SUCCESS',
    GETOWNED_FAILURE: 'SKINS_GETOWNED_FAILURE',
}

export const walletConstants = {
    ADD_TO_WALLET_REQUEST: 'ADD_TO_WALLET_REQUEST',
    ADD_TO_WALLET_SUCCESS: 'ADD_TO_WALLET_SUCCESS',
    ADD_TO_WALLET_FAILURE: 'ADD_TO_WALLET_FAILURE',
}

export const socketConstants = {
    CONSTRUCTION_REQUEST: 'SOCKET_CONSTRUCTION_REQUEST',
    CONSTRUCTION_SUCCESS: 'SOCKET_CONSTRUCTION_SUCCESS',
    CONSTRUCTION_FAILURE: 'SOCKET_CONSTRUCTION_FAILURE',

    DESTRUCTION_SUCCESS: 'SOCKET_DESTRUCTION_SUCCESS',
    DESTRUCTION_FAILURE: 'SOCKET_DESTRUCION_FAILURE',

    SOCKET_URL: process.env.SOCKET_URL,
}

export const gameConstants = {
    ENDGAME: 'END_GAME',
    UNENDGAME: 'UNEND_GAME',
}
