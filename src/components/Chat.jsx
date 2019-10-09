import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios'
import SERVER_URL from '../constants'

class Chat extends Component {
    constructor(props) {
        super(props);
        const goatId = this.props.goatId
        
        this.state = {
          messages: [], 
          input: '',
          socket: io(`localhost:3001/${goatId}`),
          notify: ''
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
        this.state.socket.on('is typing', (userId) => {
            this.setState({
                notify: `${userId} is typing`
            })
        })
        this.callMessageDb(this.props.userId, this.props.goatId)
    }

    callMessageDb = (userId, goatId) => {
        axios.get(`${SERVER_URL}/message`, {
            userId, 
            goatId
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
        this.state.socket.emit('add message', this.state.input, this.props.userId, this.props.goatId)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.state.socket.emit('is typing', this.props.userId)
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
                    <div className="message-display">
                        {messagesDiv}
                        <div className="chat-notify">
                        <p><em>{this.state.notify}</em></p>
                        </div>
                    </div>
                    <div className="chat-submit-form">
                        <form onSubmit = { this.formOnSubmit }>
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
