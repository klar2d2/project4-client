import React, { Component } from 'react';
import MapGl, { Marker } from 'react-map-gl';

const token = "pk.eyJ1IjoiZ3RvbGUiLCJhIjoiY2p6b2Y4cGw4MDJlYTNtbm1zc3dpd3BnciJ9.ZR0TDB4dlK-kw5DHO4qM1w";

class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 47.6062,
      longitude: -122.3321,
      zoom: 8
    }
  }

  onViewportChange = viewport => this.setState({viewport, transitionDuration: 300})

  render(){
    const markers = this.props.goats.map((goat, i)=>{
      let lng = parseFloat(goat.address.longitude)
      let lat = parseFloat(goat.address.latitude)
      return (
        <div key={i}>
            <Marker latitude={lat} longitude={lng} anchor="bottom">
              <img src="https://imgur.com/llq4pzC.jpg" alt="goat" />
            </Marker>
        </div>)
})
    return(
      <MapGl
        {...this.state.viewport}
        mapboxApiAccessToken={token}
        onViewportChange={this.onViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        children={this.props.children}
      >
        {markers}
      </MapGl>
    );
  }
}

export default Map;
