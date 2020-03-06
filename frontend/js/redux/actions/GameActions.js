import { gameConstants } from './types';

export const userActions = {
    end_the_game,
}

function end_the_game() {
    return dispatch => {
        dispatch({ type: gameConstants.END_GAME});
    };
}