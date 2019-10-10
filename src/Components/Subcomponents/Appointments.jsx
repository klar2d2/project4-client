import React, { Component } from 'react';
import moment from 'moment'

class Appointments extends Component {
  render(){
    let appointments;
    if (this.props.user.appointments.length === 0) {
      appointments = <h1>No Upcoming Appointments</h1>
    }
    else {
      appointments = <h1>Appointments</h1>
                        {this.props.user.appointments.map((appointment, i) => (
                          <div className="appointments-individual">
                            <h1>Appointment scheduled at {moment().format(appointment.date)} with {appointment.goatName}</h1>
                          </div>
      ))}
    }
    return(
      <div className="appointments-container">
        {appointments}
      </div>
    );
  }
}

export default Appointments;
