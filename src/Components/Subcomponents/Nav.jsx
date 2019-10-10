import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mernToken");
    this.props.refreshUser();
  }

  render(){
    return(
      <nav>
        <span>
          <Link to="/">MunchMyLawn</Link>
        </span>
        <span>
          <Link to="/browse">Browse</Link>
        </span>
        <span>
          <Link to="/messages">Messages</Link>
        </span>
        <span>
          <Link to="/profile">Profile</Link>
        </span>
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <a href="/" onClick={this.logoutUser}>Logout</a>
        </span>
      </nav>
    );
  }
}

export default Nav;
