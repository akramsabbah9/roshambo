import { skinsConstants } from '../actions/types';

const initialState = {
    loading: false,
    ownedSkins: [0],
    activeSkin: 0,
    error: null,
}

export function skins(state=initialState, action) {
    switch(action.type) {
        case skinsConstants.CHANGE_REQUEST:
            return {
                loading: true
            }
        case skinsConstants.CHANGE_SUCCESS:
            return {
                activeSkin: action.id,
                ownedSkins: action.ownedSkins,
                loading: false
            }
        case skinsConstants.CHANGE_FAILURE:
            return {
                error: action.error
            }
        case skinsConstants.ADD_REQUEST:
            return {
                loading: true
            }
        case skinsConstants.ADD_SUCCESS:
            return {
                ownedSkins: [...action.ownedSkins, action.id],
                activeSkin: action.activeSkin,
                loading: false
            }
        case skinsConstants.ADD_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}