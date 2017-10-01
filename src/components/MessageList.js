import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import Message from './Message'
import {selectMessage, starMessage, readMessage} from '../actions/messagesActions'

const MessageList = ({messages, starMessage, selectMessage, readMessage}) => (
    <div>
        {messages.map((message, i) => {
            return <Message key={i} message={message} starMessage={() => starMessage(i)}
                            selectMessage={() => selectMessage(i)} readMessage={() => readMessage(i)}/>
        })
        }
    </div>
)

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    selectMessage,
    starMessage,
    readMessage
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList))
