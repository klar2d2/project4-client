import React, { Component } from 'react';
import moment from 'moment';
import Calendar from '../Subcomponents/Calendar';
import Reviews from '../Subcomponents/Reviews';
import axios from 'axios'
import {CREATE_APPOINTMENT, GET_GOATS_APPOINTMENTS} from '../../constants'
class Goat extends Component {
  state = {
    date: '',
    goatId: '',
    goatName: '',
    clientId: '',
    location: '',
    appointments: []
  }

  getAppointments = () => {
    axios.get(GET_GOATS_APPOINTMENTS)
    .then(response => {
      console.log(response.data)
      this.setState({appointments: response.data})
    })
  }

  submitAppointments = (e) => {
    e.preventDefault()
    axios.post(CREATE_APPOINTMENT, this.state)
    .then(response => {
      console.log("Apppointment created with", this.state)
    })
    .catch(err => {
      console.log('Error in the create Appointment route', err)
    })
  }

  componentDidMount() {
    this.getAppointments()
  }

  render() {


    return(
      <div>
        <div className='profile-container-left'>
          {/* <h2>{this.props.user.firstname}</h2>
          <h2>{this.props.user.lastname}</h2>
          <h2>{this.props.user.email}</h2> */}
        </div>
        <Calendar appointments={[moment(), moment().add(10, 'days')]} />
        <Reviews />
      </div>
    );
  }
}

export default Goat;
