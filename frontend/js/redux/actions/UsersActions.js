import { history } from '../../utils/history';
import { userConstants } from './types';
import { signup, currentUser, login as loginAPI, allUsers } from '../../utils/api';


export const userActions = {
    login,
    register,
    logout,
    getAll,
    getCurrent,
}

// (FOR TESTING ONLY) DELETE AFTER
const user = {
    name: "flowerHead10",
    id: 0,
    email: "lion@gmail.com",
    rank: "15",
    guild: "pirates@licious",
    wins: 2,
    loss: 12,
    is_active: true
}

// (FOR TESTING ONLY) DELETE AFTER
const userData = [{
    name: "jerry1",
    id: 1,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    is_active: true
},{
    name: "jerry2",
    id: 2,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    is_active: true
},{
    name: "jerry3",
    id: 3,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    is_active: false
},{
    name: "jerry4",
    id: 4,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    is_active: true
},{
    name: "jerry5",
    id: 5,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    is_active: true
}];



function login(email, password) {
    const data = {
        email: email,
        password: password,
    }
    console.log(data)
    return dispatch => {
        dispatch(request({email}));
        
        loginAPI(data)
        .then(response => {
            localStorage.setItem('token', response.token)
            dispatch(success(response.token))
            history.push('/userdashboard')
        })
        .catch(error => {
            console.log(error)
            dispatch(failure(error))
        })
    };

    function request(user) {return { type: userConstants.LOGIN_REQUEST, user}}
    function success(user) {return { type: userConstants.LOGIN_SUCCESS, user}}
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
    /*
    api.logout();
    */
    localStorage.removeItem('token')
    return { type: userConstants.LOGOUT }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        allUsers().then(json =>
            {
                console.log("allUsers promise completed!")
                console.log(json)
                dispatch(success(json));
            })
            .catch(error => {
                dispatch(failure(error));
            });
        // dispatch(success(userData))
        /*
        api.allUsers()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            )

            */
    }

    function request() { return {type: userConstants.GETALL_REQUEST}}
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users}}
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error}}
}

function getCurrent() {
    return dispatch => {
        dispatch(request());

        // get api
        currentUser()
        .then(response => {
            console.log(response)
            dispatch(success(response))
        })
        .catch(error => {
            dispatch(failure(error))
        })
    }

    function request() { return {type: userConstants.GETCURRENT_REQUEST}}
    function success(users) { return { type: userConstants.GETCURRENT_SUCCESS, users}}
    function failure(error) { return { type: userConstants.GETCURRENT_FAILURE, error}}
}