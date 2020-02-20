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
        // CHANGE ACTIVE SKIN
        case skinsConstants.CHANGE_REQUEST:
            return {
                ...state,
                changeSkinLoading: true
            }
        case skinsConstants.CHANGE_SUCCESS:
            return {
                ...state,
                activeSkin: action.id,
                changeSkinLoading: false
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
                addSkinLoading: true
            }
        case skinsConstants.ADD_SUCCESS:
            return {
                ...state,
                ownedSkins: [...state.ownedSkins, action.id],
                addSkinLoading: false,
            }
        case skinsConstants.ADD_FAILURE:
            return {
                ...state,
                error: action.error
            }
        
        // GET ACTIVE SKIN
        case skinsConstants.GETACTIVE_REQUEST:
            return {
                ...state,
                getActiveSkinLoading: true
            }
        case skinsConstants.GETACTIVE_SUCCESS:
            let id = action.id
            return {
                ...state,
                getActiveSkinLoading: false,
                activeSkin: id
            }
        case skinsConstants.GETACTIVE_FAILURE:
            return {
                ...state,
                error: action.error
            }
        
        // GET OWNED SKINS
        case skinsConstants.GETOWNED_REQUEST:
            return {
                ...state,
                getOwnedSkinLoading: true
            }
        case skinsConstants.GETOWNED_SUCCESS:
            return {
                ...state,
                ownedSkins: action.ownedSkins,
                getOwnedSkinLoading: false
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