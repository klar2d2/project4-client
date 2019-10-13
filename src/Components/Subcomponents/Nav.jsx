import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class Nav extends Component {
   logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mernToken");
    this.props.refreshUser();

  }

  render(){
    let links;
    if (this.props.user) {
      links =
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
          <Link to="/" onClick={this.logoutUser}>Logout</Link>
        </span>
      </nav>
    }
    else if (!this.props.user){
      links =
      <nav>
        <span>
          <Link to="/">MunchMyLawn</Link>
        </span>
        <span>
          <Link to="/browse">Browse</Link>
        </span>
        <span>
          <Link to="/login">Login</Link>
        </span>
        <span>
          <Link to="/signup">Signup</Link>
        </span>
      </nav>
    }
    return(
      <div>
        {links}
      </div>
    );
  }
}

export default Nav;
