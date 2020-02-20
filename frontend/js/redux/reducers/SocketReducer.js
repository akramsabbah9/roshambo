import { socketConstants } from '../actions/types';

import WebSocketAsPromised from 'websocket-as-promised';

const socketInitialState = {
    socketLoading: true,
    error: null,
    socket: null,
}

export function socket(state = socketInitialState, action) {
    switch(action.type) {
        case socketConstants.CONSTRUCTION_REQUEST:
            return {
                ...state,
                socketLoading: true
            }
        case socketConstants.CONSTRUCTION_SUCCESS:
            return {
                ...state,
                socketLoading: false,
                socket: action.socket,
            }
        case socketConstants.CONSTRUCTION_FAILURE:
            return {
                ...state,
                error: action.error,
                socketLoading: false,
            }
        default:
            return state
    }
}
