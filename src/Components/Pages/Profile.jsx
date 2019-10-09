import React, { Component } from 'react';
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
      <div>Profile
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="submit-chat">Chat with me!</label>
          <input id="submit-chat" type="submit"/>
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Profile;