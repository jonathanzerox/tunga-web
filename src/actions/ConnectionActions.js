import axios from 'axios'
import { ENDPOINT_CONNECTION } from '../constants/Api'

export const CREATE_CONNECTION_START = 'CREATE_CONNECTION_START';
export const CREATE_CONNECTION_SUCCESS = 'CREATE_CONNECTION_SUCCESS';
export const CREATE_CONNECTION_FAILED = 'CREATE_CONNECTION_FAILED';
export const LIST_CONNECTIONS_START = 'LIST_CONNECTIONS_START';
export const LIST_CONNECTIONS_SUCCESS = 'LIST_CONNECTIONS_SUCCESS';
export const LIST_CONNECTIONS_FAILED = 'LIST_CONNECTIONS_FAILED';
export const RETRIEVE_CONNECTION_START = 'RETRIEVE_CONNECTION_START';
export const RETRIEVE_CONNECTION_SUCCESS = 'RETRIEVE_CONNECTION_SUCCESS';
export const RETRIEVE_CONNECTION_FAILED = 'RETRIEVE_CONNECTION_FAILED';
export const UPDATE_CONNECTION_START = 'UPDATE_CONNECTION_START';
export const UPDATE_CONNECTION_SUCCESS = 'UPDATE_CONNECTION_SUCCESS';
export const UPDATE_CONNECTION_FAILED = 'UPDATE_CONNECTION_FAILED';
export const DELETE_CONNECTION_START = 'DELETE_CONNECTION_START';
export const DELETE_CONNECTION_SUCCESS = 'DELETE_CONNECTION_SUCCESS';
export const DELETE_CONNECTION_FAILED = 'DELETE_CONNECTION_FAILED';

export function createConnection(connection) {
    return dispatch => {
        dispatch(createConnectionStart(connection));
        axios.post(ENDPOINT_CONNECTION, connection)
            .then(function(response) {
                dispatch(createConnectionSuccess(response.data))
            }).catch(function(response) {
                dispatch(createConnectionFailed(response.data))
            });
    }
}

export function createConnectionStart(connection) {
    return {
        type: CREATE_CONNECTION_START,
        connection
    }
}

export function createConnectionSuccess(connection) {
    return {
        type: CREATE_CONNECTION_SUCCESS,
        connection
    }
}

export function createConnectionFailed(error) {
    return {
        type: CREATE_CONNECTION_FAILED,
        error
    }
}

export function listConnections(filter) {
    return dispatch => {
        dispatch(listConnectionsStart(filter));
        axios.get(ENDPOINT_CONNECTION, {params: filter})
            .then(function(response) {
                dispatch(listConnectionsSuccess(response.data))
            }).catch(function(response) {
                dispatch(listConnectionsFailed(response.data))
            });
    }
}

export function listConnectionsStart(filter) {
    return {
        type: LIST_CONNECTIONS_START,
        filter
    }
}

export function listConnectionsSuccess(response) {
    return {
        type: LIST_CONNECTIONS_SUCCESS,
        items: response.results,
        previous: response.previous,
        next: response.next
    }
}

export function listConnectionsFailed(error) {
    return {
        type: LIST_CONNECTIONS_FAILED,
        error
    }
}

export function retrieveConnection(id) {
    return dispatch => {
        dispatch(retrieveConnectionStart(id));
        axios.get(ENDPOINT_CONNECTION + id + '/')
            .then(function(response) {
                dispatch(retrieveConnectionSuccess(response.data))
            }).catch(function(response) {
                dispatch(retrieveConnectionFailed(response.data))
            });
    }
}

export function retrieveConnectionStart(id) {
    return {
        type: RETRIEVE_CONNECTION_START,
        id
    }
}

export function retrieveConnectionSuccess(connection) {
    return {
        type: RETRIEVE_CONNECTION_SUCCESS,
        connection
    }
}

export function retrieveConnectionFailed(error) {
    return {
        type: RETRIEVE_CONNECTION_FAILED,
        error
    }
}

export function updateConnection(id, data) {
    return dispatch => {
        dispatch(updateConnectionStart(id));
        axios.patch(ENDPOINT_CONNECTION + id + '/', data)
            .then(function(response) {
                dispatch(updateConnectionSuccess(response.data))
            }).catch(function(response) {
                dispatch(updateConnectionFailed(response.data))
            });
    }
}

export function updateConnectionStart(id) {
    return {
        type: UPDATE_CONNECTION_START,
        id
    }
}

export function updateConnectionSuccess(connection) {
    return {
        type: UPDATE_CONNECTION_SUCCESS,
        connection
    }
}

export function updateConnectionFailed(error) {
    return {
        type: UPDATE_CONNECTION_FAILED,
        error
    }
}


export function deleteConnection(id) {
    return dispatch => {
        dispatch(deleteConnectionStart(id));
        axios.delete(ENDPOINT_CONNECTION + id + '/', {})
            .then(function() {
                dispatch(deleteConnectionSuccess(id))
            }).catch(function(response) {
                dispatch(deleteConnectionFailed(response.data))
            });
    }
}

export function deleteConnectionStart(id) {
    return {
        type: DELETE_CONNECTION_START,
        id
    }
}

export function deleteConnectionSuccess(id) {
    return {
        type: DELETE_CONNECTION_SUCCESS,
        id
    }
}

export function deleteConnectionFailed(error) {
    return {
        type: DELETE_CONNECTION_FAILED,
        error
    }
}
