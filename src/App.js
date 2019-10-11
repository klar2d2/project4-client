
import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Subcomponents/Nav';
import Content from './components/Content';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 13254,
      goatId: 43253,
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
      axios.get(`https://peaceful-escarpment-58515.herokuapp.com/auth/current/user`, {
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
        </div>
      </Router>
    );
  }
}

export default App;
