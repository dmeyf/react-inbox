import React, {Component} from 'react'
import './App.css'
import update from 'immutability-helper'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeMessage from './ComposeMessage'

class App extends Component {

    state = {
        messages: [],
        composeVisible: false,
    }

    async componentDidMount() {
        const response = await fetch('/api/messages')
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }

    async patchHandler(body) {
        await fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    starHandler = async (i) => {
        const messages = update(this.state.messages, {
            [i]: {
                starred: {
                    $apply: function (star) {
                        return !star
                    }
                }
            }
        })
        this.patchHandler({messageIds: [messages[i].id], command: 'star', star: messages[i].starred})
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
        const messageIdList = []
        stateCopy.messages = this.state.messages.map((message) => {
            if (message.selected) {
                messageIdList.push(message.id)
                return Object.assign({}, message, {read: true})
            }
            return message
        })
        this.patchHandler({messageIds: messageIdList, command: 'read', read: true})
        this.setState({messages: stateCopy.messages})
    }

    markAsUnread = () => {
        const stateCopy = {...this.state}
        const messageIdList = []
        stateCopy.messages = this.state.messages.map((message) => {
            if (message.selected) {
                messageIdList.push(message.id)
                return Object.assign({}, message, {read: false})
            }
            return message
        })
        this.patchHandler({messageIds: messageIdList, command: 'read', read: false})
        this.setState({messages: stateCopy.messages})
    }

    deleteMessage = () => {
        const selectedMessages = this.state.messages.filter(message => message.selected)
        this.patchHandler({messageIds: selectedMessages.map(message => message.id), command: 'delete'})
        this.setState({messages: this.state.messages.filter(message => !message.selected)})
    }

    applyLabel = (e) => {
        const stateCopy = {...this.state}
        const messageIdList = []
        stateCopy.messages = stateCopy.messages.map((message) => {
            if (message.selected && !message.labels.includes(e.target.value)) {
                messageIdList.push(message.id)
                return Object.assign({}, message, {labels: message.labels.concat(e.target.value)})
            }
            return message
        })
        this.patchHandler({messageIds: messageIdList, command: 'addLabel', label: e.target.value})
        this.setState({messages: stateCopy.messages})
    }

    removeLabel = (e) => {
        const stateCopy = {...this.state}
        const messageIdList = []
        stateCopy.messages = stateCopy.messages.map((message) => {
            const index = message.labels.indexOf(e.target.value)
            if (message.selected && index !== -1) {
                messageIdList.push(message.id)
                return Object.assign({}, message, {labels: message.labels.filter(label => label !== e.target.value)})
            }
            return message
        })
        this.patchHandler({messageIds: messageIdList, command: 'removeLabel', label: e.target.value})
        this.setState({messages: stateCopy.messages})
    }

    toggleComposeVisibility = () => {
        this.setState({composeVisible: !this.state.composeVisible})
    }

    onMessageSubmit = async (body) => {
        const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const messageResponse = await response.json()
        const stateCopy = {...this.state}
        const {...message} = messageResponse
        stateCopy.messages.push(message)
        this.setState({
            messages: stateCopy.messages,
            composeVisible: false,
        })
    }

    render() {
        return (
            <div className="App">
                <Toolbar messages={this.state.messages} selectAllHandler={this.selectAllHandler}
                         markAsRead={this.markAsRead} markAsUnread={this.markAsUnread}
                         deleteMessage={this.deleteMessage} applyLabel={this.applyLabel}
                         removeLabel={this.removeLabel} toggleComposeVisibility={this.toggleComposeVisibility}/>
                {this.state.composeVisible &&
                <ComposeMessage onMessageSubmit={this.onMessageSubmit}/>}
                <MessageList messages={this.state.messages} starHandler={this.starHandler}
                             selectHandler={this.selectHandler}/>
            </div>
        )
    }
}

export default App
