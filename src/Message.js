import React, { Component } from 'react';

class Message extends Component {

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
        <i className={"star fa " + (this.props.message.starred ? "fa-star" : "fa-star-o")}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
  <span className="label label-warning">dev</span>
    <span className="label label-warning">gschool</span>
      {this.props.message.subject}
  </div>
</div>
    );
  }
}

export default Message;
