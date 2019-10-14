import React, { Component } from 'react';
import moment from 'moment';
import Calendar from '../Subcomponents/Calendar';
import Reviews from '../Subcomponents/Reviews';
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {CREATE_APPOINTMENT, GET_GOATS_APPOINTMENTS, SERVER, LOCALHOST} from '../../constants'
class Goat extends Component {
  state = {
    date: '',
    goatId: this.props.location.state.oneGoat._id || '',
    goatName: this.props.location.state.oneGoat.firstname || '',
    clientId: this.props.location.state.user._id || '',
    location: '',
    appointments: [],
    user: this.props.location.state.user,
    redirect: false
  }

  componentDidMount() {
    console.log(this.props)
    this.getCurrentGoat();
    // this.getAppointments()

  }

  getCurrentGoat = () => {
  axios.get(SERVER + `/goat/${this.props.goatId}`)
    .then(response => {
      console.log(response.data.user)
      this.setState({
        goatId: response.data.user._id
      })
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

  // renderRedirect = () => {

  //   if (this.state.redirect) {
  //     return <Redirect to={{
  //       pathname: '/messages',
  //       state: { recipient: this.state.goatId, user: this.props.user }
  //     }} />
  //   }
  // }

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
      console.log("Appointment created with", this.state)
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
    console.log(this.state)

    return(
      <div className="goat">
        <div className='profile-container-left'>
          {/* <h2>{this.props.user.firstname}</h2>
          <h2>{this.props.user.lastname}</h2>
          <h2>{this.props.user.email}</h2> */}
        </div>
        <Calendar appointments={[moment(), moment().add(10, 'days')]} />
        <Reviews user={this.state.user} goat={this.props.location.state.oneGoat}/>
        <Link to={{
          pathname: '/messages',
          state: {recipient: this.state.goatId,
                  user: this.props.location.state.user
                 }
          }}>Chat with me Here</Link>
      </div>

    );
  }
}

export default Goat;
