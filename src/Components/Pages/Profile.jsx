import React, { Component } from 'react';
import Appointments from '../Subcomponents/Appointments'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { LOCAL_HOST } from '../../constants'

class Profile extends Component {

  state = {
    goatId: '5d9e49838f8d24000e68d75c',
    user: {
      reviews: [
        "5d9e8a6528faea00042a014b"
      ],
      appointments: [],
      _id: "5d9d55b9813f7d000470d3e2",
      firstname: "Gabe",
      lastname: "Toledo",
      email: "gtoledo342@gmail.com",
    },
    redirect: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/chat',
        state: { recipient: this.state.goatId, user: this.state.user._id }
      }} />
    }
  }
  render() {
    console.log(this.state.user._id)
    return (
      <div>
        <div>Profile
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="submit-chat">Chat with me!</label>
            <input id="submit-chat" type="submit" />
          </form>
          {this.renderRedirect()}
        </div>
        <div>Profile
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="submit-chat">Chat with me!</label>
            <input id="submit-chat" type="submit"/>
          </form>
          {this.renderRedirect()}
        </div>
      </div>
<<<<<<< HEAD
=======

>>>>>>> 696ad3bd73ccbc6b309850a09a827583a8d9d8a6
    );
  }
}

export default Profile;
