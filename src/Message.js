import React, {Component} from 'react'

class Message extends Component {

    state = {starred: this.props.message.starred}

    starHandler = () => {
        this.setState({starred: !this.state.starred})
    }

    render() {
        return (
            <div className={"row message " + (this.props.message.read ? "read " : "unread ")
            + (this.props.message.selected ? "selected" : "")}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={this.props.message.selected}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={"star fa " + (this.state.starred ? "fa-star" : "fa-star-o")}
                            onClick={this.starHandler}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <span className="label label-warning">dev</span>
                    <span className="label label-warning">gschool</span>
                    {this.props.message.subject}
                </div>
            </div>
        )
    }
}

export default Message
