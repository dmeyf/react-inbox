import React, {Component} from 'react'
import './App.css'
import update from 'immutability-helper'
import MessageList from './MessageList'
import Toolbar from './Toolbar'

class App extends Component {

    state = {
        messages: [],
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/api/messages')
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }

    starHandler = (i) => {
        const messages = update(this.state.messages, {
            [i]: {
                starred: {
                    $apply: function (star) {
                        return !star
                    }
                }
            }
        })
        this.setState({messages})
    }

    selectHandler = (i) => {
        const messages = update(this.state.messages, {
            [i]: {
                selected: {
                    $apply: function (select) {
                        return !select
                    }
                }
            }
        })
        this.setState({messages})
    }

    selectAllHandler = () => {
        const selectedMessages = this.state.messages.filter(message => message.selected).length
        const stateCopy = {...this.state}
        if (selectedMessages < this.state.messages.length) {
            stateCopy.messages = this.state.messages.map(message => Object.assign({}, message, {selected: true}))
        } else {
            stateCopy.messages = this.state.messages.map(message => Object.assign({}, message, {selected: false}))
        }
        this.setState({messages: stateCopy.messages})
    }

    markAsRead = () => {
        const stateCopy = {...this.state}
        stateCopy.messages = this.state.messages.map((message) => {
            if (message.selected) {
                return Object.assign({}, message, {read: true})
            }
            return message
        })
        this.setState({messages: stateCopy.messages})
    }

    markAsUnread = () => {
        const stateCopy = {...this.state}
        stateCopy.messages = this.state.messages.map((message) => {
            if (message.selected) {
                return Object.assign({}, message, {read: false})
            }
            return message
        })
        this.setState({messages: stateCopy.messages})
    }

    deleteMessage = () => {
        const messages = this.state.messages.filter(message => !message.selected)
        this.setState({messages})
    }

    applyLabel = (e) => {
        const stateCopy = {...this.state}
        stateCopy.messages = stateCopy.messages.map((message) => {
            if (message.selected && !message.labels.includes(e.target.value)) {
                return Object.assign({}, message, {labels: message.labels.concat(e.target.value)})
            }
            return message
        })
        this.setState({messages: stateCopy.messages})
    }

    removeLabel = (e) => {
        const stateCopy = {...this.state}
        stateCopy.messages = stateCopy.messages.map((message) => {
            const index = message.labels.indexOf(e.target.value)
            if (message.selected && index !== -1) {
                return Object.assign({}, message, {labels: message.labels.filter(label => label !== e.target.value)})
            }
            return message
        })
        this.setState({messages: stateCopy.messages})
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
