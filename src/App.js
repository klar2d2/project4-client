
import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Subcomponents/Nav';
import Content from './Components/Content';
import axios from 'axios'
import {CURRENT_USER} from './constants'
import Footer from './Components/Subcomponents/Footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
      user: null
    };
  }

    componentDidMount() {
      this.getUser()
    }

  getUser = () => {
    //see if theres a token
    let token = localStorage.getItem('mernToken')
    //If theres a token, try to use it ot get the user info
    if (token) {
      axios.get(CURRENT_USER, {
        headers: {'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
    else {
      this.setState({ user: null })
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav refreshUser={this.getUser} user={this.state.user} />
          <Content user={this.state.user} refreshUser={this.getUser} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
