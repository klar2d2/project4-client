import React, { Component } from 'react';
import Sockjs from 'sockjs-client';

class Chat extends Component {

    render() {
        return (
            <div className="chat-container">
                <form method="POST" onSubmit={this.handleSubmit}>
                    <input type="text"/>
                    <button>Submit</button>
                </form>
               
            </div>
        )
    }
}

export default Chat
