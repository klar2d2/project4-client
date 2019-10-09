import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker  } from 'react-dates';
import moment from 'moment';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null
    }
  }

  onDateChange = ( date ) => this.setState({ date })

  onFocusChange = ( focused ) => this.setState(focused)

  isDayBlocked = (day) => this.props.appointments.filter(d => d.isSame(day, 'day')).length > 0

  render() {
    return (
      <SingleDatePicker
        isDayBlocked={this.isDayBlocked}
        date={this.state.date}
        onDateChange={this.onDateChange}
        focused={this.state.focused}
        onFocusChange={this.onFocusChange}
        id="calendar"
      />
    );
  }
}

export default Calendar;