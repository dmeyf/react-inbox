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

    selectAllStyleHandler = () => {
        const selectedMessages = this.state.messages.filter(message => message.selected === true).length
        if (selectedMessages === 0) {
            return "fa fa-square-o"
        }
        if (selectedMessages === this.state.messages.length) {
            return "fa fa-check-square-o"
        }
        return "fa fa-minus-square-o"
    }

    selectAllHandler = () => {
        const selectedMessages = this.state.messages.filter(message => message.selected === true).length
        const messages = this.state.messages
        if (selectedMessages < this.state.messages.length) {
            messages.forEach(message => message.selected = true)
        } else {
            messages.forEach(message => message.selected = false)
        }
            this.setState({messages,})
    }

    render() {
        return (
            <div className="App">
                <Toolbar messages={this.state.messages} selectAllStyleHandler={this.selectAllStyleHandler}
                         selectAllHandler={this.selectAllHandler}/>
                <MessageList messages={this.state.messages} starHandler={this.starHandler}
                             selectHandler={this.selectHandler}/>
            </div>
        )
    }
}

export default App
