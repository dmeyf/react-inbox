import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import Seed from './Seed'

class App extends Component {

  state = { messages : Seed}

  render() {
    return (
      <div className="App">
      <Toolbar/>
        <MessageList messages={this.state.messages} />

      </div>
    );
  }
}

export default App;
