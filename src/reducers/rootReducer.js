import {combineReducers} from 'redux'
import {messages, composeMessage} from './messagesReducers'

export default combineReducers({
    messages,
    composeMessage
})
