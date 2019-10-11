import React, { Component } from 'react';
import axios from 'axios';
import Map from '../Subcomponents/Map';
import GoatDisplay from '../Subcomponents/GoatDisplay';
import { GET_GOATS } from '../../constants';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goats: []
    }
  }

  componentDidMount() {
    axios.get(GET_GOATS)
      .then((response) => {
        this.setState({ goats: response.data.users })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const goatDisplays = this.state.goats.map((goat) => <GoatDisplay goat={goat} key={goat._id} />)
    return (
      <div className="browse-display">
        <div className="goats-display">
          {goatDisplays}
        </div>
        <div className="map-container">
          <Map goats={this.state.goats}/>
        </div>
      </div>
    );
  }
}

export default Browse;