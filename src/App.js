
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
 
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Subcomponents/Nav';
import Content from './Components/Content';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Content />
        </div>
      </Router>
    );
  }
}

export default App;
