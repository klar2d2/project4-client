import React, { Component } from 'react';
import Appointments from '../Subcomponents/Appointments'

class Profile extends Component {
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
      </div>
    );
  }
}

export default Profile;
