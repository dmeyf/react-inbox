import * as types from '../actions/actionTypes'
import update from 'immutability-helper'

export function messages(messages=[], action) {
    let newMessages = []
    let messageIdList = []
    switch (action.type) {
        case types.MESSAGES_RECEIVED:
            return action.messages
        case types.SELECT_ALL_MESSAGES:
            if (messages.filter(message => message.selected).length < messages.length) {
                return messages.map(message => Object.assign({}, message, {selected: true}))
            } else {
                return messages.map(message => Object.assign({}, message, {selected: false}))
            }
        case types.MARK_AS_READ:
            newMessages = messages.map((message) => {
                if (message.selected) {
                    messageIdList.push(message.id)
                    return Object.assign({}, message, {read: true})
                }
                return message
            })
            patchHandler({messageIds: messageIdList, command: 'read', read: true})
            return newMessages
        case types.MARK_AS_UNREAD:
            newMessages = messages.map((message) => {
                if (message.selected) {
                    messageIdList.push(message.id)
                    return Object.assign({}, message, {read: false})
                }
                return message
            })
            patchHandler({messageIds: messageIdList, command: 'read', read: false})
            return newMessages
        case types.SELECT_MESSAGE:
            newMessages = update(messages, {
                [action.index]: {
                    selected: {
                        $apply: function (select) {
                            return !select
                        }
                    }
                }
            })
            return newMessages
        case types.STAR_MESSAGE:
            newMessages = update(messages, {
                [action.index]: {
                    starred: {
                        $apply: function (star) {
                            return !star
                        }
                    }
                }
            })
            patchHandler({messageIds: [newMessages[action.index].id], command: 'star', star: newMessages[action.index].starred})
            return newMessages
        case types.READ_MESSAGE:
            newMessages = update(messages, {
                [action.index]: {
                    read: {
                        $apply: function () {
                            return true
                        }
                    }
                }
            })
            patchHandler({messageIds: [newMessages[action.index].id], command: 'read', read: true})
            return newMessages
        case types.DELETE_MESSAGE:
            newMessages = messages.filter(message => message.selected)
            patchHandler({messageIds: newMessages.map(message => message.id), command: 'delete'})
            return messages.filter(message => !message.selected)
        case types.APPLY_LABEL:
            newMessages = messages.map((message) => {
                if (message.selected && !message.labels.includes(action.labelValue)) {
                    messageIdList.push(message.id)
                    return Object.assign({}, message, {labels: message.labels.concat(action.labelValue)})
                }
                return message
            })
            patchHandler({messageIds: messageIdList, command: 'addLabel', label: action.labelValue})
            return newMessages
        case types.REMOVE_LABEL:
            newMessages = messages.map((message) => {
                const index = message.labels.indexOf(action.labelValue)
                if (message.selected && index !== -1) {
                    messageIdList.push(message.id)
                    return Object.assign({}, message, {labels: message.labels.filter(label => label !== action.labelValue)})
                }
                return message
            })
            patchHandler({messageIds: messageIdList, command: 'removeLabel', label: action.labelValue})
            return newMessages
        case types.SUBMIT_MESSAGE:
            return messages.concat(action.newMessage)
        default:
            return messages
    }
}

const patchHandler = async (body) => {
    await fetch('/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export function composeMessage(state={}, action) {
    switch (action.type) {
        case types.SUBMIT_MESSAGE:
            return {
                ...state,
                composeVisible: false
            }
        case types.MESSAGE_DETAIL_RECEIVED:
            return {
                ...state,
                messageBody: action.messageBody
            }
        default:
            return state
    }
}
