import React from 'react';
import PropTypes from 'prop-types'

const Toolbar = ({messages, selectAllHandler, markAsRead, markAsUnread, applyLabel, removeLabel, deleteMessage, toggleComposeVisibility}) => {
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

                <a className="btn btn-danger" onClick={() => toggleComposeVisibility()}>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default" onClick={() => selectAllHandler()}>
                    <i className={selectAllStyleHandler(messages)}></i>
                </button>

                <button className="btn btn-default" disabled={actionDisabledHandler(messages)}
                        onClick={() => markAsRead()}>
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={actionDisabledHandler(messages)}
                        onClick={() => markAsUnread()}>
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
                        onClick={() => deleteMessage()}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

Toolbar.propTypes = {
    messages: PropTypes.array,
    selectAllHandler: PropTypes.func,
    markAsRead: PropTypes.func,
    markAsUnread: PropTypes.func,
    applyLabel: PropTypes.func,
    removeLabel: PropTypes.func,
    deleteMessage: PropTypes.func,
    toggleComposeVisibility: PropTypes.func,
}

export default Toolbar
