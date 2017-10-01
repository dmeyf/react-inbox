import React from 'react'
import PropTypes from 'prop-types'
import {withRouter, Link, Route} from 'react-router-dom'
import MessageContents from './MessageContents'

const Message = ({message, starMessage, selectMessage, readMessage}) => {
    return (
        <div className={"row message " + (message.read ? "read " : "unread ")
        + (message.selected ? "selected" : "")}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input name="selected" type="checkbox" checked={!!message.selected}
                               onChange={selectMessage}
                        />
                    </div>
                    <div className="col-xs-2">
                        <i className={"star fa " + (message.starred ? "fa-star" : "fa-star-o")}
                           onClick={starMessage}></i>
                    </div>
                </div>
            </div>
            <Link to={`/messages/${message.id}`}>
                <div className="col-xs-11">
                    {message.labels.map((label, i) => {
                        return <span key={i} className="label label-warning">{label}</span>
                    })}
                    {message.subject}
                </div>
            </Link>
            <Route path={`/messages/${message.id}`}
                   render={() => (<MessageContents readMessage={readMessage} id={message.id}/>)}/>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.object,
    starMessage: PropTypes.func,
    selectMessage: PropTypes.func,
}

export default withRouter((Message))
