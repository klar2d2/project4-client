import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import Goat from './Pages/Goat';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import Chat from './Chat'

class Content extends Component {
  render(){
    return(
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/goat/:goatId' component={Goat} />
        <Route path='/messages' component={Messages} />
        <Route path='/profile' component={Profile} />
        <Route path='/chat' component={Chat} />
      </div>

    );
  }
}

export default Content;