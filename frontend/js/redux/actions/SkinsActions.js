import { skinsConstants } from './types';
import { editActiveSkin, editPurchasedSkins, getPurchasedSkins, getActiveSkin as getSkin} from '../../utils/api';

export const skinsActions = {
    change,
    add,
    getOwnedSkins,
    getActiveSkin,
}


function change(id) {
    return dispatch => {
        dispatch(request());

        editActiveSkin(id)
        .then ( response =>{
            console.log(response.active_skin)
            dispatch(success(response.active_skin))
        })
        .catch( error => {
            console.log(error)
            dispatch(failure(error))
        })
    }

    function request() { return { type: skinsConstants.CHANGE_REQUEST}}
    function success(id) { return { type: skinsConstants.CHANGE_SUCCESS, id}}
    function failure(error) { return { type: skinsConstants.CHANGE_FAILURE, error}}
}

function add(id) {
    return dispatch => {
        dispatch(request());

        editPurchasedSkins(id) 
        .then( response => {
            console.log(response)
            dispatch(success(response))
        })
        .catch( error => {
            console.log(error)
            dispatch(failure(error))
        })
    }

    function request() { return { type: skinsConstants.ADD_REQUEST}}
    function success(id) { return { type: skinsConstants.ADD_SUCCESS, id}}
    function failure(error) { return { type: skinsConstants.ADD_FAILURE, error}}
}

function getOwnedSkins() {
    return dispatch => {
        dispatch(request())
        getPurchasedSkins()
        .then( response => {
            dispatch(success(response.purchased_skins))
        })
        .catch( error => {
            console.log(error)
            dispatch(failure(error))
        })
    }

    function request() { return { type: skinsConstants.GETOWNED_REQUEST}}
    function success(ownedSkins) { return { type: skinsConstants.GETOWNED_SUCCESS, ownedSkins}}
    function failure(error) { return { type: skinsConstants.GETOWNED_FAILURE, error}}
}

function getActiveSkin() {
    return dispatch => {
        dispatch(request())
        getSkin()
        .then( response => {
            dispatch(success(response.active_skin))
        })
        .catch( error => {
            console.log(error)
            dispatch(failure(error))
        })
    }

    function request() { return { type: skinsConstants.GETACTIVE_REQUEST}}
    function success(id) { return { type: skinsConstants.GETACTIVE_SUCCESS, id}}
    function failure(error) { return { type: skinsConstants.GETACTIVE_FAILURE, error}}
}