
import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Subcomponents/Nav';
import Content from './Components/Content';
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

  getUser = () => {
    //see if theres a token
    let token = localStorage.getItem('mernToken')
    //If theres a token, try to use it ot get the user info
    if (token) {
      axios.get(`https://peaceful-escarpment-58515.herokuapp.com/auth/current/user`, {
        headers: {'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data.user)
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
    else {
      this.setState({ user: null })
    }
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav refreshUser={this.getUser} />
          <Content user={this.state.user} refreshUser={this.getUser} />
        </div>
      </Router>
    );
  }
}

export default App;
