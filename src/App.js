
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Subcomponents/Nav';
import Content from './components/Content';

class App extends React.Component {
  state = {
    userId: 13254, 
    goatId: 43253,
    date: null,
    focused: null,
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
