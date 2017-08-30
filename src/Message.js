import React from 'react'
import PropTypes from 'prop-types'

const Message = ({message, starHandler, selectHandler}) => (
    <div className={"row message " + (message.read ? "read " : "unread ")
    + (message.selected ? "selected" : "")}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input name="selected" type="checkbox" checked={!!message.selected}
                           onChange={() => selectHandler(message.id)}
                    />
                </div>
                <div className="col-xs-2">
                    <i className={"star fa " + (message.starred ? "fa-star" : "fa-star-o")}
                       onClick={() => starHandler(message.id)}></i>
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {message.labels.map((label,i) => {
                return <span key={i} className="label label-warning">{label}</span>})}
            {message.subject}
        </div>
    </div>
)

Message.propTypes = {
    message: PropTypes.object,
    starHandler: PropTypes.func,
    selectHandler: PropTypes.func,
}

export default Message
