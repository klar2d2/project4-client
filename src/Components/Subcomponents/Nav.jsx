import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
   logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mernToken");
    this.getUser();
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
          Signout
        </span>
      </nav>
    );
  }
}

export default Nav;
