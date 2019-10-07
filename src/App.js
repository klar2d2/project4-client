import React from 'react';
import './App.css';
import Chat from './components/Chat'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: sock,
      messages: []
  }

    const sock = new SockJS('https://localhost:3000');

    sock.onopen = () => {
        console.log('connection open');
    };

    sock.onmessage = e => {
        console.log('message recieved:', e.data);
    }

    sock.onclose = () => {
        console.log('close')
    }

}
  render() {
    return (
      <div className="App">
        <Chat />
      </div>
    );
  }
}

export default App;
