import { history } from '../../utils/history';
import { userConstants, walletConstants } from './types';
import {    signup, 
            currentUser, 
            login as loginAPI, 
            allUsers, 
            editUser, 
            logout as logoutAPI, 
            editUserWallet,
        } from '../../utils/api';


export const userActions = {
    login,
    register,
    logout,
    getAll,
    getCurrent,
    changeEmail,
    changePassword,
    changeGuild,
    addToWallet,
}


function login(email, password) {
    const data = {
        email: email,
        password: password,
    }
    return dispatch => {
        dispatch(request());
        
        loginAPI(data)
        .then(response => {
            localStorage.setItem('token', response.token)
            dispatch(success(response.token))
            history.push('/userdashboard')
        })
        .catch(error => {
            dispatch(failure(error))
        })
    };

    function request() {return { type: userConstants.LOGIN_REQUEST}}
    function success() {return { type: userConstants.LOGIN_SUCCESS}}
    function failure(error) {return { type: userConstants.LOGIN_FAILURE, error}}
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        signup(user)
        .then (response => {
            localStorage.setItem('token', response.token)
            dispatch(success(response.token))
            history.push('/userdashboard')
        })
        .catch (error => {
            dispatch(failure(error))
        })
    }
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user }}
    function success(user) {return { type: userConstants.REGISTER_SUCCESS, user}}
    function failure(error) {return { type: userConstants.REGISTER_FAILURE, error}}
}

function logout(user) {
    return dispatch =>{
        logoutAPI()
        .then(() => {
            localStorage.removeItem('token')
            dispatch(success())
            history.push('/login');
        })   
    }
    function success() {return {type: userConstants.LOGOUT}}
}

function getAll() {
    return dispatch => {
        dispatch(request());

        allUsers().then(json =>
            {
                dispatch(success(json));
            })
            .catch(error => {
                dispatch(failure(error));
            });
    }

    function request() { return {type: userConstants.GETALL_REQUEST}}
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users}}
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error}}
}

function getCurrent() {
    return dispatch => {
        dispatch(request());

        currentUser()
        .then(response => {
            dispatch(success(response))
        })
        .catch(error => {
            dispatch(failure(error))
        })
    }

    function request() { return {type: userConstants.GETCURRENT_REQUEST}}
    function success(user) { return { type: userConstants.GETCURRENT_SUCCESS, user}}
    function failure(error) { return { type: userConstants.GETCURRENT_FAILURE, error}}
}

function changeEmail(email) {
    const data = {
        email: email,
    }

    return dispatch => {
        dispatch(request());
        
        editUser(data)
        .then(response => {
            dispatch(success(response))
            history.push('/userdashboard')
        })
        .catch(error => {
            dispatch(failure(error))
        })
    };

    function request() {return { type: userConstants.CHANGE_EMAIL_REQUEST}}
    function success(user) {return { type: userConstants.CHANGE_EMAIL_SUCCESS, user}}
    function failure(error) {return { type: userConstants.CHANGE_EMAIL_FAILURE, error}}
}

function changePassword(password) {
    const data = {
        password: password,
    }

    return dispatch => {
        dispatch(request());
        
        editUser(data)
        .then(response => {
            dispatch(success(response))
            history.push('/userdashboard')
        })
        .catch(error => {
            dispatch(failure(error))
        })
    };

    function request() {return { type: userConstants.CHANGE_PASSWORD_REQUEST}}
    function success() {return { type: userConstants.CHANGE_PASSWORD_SUCCESS}}
    function failure(error) {return { type: userConstants.CHANGE_PASSWORD_FAILURE, error}}
}

function changeGuild(guild) {
    const data = {
        guild: guild,
    }

    return dispatch => {
        dispatch(request());
        
        editUser(data)
        .then(response => {
            dispatch(success(response))
            history.push('/userdashboard')
        })
        .catch(error => {
            dispatch(failure(error))
        })
    };

    function request() {return { type: userConstants.CHANGE_GUILD_REQUEST}}
    function success() {return { type: userConstants.CHANGE_GUILD_SUCCESS}}
    function failure(error) {return { type: userConstants.CHANGE_GUILD_FAILURE, error}}
}

function addToWallet(token) {
    const data = {
        stripe_token: token.id,
        amount: 500
    }

    return dispatch => {
        dispatch(request());
        
        editUserWallet(data)
        .then(response => {
            dispatch(success(response))
            history.push('/userdashboard')
        })
        .catch(error => {
            dispatch(failure(error))
        })
    };

    function request() {return { type: walletConstants.ADD_TO_WALLET_REQUEST}}
    function success() {return { type: walletConstants.ADD_TO_WALLET_SUCCESS}}
    function failure(error) {return { type: walletConstants.ADD_TO_WALLET_FAILURE, error}}
}