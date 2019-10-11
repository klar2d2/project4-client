import React, { Component } from 'react';


class GoatDisplay extends Component {
  render() {
    return (
      <div className="goat-card">
        <img src={this.props.goat.profilePic} 
             className="goat-avatar"
             alt={this.props.goat.firstname}/>
        <div>
          <h4>{this.props.goat.firstname}</h4>
          <h5>{this.props.goat.rating || '4/5'}</h5>
        </div>

      </div>
    );
  }
}

export default GoatDisplay;