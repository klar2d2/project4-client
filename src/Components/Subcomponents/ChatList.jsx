import React, { Component } from 'react'
import axios from 'axios';
import {LOCALHOST} from '../../constants'

class ChatList extends Component {

    state = {
        userId: this.props.user._id, 
        chats: []
    }

    componentDidMount(){
        axios.get(LOCALHOST + 'message/:userId')
        .then(response => {
            console.log(response)
            this.setState({
                chats: response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="chat-list">
                This is my Chat List
            </div>
        )
    }
}

export default ChatList
