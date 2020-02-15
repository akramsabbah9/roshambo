import { login as loginApi } from '../../utils/api';
import { history } from '../../utils/history';
import { userConstants } from './types';

export const userActions = {
    login,
    register,
    logout,
    getAll,
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
    total: 14
}

// (FOR TESTING ONLY) DELETE AFTER
const userData = [{
    name: "jerry1",
    id: 1,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry2",
    id: 2,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry3",
    id: 3,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry4",
    id: 4,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
},{
    name: "jerry5",
    id: 5,
    rank: "23",
    guild: "pirates@licious",
    wins: 23,
    loss: 2,
    total: 25
}];



function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        // DELETE: FOR TESTING ONLY
        if (password == "123") {
            localStorage.setItem('user', 'loggedIn')
            dispatch(success(user))
            history.push('/userdashboard');
        } else {
            dispatch(failure("Error logging in."))
        }
        
        
        
        /*
        
        api.login({username, password})
            .then(
                user => {
                    dispatch(success(user));
                    history.pushState('/userdashboard');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
        */
    };

    function request(user) {return { type: userConstants.LOGIN_REQUEST, user}}
    function success(user) {return { type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) {return { type: userConstants.LOGIN_FAILURE, error}}
}

function register(user) {
    return dispatch => {
        dispatch(request(user));


        dispatch(success())
        /*
        api.signup(user)
            .then(
                user => {
                    dispatch(success());
                    history.pushState('/login');
                },
                error => {
                    dispatch(failure(error.toString()))
                }
            )
            */
    }
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user }}
    function success(user) {return { type: userConstants.REGISTER_SUCCESS, user}}
    function failure(error) {return { type: userConstants.REGISTER_FAILURE, error}}
}

function logout(user) {
    /*
    api.logout();
    */
    localStorage.removeItem('user')
    return { type: userConstants.LOGOUT }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        dispatch(success(userData))
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
