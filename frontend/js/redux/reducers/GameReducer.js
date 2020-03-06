import { userConstants } from '../actions/types';

const initialState = {
    gameEnded: false
}

export function game(state=initialState, action) {
    switch(action.type) {
        case userConstants.ENDGAME: 
            return {
                ...state,
                gameEnded: true,
            }
        default:
            return state
    }
}