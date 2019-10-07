import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:3001', 
      message: []
    }
}

send = () => {
  const socket = socketIOClient(this.state.endpoint);
  socket.emit('add message', this.state.message)
}

setMessage = (message) => {
  this.setState({ message })
}

componentDidMount = () => {
  const socket = socketIOClient(this.state.endpoint);
  setInterval(this.send(), 1000)
  socket.on('add message', (mssg) => {
    document.body.style.backgroundColor = mssg
  })
}
  render() {

    const socket = socketIOClient(this.state.endpoint)
    socket.on('add message', (mssg) => {
      document.body.style.backgroundColor = mssg;
    })

    let messagesDiv = this.state.message.map((m, idx) => {
      return (
        <div key={idx}>
          {m.message}
        </div>
      )
    })

    return (
      <div className="App">
        <div style={{ textAlign: 'center'}}>
          {messagesDiv}
          <form onSubmit = { () => this.send()}>
            <input type="text" ref="message-text"/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
