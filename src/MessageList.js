import React, {Component} from 'react'
import Message from './Message'

class MessageList extends Component {

    render() {
        return (
            <div>
                {this.props.messages.map((message, i) => {
                    return <Message key={i} message={message} starHandler={this.props.starHandler}
                                    selectHandler={this.props.selectHandler}/>
                })
                }
            </div>
        )
    }
}

export default MessageList
