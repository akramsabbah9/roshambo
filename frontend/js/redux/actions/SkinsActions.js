import { skinsConstants } from './types';

export const skinsActions = {
    change,
    add,
}


function change(ownedSkins, id) {
    return dispatch => {
        dispatch(request(id));

        if (ownedSkins.some(skin => skin == id)) {
            dispatch(success(ownedSkins, id))
        }
        else {
            dispatch(failure("User does not own this skin."))
        }
    }

    function request(id) { return { type: skinsConstants.CHANGE_REQUEST, id}}
    function success(ownedSkins, id) { return { type: skinsConstants.CHANGE_SUCCESS, ownedSkins, id}}
    function failure(error) { return { type: skinsConstants.CHANGE_FAILURE, error}}
}

function add(ownedSkins, activeSkin, id) {
    return dispatch => {
        dispatch(request(id));

        if (ownedSkins.some(skin => skin == id)) {
            dispatch(failure("User already owns this skin."))
        }
        else {
            dispatch(success(ownedSkins, activeSkin, id))
        }
    }

    function request(id) { return { type: skinsConstants.ADD_REQUEST, id}}
    function success(ownedSkins, activeSkin, id) { return { type: skinsConstants.ADD_SUCCESS, ownedSkins, activeSkin, id}}
    function failure(error) { return { type: skinsConstants.ADD_FAILURE, error}}
}