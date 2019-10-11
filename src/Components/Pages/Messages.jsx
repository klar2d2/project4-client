import React, { Component } from 'react';
import Chat from '../Subcomponents/Chat'
import ChatList from '../Subcomponents/ChatList'
class Messages extends Component {

state = {
  user: this.props.location.state.user,
  recipient: this.props.location.state.recipient
}

  render(){
    return(
      <div>
        <div>Munch My Lawn Messages</div>
        <div className="chat-app">
          <ChatList user={this.state.user}/>
          <Chat recipient={this.state.recipient} user={this.state.user}/>
        </div>
      </div>
    );
  }
}

export default Messages;