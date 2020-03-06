import { gameConstants } from './types';

export const gameActions = {
    end_the_game,
    unend_the_game,
}

function end_the_game() {
    return dispatch => {
        dispatch({ type: gameConstants.END_GAME});
    };
}

function unend_the_game() {
    return dispatch => {
        dispatch({ type: gameConstants.UNEND_GAME});
    };
}