import React, { Component, Suspense } from 'react';
import Appointments from '../Subcomponents/Appointments'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { LOCAL_HOST } from '../../constants'
import moment from 'moment'

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

  componentDidMount() {
    this.props.refreshUser()
  }

  render(){
    if (!this.props.user) {
      return(<Redirect to='/' />)
    }
    return(
      <div>
        <div className='profile-container'>
          <div className='profile-container-left'>
            <h2>{this.props.user.firstname}</h2>
            <h2>{this.props.user.lastname}</h2>
            <h2>{this.props.user.email}</h2>
          </div>
          <div className='profile-countainer-right' >
            <Appointments
              user={this.props.user}
            />
          </div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="submit-chat">Chat with me!</label>
            <input id="submit-chat" type="submit"/>
          </form>
          {this.renderRedirect()}
        </div>
      </div>
    );
  }
}

export default Profile;
