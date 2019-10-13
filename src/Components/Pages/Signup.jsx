import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom";
import {SIGNUP} from '../../constants'

class Signup extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    message: '',
    isGoat: false,
    phone: ''
  }

  submitSignup= (e) => {
    e.preventDefault();
    console.log(this.state)
    axios.post(SIGNUP, this.state)
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
      return(<Redirect to='/' />)
    }
    return(
      <div>
        Signup
        <form className="signup-form" onSubmit={this.submitSignup}>
          <input type='text' name='firstname' placeholder='firstname'  onChange={(e) => this.setState({ firstname: e.target.value, message: '' })}/>
          <input type='text' name='lastname' placeholder='lastname'  onChange={(e) => this.setState({ lastname: e.target.value, message: '' })}/>
          <input type='text' name='phone' placeholder='phone'  onChange={(e) => this.setState({ firstname: e.target.value, message: '' })}/>
          <input type='text' name='email' placeholder='email' onChange={(e) => this.setState({ email: e.target.value, message: '' })}/>
          <input type='radio' name='isGoat' checked='checked' onChange={(e) => this.setState({ isGoat: false , message: '' })} />Client
          <input type='radio' name='isGoat' onChange={(e) => this.setState({ isGoat: true , message: '' })} />Goat
          <input type='password' name='password' placeholder='password' onChange={(e) => this.setState({ password: e.target.value, message: '' })}/>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default Signup;
