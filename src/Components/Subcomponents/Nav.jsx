import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
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
          Signout
        </span>
      </nav>
    );
  }
}

export default Nav;