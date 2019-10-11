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
    }
    componentWillUnmount(){

    }

    componentDidMount() {
        let recipient;
        let user;
        // console.log(this.props.user)
        if (this.props.user.isGoat) {
            recipient = this.props.user._id
            user = this.props.recipient
        }
        else {
            user = this.props.user._id
            recipient = this.props.recipient
        }
        console.log(recipient, user)
        axios.post(LOCALHOST + `chat`, { user, recipient })
            .then(response => {
                console.log(response)
                const socket = io(`${LOCALHOST}${user}-${recipient}`, {'forceNew':false, reconnection: true});
                socket.on('add message', (mssg) => {
                    let messageArray = this.state.messages;
                    messageArray.push(mssg)
                    this.setState({
                        messages: messageArray,
                        notify: ''
                    })
                })
                socket.on('is typing', (currentUser) => {
                    this.setState({
                        notify: `${currentUser} is typing`
                    })
                })
                this.callMessageDb(this.props.user._id, this.props.recipient)
                this.setState({socket})
            })
            .catch(err => {
                console.log(err)
            })
           
    }

    callMessageDb = (currentUser, recipient) => {
        axios.get(LOCALHOST + 'message', {
            currentUser,
            recipient
        })
            .then(response => {
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
       
        this.state.socket.emit('add message', this.state.input, this.props.user._id, this.props.recipient)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        this.state.socket.emit('is typing', this.props.user)
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
                            <input id="chat-input" type="text" name="input" onChange={this.handleChange} />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
