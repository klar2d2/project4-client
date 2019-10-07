import React, { Component } from 'react';


class Chat extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let text = this.refs.messageText.value;
        this.props.actions.send(text);
    }
    render() {
        return (
            <div className="chat-container">
                <form method="POST" onSubmit={this.handleSubmit}>
                    <input type="text" name="message" ref="messageText"/>
                    <button>Submit</button>
                </form>
               
            </div>
        )
    }
}

export default Chat
