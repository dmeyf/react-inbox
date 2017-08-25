import React, {Component} from 'react';

class Toolbar extends Component {

    selectAllStyleHandler = () => {
        const selectedMessages = this.props.messages.filter(message => message.selected).length
        if (selectedMessages === 0) {
            return "fa fa-square-o"
        }
        if (selectedMessages === this.props.messages.length) {
            return "fa fa-check-square-o"
        }
        return "fa fa-minus-square-o"
    }

    unreadMessageCountHandler = () => {
        return this.props.messages.filter(message => !message.read).length
    }

    unreadMessageTextHandler = () => {
        if (this.props.messages.filter(message => !message.read).length === 1) {
            return "unread message"
        }
        return "unread messages"
    }

    actionDisabledHandler = () => {
        if (this.props.messages.filter(message => message.selected).length === 0) {
            return true
        }
    }

    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.unreadMessageCountHandler()}</span>
                        {this.unreadMessageTextHandler()}
                    </p>

                    <button className="btn btn-default" onClick={() => this.props.selectAllHandler()}>
                        <i className={this.selectAllStyleHandler()}></i>
                    </button>

                    <button className="btn btn-default" disabled={this.actionDisabledHandler()}
                            onClick={() => this.props.markAsRead()}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" disabled={this.actionDisabledHandler()}
                            onClick={() => this.props.markAsUnread()}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" value="Apply label"
                            disabled={this.actionDisabledHandler()}
                            onChange={(e) => this.props.applyLabel(e)}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select disabled" value="Apply label"
                            disabled={this.actionDisabledHandler()}
                            onChange={(e) => this.props.removeLabel(e)}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" disabled={this.actionDisabledHandler()}
                            onClick={() => this.props.deleteMessage()}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar;
