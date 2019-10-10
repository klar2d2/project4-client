import React, { Component } from 'react';
import Appointments from '../Subcomponents/Appointments'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import LOCAL_HOST from '../../constants'

class Profile extends Component {

  state = {
    goatId: 12345,
    userId: 54321, 
    redirect: false
  }

  componentDidMount(){
    console.log(LOCAL_HOST + '/chat')
    axios.post(LOCAL_HOST + `/chat`, this.state)
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
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
        state: { goatId: `${this.state.goatId}`, userId: `${this.state.userId}` }
    }} />
    }
  }
  render(){
    return(
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
        <div>Profile
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
