import * as types from './actionTypes'

export function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch('/api/messages')
        const json = await response.json()
        dispatch({
            type: types.MESSAGES_RECEIVED,
            messages: json._embedded.messages
        })
    }
}

export function selectAllMessages() {
    return dispatch => {
        dispatch({
            type: types.SELECT_ALL_MESSAGES
        })
    }
}

export function markAsRead(messages) {
    return async (dispatch) => {
        dispatch({
            type: types.MARK_AS_READ,
            messages
        })
    }
}

export function markAsUnread(messages) {
    return async (dispatch) => {
        dispatch({
            type: types.MARK_AS_UNREAD,
            messages
        })
    }
}

export function selectMessage(i) {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_MESSAGE,
            index: i
        })
    }
}

export function starMessage(i) {
    return async (dispatch) => {
        dispatch({
            type: types.STAR_MESSAGE,
            index: i
        })
    }
}

export function deleteMessage(messages) {
    return async (dispatch) => {
        dispatch({
            type: types.DELETE_MESSAGE,
            messages
        })
    }
}

export function applyLabel(e) {
    return async (dispatch) => {
        dispatch({
            type: types.APPLY_LABEL,
            labelValue: e.target.value
        })
    }
}

export function removeLabel(e) {
    return async (dispatch) => {
        dispatch({
            type: types.REMOVE_LABEL,
            labelValue: e.target.value
        })
    }
}

export function toggleComposeVisibility(isVisible) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_COMPOSE_VISIBILITY,
            isVisible: !isVisible
        })
    }
}

export function submitMessage(subject, body) {
    return async (dispatch) => {
        const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({subject, body}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const messageResponse = await response.json()

        dispatch({
            type: types.SUBMIT_MESSAGE,
            newMessage: messageResponse,
        })
    }
}
