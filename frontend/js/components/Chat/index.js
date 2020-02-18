import React, {Component} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { connect } from 'react-redux';
import { socketActions } from '../../redux/actions/SocketActions';


class Chat extends Component {

  constructor() {
    super();
    //this.props.socket.addResponse(data => this.handleResponseMessage(data));
  }

  componentDidMount() {
  }

  handleResponseMessage = (message) => {
    console.log(`Got message: ${message}`);
    //addResponseMessage(message);
  }

  handleNewUserMessage = (message) => {
    console.log(`New user message sent: ${message}`);
    this.props.socket.sendPacked({
        'command': 'chat',
        'message': message
    });
  }

  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title={null}
        subtitle={null}
        addResponseMessage
      />
    );
  }
}

function mapStateToProps (state) {
  const user = state.user.currentUser;
  const socket = state.socket.socket;
  return { user, socket };
}

const actionCreators = {

}

export default connect(mapStateToProps, actionCreators)(Chat);
