import React from 'react';
import './App.css';
import Chat from './components/Chat'
import Sockjs from 'sockjs-client';

class App extends React.Component {
  constructor(props) {
    super(props);


    const sock = new Sockjs('https://localhost:3000');

    sock.onopen = () => {
        console.log('connection open');
    };

    sock.onmessage = e => {
        console.log('message recieved:', e.data);
    }

    sock.onclose = () => {
        console.log('close')
    }

    this.state = {
      actions: sock,
      messages: []
  }
}
  render() {
    return (
      <div className="App">
        <Chat {... this.state }/>
      </div>
    );
  }
}

export default App;
