import React, {Component} from 'react'
import './App.css'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import Seed from './Seed'

class App extends Component {

    state = {messages: Seed}

    starHandler = (i) => {
        const messages = this.state.messages
        messages[i - 1].starred = !messages[i - 1].starred
        this.setState({messages,})
    }

    selectHandler = (i) => {
        const messages = this.state.messages
        messages[i - 1].selected = !messages[i - 1].selected
        this.setState({messages,})
    }

    render() {
        return (
            <div className="App">
                <Toolbar/>
                <MessageList messages={this.state.messages} starHandler={this.starHandler}
                             selectHandler={this.selectHandler}/>
            </div>
        )
    }
}

export default App
