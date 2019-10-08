 
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
