import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link, Switch, Route, withRouter} from 'react-router-dom'
import {
    selectAllMessages,
    markAsRead,
    markAsUnread,
    deleteMessage,
    applyLabel,
    removeLabel,
} from '../actions/messagesActions'

const Toolbar = ({selectAllMessages, messages, markAsRead, markAsUnread, applyLabel, removeLabel, deleteMessage}) => {
    const selectAllStyleHandler = (messages) => {
        const selectedMessages = messages.filter(message => message.selected).length
        if (selectedMessages === 0) {
            return "fa fa-square-o"
        }
        if (selectedMessages === messages.length) {
            return "fa fa-check-square-o"
        }
        return "fa fa-minus-square-o"
    }

    const unreadMessageCountHandler = (messages) => {
        return messages.filter(message => !message.read).length
    }

    const unreadMessageTextHandler = (messages) => {
        if (messages.filter(message => !message.read).length === 1) {
            return "unread message"
        }
        return "unread messages"
    }

    const actionDisabledHandler = (messages) => {
        if (messages.filter(message => message.selected).length === 0) {
            return true
        }
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMessageCountHandler(messages)}</span>
                    {unreadMessageTextHandler(messages)}
                </p>

                <Switch/>
                <Route exact path='/' render={() => (
                    <Link to='/compose' className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </Link>)}>
                </Route>
                <Route path='/compose' render={() => (
                    <Link to='/' className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </Link>)}>
                </Route>
                <Switch/>

                <button className="btn btn-default" onClick={selectAllMessages}>
                    <i className={selectAllStyleHandler(messages)}></i>
                </button>

                <button className="btn btn-default" disabled={actionDisabledHandler(messages)}
                        onClick={markAsRead}>
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={actionDisabledHandler(messages)}
                        onClick={markAsUnread}>
                    Mark As Unread
                </button>

                <select className="form-control label-select" value="Apply label"
                        disabled={actionDisabledHandler(messages)}
                        onChange={(e) => applyLabel(e)}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select disabled" value="Apply label"
                        disabled={actionDisabledHandler(messages)}
                        onChange={(e) => removeLabel(e)}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled={actionDisabledHandler(messages)}
                        onClick={deleteMessage}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    selectAllMessages,
    markAsRead,
    markAsUnread,
    deleteMessage,
    applyLabel,
    removeLabel,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar))
