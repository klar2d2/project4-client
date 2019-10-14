import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import Goat from './Pages/Goat';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Signup from './Pages/Signup'

import Chat from './Subcomponents/Chat'

class Content extends Component {
  render(){
    console.log(this.props)
    return(
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/browse' render={
            () => <Browse user={this.props.user} />
          } />
          <Route path='/goat/:goatId' component={Goat}/>
          <Route path='/messages' component={Messages}/>
          <Route path='/profile' render={
              () => <Profile user={this.props.user} refreshUser={this.props.refreshUser} />
            } />
          <Route path='/signup' render={
              () => <Signup user={this.props.user} refreshUser={this.props.refreshUser} />
            } />
          <Route path='/login' render={
              () => <Login user={this.props.user} refreshUser={this.props.refreshUser} />
            } />
          <Route path='/chat' component={Chat} />
        </Switch>
      </div>
    );
  }
}

export default Content;
