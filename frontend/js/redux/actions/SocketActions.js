import WebSocketAsPromised from 'websocket-as-promised';

import { socketConstants } from './types';


export const socketActions = {
    constructSocket,
    destructSocket,
}

function constructSocket() {
    return dispatch => {
        dispatch(request());
        
        const socket = new WebSocketAsPromised(socketConstants.SOCKET_URL, {
            createWebSocket: url => new WebSocket(url, ['Token', localStorage.getItem('token')]),
            packMessage: data => JSON.stringify(data),
            unpackMessage: data => JSON.parse(data),
            attachRequestId: (data, id) => Object.assign({id}, data),
            extractRequestId: data => data && data.id
          });
        socket.open()
            .then(() => {
                dispatch(success(socket));
            })
            .catch( error => {
                dispatch(failure(error));
            });
    };

    function request() {return { type: socketConstants.CONSTRUCTION_REQUEST }}
    function success(socket) {return { type: socketConstants.CONSTRUCTION_SUCCESS, socket }}
    function failure(error) {return { type: socketConstants.CONSTRUCTION_FAILURE, error }}
}

function destructSocket() {
    return (dispatch, getState) => {

        const { socket } =  getState();

        if (this.socket.socket == null) {
            dispatch(failure("Socket cannot be destructed - it doesn't exist!"));
        }

        socket.socket.removeAllListeners();
        socket.socket.close()
            .then(() => {
                dispatch(success());
            })
            .catch(error => {
                dispatch(failure(error));
            })
    };

    function success() {return { type: socketConstants.DESTRUCTION_SUCCESS }}
    function failure(error) {return { type: socketConstants.DESTRUCTION_FAILURE, error }}
}
