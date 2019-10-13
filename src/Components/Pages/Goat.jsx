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
    const oneGoat = this.props.location.state.oneGoat
    console.log(oneGoat)
    this.getAppointments()
  }

  render() {


    return(
      <div>
        <div className='profile-container-left'>
          <h1>{this.props.location.state.oneGoat.firstname}</h1>
          <h2>{this.props.location.state.oneGoat.email}</h2>
          <h2>{this.props.location.state.oneGoat.phone}</h2>
        </div>
        <Calendar goat={this.props.location.state.oneGoat} appointments={[moment(), moment().add(10, 'days')]} />
        <Reviews user={this.props.location.state.user} goat={this.props.location.state.oneGoat} />
      </div>
    );
  }
}

export default Goat;
