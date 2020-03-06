import { gameConstants } from '../actions/types';

const initialState = {
    gameEnded: false
}

export function game(state=initialState, action) {
    switch(action.type) {
        case gameConstants.ENDGAME: 
            return {
                ...state,
                gameEnded: true,
            }
        case gameConstants.UNENDGAME:
            return {
                ...state,
                gameEnded: false,
            }
        default:
            return state
    }
}