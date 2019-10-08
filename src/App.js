import React from 'react';
import './App.css';
import Chat from './components/Chat'


class App extends React.Component {
  state = {
    userId: 13254, 
    goatId: 43253
  }

  render() {

    return (
      <div className="App">
        <Chat userId={this.state.userId} goatId = {this.state.goatId}/>
      </div>
    );
  }
}

export default App;
