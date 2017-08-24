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

    selectAllHandler = () => {
        const selectedMessages = this.state.messages.filter(message => message.selected).length
        const messages = this.state.messages
        if (selectedMessages < this.state.messages.length) {
            messages.forEach(message => message.selected = true)
        } else {
            messages.forEach(message => message.selected = false)
        }
        this.setState({messages,})
    }

    markAsRead = () => {
        const messages = this.state.messages.map((message) => {
            if (message.selected) {
                message.read = true
            }
            return message
        })
        this.setState({messages},)
    }

    markAsUnread = () => {
        const messages = this.state.messages.map((message) => {
            if (message.selected) {
                message.read = false
            }
            return message
        })
        this.setState({messages},)
    }

    deleteMessage = () => {
        const messages = this.state.messages.filter(message => !message.selected)
        this.setState({messages},)
    }

    applyLabel = (e) => {
        if (e.target.value !== "Apply label") {
            const messages = this.state.messages.map((message) => {
                if (message.selected && !message.labels.includes(e.target.value)) {
                    message.labels.push(e.target.value)
                }
                return message
            })
            this.setState({messages},)
        }
    }

    removeLabel = (e) => {
        const messages = this.state.messages.map((message) => {
            const index = message.labels.indexOf(e.target.value)
            if (message.selected && index !== -1) {
                message.labels.splice(index, 1)
            }
            return message
        })
        this.setState({messages},)
    }

    render() {
        return (
            <div className="App">
                <Toolbar messages={this.state.messages} selectAllHandler={this.selectAllHandler}
                         markAsRead={this.markAsRead} markAsUnread={this.markAsUnread}
                         deleteMessage={this.deleteMessage} applyLabel={this.applyLabel}
                         removeLabel={this.removeLabel}/>
                <MessageList messages={this.state.messages} starHandler={this.starHandler}
                             selectHandler={this.selectHandler}/>
            </div>
        )
    }
}

export default App
