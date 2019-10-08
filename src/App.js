import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:3001', 
      messages: [], 
      input: ''
  }
}

formOnSubmit = (e) => {
  e.preventDefault();
  let messageArray = this.state.messages;
  messageArray.push(e.target.value)
  this.setState({
    input: e.target.value
  })
  const socket = socketIOClient(this.state.endpoint);
  socket.emit('add message', this.state.input)
}

  render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('add message', (mssg) => {
      console.log(mssg)
    })

    let messagesDiv = this.state.message.map((text, idx) => {
      return (
        <div key={idx}>
          {text}
        </div>
      )
    })

    return (
      <div className="App">
        <div style={{ textAlign: 'center'}}>
          {messagesDiv}
          <form onSubmit = { this.formOnSubmit }>
            <input type="text" ref="message-text" name="message-text"/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
