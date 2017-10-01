import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {
    fetchMessageBody
} from '../actions/messagesActions'

class MessageContents extends Component {

    componentDidMount() {
        this.props.readMessage()
        this.props.fetchMessageBody(this.props.id)
    }

    render() {
        return (
            <div className="row message-body">
                <div className="col-xs-11 col-xs-offset-1">
                    {this.props.messageBody}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messageBody: state.composeMessage.messageBody
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMessageBody,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageContents))
