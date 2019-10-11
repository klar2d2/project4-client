import React, { Component } from 'react';
import moment from 'moment'
import Calendar from './Calendar'

class Appointments extends Component {
  render(){
    let appointments;
    if (this.props.user.appointments.length === 0) {
      appointments = <h1>No Upcoming Appointments</h1>
    }
    else {
      appointments =
      <div>
        <h1>Appointments</h1>
        {this.props.user.appointments.map((appointment, i) => (
          <div className="appointments-individual">
            <h1>Appointment scheduled at {moment().format(appointment.date)} with {appointment.goatName}</h1>
          </div>
        ))}
        <Calendar
          appointments={[moment(), moment().add(10, 'days')]}
        />
      </div>
    }
    return(
      <div className="appointments-container">
        {appointments}
      </div>
    );
  }
}

export default Appointments;
