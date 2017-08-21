import React, {Component} from 'react'

class Message extends Component {

    state = {
        starred: this.props.message.starred,
        selected: this.props.message.selected,
    }

    starHandler = () => {
        this.setState({starred: !this.state.starred})
    }

    selectHandler = () => {
        this.setState({selected: !this.state.selected})
    }

    render() {
        return (
            <div className={"row message " + (this.props.message.read ? "read " : "unread ")
            + (this.state.selected ? "selected" : "")}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" defaultChecked={this.state.selected}
                                   onChange={this.selectHandler}
                            />
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
