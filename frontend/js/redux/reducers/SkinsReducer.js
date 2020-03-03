import { skinsConstants } from '../actions/types';

const initialState = {
    changeSkinLoading: false,
    addSkinLoading: false,
    getActiveSkinLoading: false,
    getOwnedSkinLoading: false,
    ownedSkins: [0],
    activeSkin: 0,
    error: null,
}




export function skins(state=initialState, action) {
    switch(action.type) {
        case skinsConstants.CHANGE_REQUEST:
            return {
                ...state,
                changeSkinLoading: true,
                error: null,
            }
        case skinsConstants.CHANGE_SUCCESS:
            return {
                ...state,
                activeSkin: action.id,
                changeSkinLoading: false,
                error: null,
            }
        case skinsConstants.CHANGE_FAILURE:
            return {
                ...state,
                error: action.error
            }
        
        // ADD TO OWNED SKINS
        case skinsConstants.ADD_REQUEST:
            return {
                ...state,
                addSkinLoading: true,
                error: null,
            }
        case skinsConstants.ADD_SUCCESS:
            return {
                ...state,
                ownedSkins: action.purchased_skins,
                addSkinLoading: false,
                error: null,
            }
        case skinsConstants.ADD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        
        case skinsConstants.GETACTIVE_REQUEST:
            return {
                ...state,
                getActiveSkinLoading: true,
                error: null,
            }
        case skinsConstants.GETACTIVE_SUCCESS:
            let id = action.id
            return {
                ...state,
                getActiveSkinLoading: false,
                activeSkin: id,
                error: null,
            }
        case skinsConstants.GETACTIVE_FAILURE:
            return {
                ...state,
                error: action.error
            }
        
        case skinsConstants.GETOWNED_REQUEST:
            return {
                ...state,
                getOwnedSkinLoading: true,
                error: null,
            }
        case skinsConstants.GETOWNED_SUCCESS:
            return {
                ...state,
                ownedSkins: action.ownedSkins,
                getOwnedSkinLoading: false,
                error: null,
            }
        case skinsConstants.GETOWNED_FAILURE:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}