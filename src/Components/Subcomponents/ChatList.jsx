import React, { Component } from 'react'
import axios from 'axios';
import {LOCALHOST} from '../../constants'

class ChatList extends Component {

    state = {
        userId: this.props.user._id
    }

    componentDidMount(){
        axios.get(LOCALHOST + 'chatlist', {
            userId: this.state.userId
        })
        .then(response => {
            console.log(response)
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
