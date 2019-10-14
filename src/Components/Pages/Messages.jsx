import React, { Component } from 'react';
import Chat from '../Subcomponents/Chat'
import ChatList from '../Subcomponents/ChatList'
class Messages extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      user: props.location.state.user,
      recipient: ''
    }
  }

  componentDidMount(){
    if(this.props.location.state.recipient){
      this.setState({recipient: this.props.location.state.recipient})
    }
    console.log(this.props.location.state.user)
    console.log('This is the goat man!', this.props.location.state.recipient)
  }

  updateRecipient = () => {
    this.setState({recipient: this.props.location.state.recipient})
  }

  render(){
    console.log(this.state)
    return(
      <div className="messages">
        <div className="chat-app">
          <div className="chat-wrap">
            <Chat recipient={this.state.recipient} user={this.state.user}/>
            <ChatList user={this.state.user} updateRecipient={this.updateRecipient}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;