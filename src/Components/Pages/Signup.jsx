import React, { Component } from 'react';
import axios from 'axios'

class Signup extends Component {

  state = {
    email: '',
    password: '',
    message: ''
  }

  submitLogin= (e) => {
    e.preventDefault();
    console.log(this.state)
    axios.post('https://peaceful-escarpment-58515.herokuapp.com/auth/login', this.state)
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
    return(
      <div>
        Signup
        <form className="signup-form" onSubmit={this.submitSignup}>
          <input type='text' name='email' placeholder='email' onChange={(e) => this.setState({ email: e.target.value, message: '' })}/>
          <input type='password' name='password' placeholder='password' onChange={(e) => this.setState({ password: e.target.value, message: '' })}/>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default Signup;
