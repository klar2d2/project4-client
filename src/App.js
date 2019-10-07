 
import React, { Component } from 'react';
import './App.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker } from 'react-dates';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
    };
  }

  render() {
    return (
      <div className="App">
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          id="your_unique_id"
        />
      </div>
    );
  }
}

export default App;