import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const MessageList = ({messages, starHandler, selectHandler}) => (
    <div>
        {messages.map((message, i) => {
            return <Message key={i} message={message} starHandler={() => starHandler(i)}
                            selectHandler={() => selectHandler(i)}/>
        })
        }
    </div>
)

MessageList.propTypes = {
    messages: PropTypes.array,
    selectHandler: PropTypes.func,
    starHandler: PropTypes.func,
}

export default MessageList
