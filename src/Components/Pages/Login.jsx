import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom";
import {LOGIN} from '../../constants'


class Login extends Component {

  state = {
    email: '',
    password: '',
    message: ''
  }

  submitLogin = (e) => {
    e.preventDefault();
    console.log(this.state)
    axios.post(LOGIN, this.state)
    .then((response) => {
      localStorage.setItem("mernToken", response.data.token);
      this.props.refreshUser();
      return(response);
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.dir(err);
    });
  }


  render(){
    if (this.props.user) {
      return(<Redirect to='/browse' />)
    }
    return(
      <div>
        <form className="login-form" onSubmit={this.submitLogin}>
          <h3>Login</h3>
          <input type='text' name='email' placeholder='email' onChange={(e) => this.setState({ email: e.target.value, message: '' })}/>
          <input type='password' name='password' placeholder='password' onChange={(e) => this.setState({ password: e.target.value, message: '' })}/>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default Login;
