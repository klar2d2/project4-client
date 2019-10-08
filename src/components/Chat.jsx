import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import axios from 'axios'

class Chat extends Component {
    constructor() {
        super();
        this.state = {
          messages: ['Enter text here'], 
          input: '',
          socket: socketIOClient('localhost:3001'),
      }
    }

    componentDidMount(){
        this.state.socket.on('add message', (mssg) => {
            let messageArray = this.state.messages;
            messageArray.push(mssg)
            this.setState({
                messages: messageArray
            })
        })
        this.callMessageDb(this.props.userId, this.props.goatId)
    }

    callMessageDb = (userId, goatId) => {
        axios.get('/message', {
            userId,
            goatId
        })
        .then(response => {
            console.log(response)
            this.setState({
                messages: response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    formOnSubmit = (e) => {
        e.preventDefault();
        
        this.state.socket.emit('add message', this.state.input, this.props.userId, this.props.goatId)
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.state.socket.emit('is typing', this.state.userId)
    }

    render() {
 
    let messagesDiv = this.state.messages.map((text, idx) => {
      return (
        <div key={idx}>
          <p>{text}</p>
        </div>
      )
    })
        return (
            <div className="chat-container">
                <div style={{ textAlign: 'center'}}>
                {messagesDiv}
                <form onSubmit = { this.formOnSubmit }>
                    <input type="text" name="input" onChange={ this.handleChange }/>
                    <input type="submit"/>
                </form>
                </div>
            </div>
        )
    }
}


export default Chat
