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
            console.log(mssg)
        })
        this.callMessageDb(this.props.userId, this.props.goatId)
    }

    callMessageDb = (userId, goatId) => {
        axios.get('/messages', {
            userId,
            goatId
        })
        .then(response => {
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
        let messageArray = this.state.messages;
        messageArray.push(this.state.input)
        this.state.socket.emit('add message', this.state.input, this.props.userId, this.props.goatId)
    }

    updateReciever = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
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
