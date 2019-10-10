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
            socket: '',
            notify: '',
        }
    }

    componentDidMount() {
        let goatId
        let userId
        if (this.props.location.state.user.isGoat) {
            goatId = this.props.location.state.user._id
            userId = this.props.location.state.recipient
        }
        else {
            userId = this.props.location.state.user._id
            goatId = this.props.location.state.recipient
        }
        console.log(goatId, userId)
        axios.post(SERVER + `/chat`, { userId, goatId })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        const socket = io(`${SERVER}/${userId}-${goatId}`)
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
        this.callMessageDb(this.props.location.state.user._id, this.props.location.state.recipient)
        this.setState({socket})
    }

    callMessageDb = (currentUser, recipient) => {
        axios.get(SERVER + '/message', {
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
        console.log(this.props.location.state.user)
        this.state.socket.emit('add message', this.state.input, this.props.location.state.user, this.props.location.state.recipient)
        this.setState({
            tag: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            tag: true
        })
        this.state.socket.emit('is typing', this.props.location.state.user)
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
