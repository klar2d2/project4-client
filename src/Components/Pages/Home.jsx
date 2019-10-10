import React, { Component } from 'react';

class Home extends Component {
  render(){
    return(
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="/zip_Go-Goat/MP4/Go-Goat.mp4" type="video/mp4" />
          <source src="/zip_Go-Goat/WEBM/Go-Goat.webm" type="video/webm" />
          your browser does not support a video tag
        </video>
      </div>
    );
  }
}

export default Home;
