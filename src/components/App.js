import React from 'react'
import '../App.css'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeMessage from './ComposeMessage'
import {connect} from 'react-redux'

const App = ({composeVisible}) => {

    return (
        <div className="App">
            <Toolbar/>
            {composeVisible && <ComposeMessage/>}
            <MessageList/>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
    composeVisible: state.composeMessage.composeVisible,
})

export default connect(mapStateToProps, null)(App)
