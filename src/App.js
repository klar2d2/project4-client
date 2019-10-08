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
  messageArray.push(this.state.input)
  
  const socket = socketIOClient(this.state.endpoint);
  socket.emit('add message', this.state.input)
}


handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  })
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
            <input type="text" name="input" onChange={ this.handleChange }/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
