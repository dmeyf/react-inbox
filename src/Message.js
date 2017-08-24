import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Message extends Component {

    labels = (
        this.props.message.labels.map((label,i) => {
            return <span key={i} className="label label-warning">{label}</span>})
    )

    render() {
        return (
            <div className={"row message " + (this.props.message.read ? "read " : "unread ")
            + (this.props.message.selected ? "selected" : "")}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input name="selected" type="checkbox" checked={!!this.props.message.selected}
                                   onChange={() => this.props.selectHandler(this.props.message.id)}
                            />
                        </div>
                        <div className="col-xs-2">
                            <i className={"star fa " + (this.props.message.starred ? "fa-star" : "fa-star-o")}
                               onClick={() => this.props.starHandler(this.props.message.id)}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {this.labels}
                    {this.props.message.subject}
                </div>
            </div>
        )
    }
}

Message.propTypes = {
    starHandler: PropTypes.func,
    selectHandler: PropTypes.func,
}

export default Message
