import React from 'react'
import '../App.css'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeMessage from './ComposeMessage'
import {connect} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const App = ({messages}) => {

    return (
        (messages.length) ?
            (<Router history={history}>
                <div className="App">
                    <Toolbar/>
                    <Route path="/compose" component={ComposeMessage} />
                    <MessageList/>
                </div>
            </Router>)
            :
            (<div>Loading...</div>)
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
    composeVisible: state.composeMessage.composeVisible,
})

export default connect(mapStateToProps, null)(App)
