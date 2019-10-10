import React, { Component } from 'react';


class GoatDisplay extends Component {
  render() {
    console.log(this.props.goat)
    return (
      <div>{this.props.goat.firstname}</div>
    );
  }
}

export default GoatDisplay;