import React, { Component } from 'react';
import moment from 'moment';
import Calendar from '../Subcomponents/Calendar';
import Reviews from '../Subcomponents/Reviews';
class Goat extends Component {
  render(){
    return(
      <div>
        <Calendar appointments={[moment(), moment().add(10, 'days')]} />
        <Reviews />
      </div>
    );
  }
}

export default Goat;