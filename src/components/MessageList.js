import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Message from './Message'
import {selectMessage, starMessage} from '../actions/messagesActions'

const MessageList = ({messages, starMessage, selectMessage}) => (
    <div>
        {messages.map((message, i) => {
            return <Message key={i} message={message} starMessage={() => starMessage(i)}
                            selectMessage={() => selectMessage(i)}/>
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
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList)
