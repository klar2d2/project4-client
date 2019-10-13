import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios'
import { LOCALHOST, SERVER } from '../../constants'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            input: '',
            notify: '',
            socket: '',
        }
        this.socket = null;
    }
    
    componentDidMount() {
        console.log(this.props.user)
        let recipient;
        let user;
        if (this.props.user.isGoat) {
            recipient = this.props.user._id
            user = this.props.recipient
        }
        else {
            user = this.props.user._id
            recipient = this.props.recipient
        }
        this.callMessageDb(user, recipient) 
        this.socket = io(LOCALHOST, { query: `room=${user}-${recipient}`});
        this.socket.on('add message', (mssg) => {
            let messageArray = this.state.messages;
            messageArray.push(mssg)
            this.setState({
                messages: messageArray,
                notify: ''
            })
        })
        this.socket.on('is typing', (currentUser) => {
            this.setState({
                notify: `${currentUser} is typing`
            })
        })
    }
    componentWillUnmount(){
        console.log('I moved away babay')
        this.socket.emit('end')
    }


    callMessageDb = (currentUser, recipient) => {
        console.log(currentUser, recipient)
        axios.get(LOCALHOST + `/message/${currentUser}/${recipient}`)
        .then(response => {
            console.log(response);
            let messageArray = this.state.messages;
            for (let i = 0; i < response.data.length; i++) {
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
        console.log(this.props.recipient, this.props.user._id)
       if(this.state.input !== ""){
           this.socket.emit('add message', this.state.input, this.props.user._id, this.props.recipient)
       }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.socket.emit('is typing', this.props.user)
    }

    render() {

        let messagesDiv = this.state.messages.map((text, idx) => {
            return (
                <div className="all-messages" key={idx}>
                    <div className="message-block">{text}</div>
                </div>
            )
        })
        return (
            <div className="chat-container">
                <div style={{ textAlign: 'center' }}>
                    <div className="message-display">
                        {messagesDiv}
                        <div className="chat-notify">
                            <p><em>{this.state.notify}</em></p>
                        </div>
                    </div>
                    <div className="chat-submit-form">
                        <form onSubmit={this.formOnSubmit}>
                            <label htmlFor="chat-sender">User Name</label>
                            <input id="chat-sender" type="hidden" name="chat-sender" />
                            <input id="chat-input" type="text" name="input" onChange={this.handleChange} placeholder="type a message..."/>
                            <input className="btn" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
