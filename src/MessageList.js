import React, { Component } from 'react';
import Message from './Message'

class MessageList extends Component {

  render() {
    return (
      <div>
      {this.props.messages.map((message, i) => {
        return <Message key={message.id} message={message}/>
      })
    }
      </div>
    );
  }
}

export default MessageList;
