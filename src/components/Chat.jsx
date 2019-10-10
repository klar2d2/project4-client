import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios'
import SERVER from '../constants'
import LOCAL_HOST from '../constants'

class Chat extends Component {
    constructor(props) {
        super(props);
        let recipient = this.props.location.state.recipient;
        let currentUser = this.props.location.state.currentUser;
        this.state = {
          messages: [], 
          input: '',
          socket: io(`${LOCAL_HOST}/${recipient}-${currentUser}`),
          notify: '', 
      }
    }

    componentDidMount(){
        this.state.socket.on('add message', (mssg) => {
            let messageArray = this.state.messages;
            messageArray.push(mssg)
            this.setState({
                messages: messageArray, 
                notify: ''
            })
        })
        this.state.socket.on('is typing', (currentUser) => {
            this.setState({
                notify: `${currentUser} is typing`
            })
        })
        this.callMessageDb(this.props.location.state.currentUser, this.props.location.state.recipient)
    }

    callMessageDb = (currentUser, recipient) => {
        axios.get(LOCAL_HOST + 'message', {
            currentUser, 
            recipient
        })
        .then(response => {
            let messageArray = this.state.messages;
            for(let i = 0; i < response.data.length; i++){
                messageArray.push(response.data[i].message)
            }
            this.setState({
                messages: messageArray
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    formOnSubmit = (e) => {
        e.preventDefault();
        this.state.socket.emit('add message', this.state.input, this.props.location.state.currentUser, this.props.location.state.recipient)
        this.setState({
            tag: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            tag: true
        })
        this.state.socket.emit('is typing', this.props.location.state.currentUser)
    }
    
    render() {

    let messagesDiv = this.state.messages.map((text, idx) => {
      return (
        <div className="all-messages" key={idx}>
          <div>{text}</div>
        </div>
      )
    })
        return (
            <div className="chat-container">
                
                <div style={{ textAlign: 'center'}}>
                    <div className="message-display">
                        {messagesDiv}
                        <div className="chat-notify">
                        <p><em>{this.state.notify}</em></p>
                        </div>
                    </div>
                    <div className="chat-submit-form">
                        <form onSubmit = { this.formOnSubmit }>
                            <label htmlFor="chat-sender">User Name</label>
                            <input id="chat-sender" type="hidden" name="chat-sender" value={this.props.currentUser}/>
                            <input id="chat-input" type="text" name="input" onChange={ this.handleChange }/>
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
