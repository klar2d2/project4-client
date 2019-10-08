import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:3001', 
      messages: ['Enter text here'], 
      input: ''
  }
}

formOnSubmit = (e) => {
  e.preventDefault();
  let messageArray = this.state.messages;
  messageArray.push(e.target.value)
  this.setState({
    input: e.target.value,
  })
  const socket = socketIOClient(this.state.endpoint);
  socket.emit('add message', this.state.input)
}

setMessages = () => {
  
}

componentDidUpdate(prevProps, prevState) {
  if (this.state.messages !== prevState.messages) {
      this.setMessages();
  }
}


  render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('add message', (mssg) => {
      console.log(mssg)
    })
    
    let messagesDiv = this.state.messages.map((text, idx) => {
      return (
        <div key={idx}>
          <p>{text}</p>
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
