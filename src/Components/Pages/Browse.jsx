import React, { Component } from 'react';
import axios from 'axios';
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
        console.log('success')
        this.setState({ goats: response.data.users })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const goatDisplays = this.state.goats.map((goat) => <GoatDisplay goat={goat} key={goat._id} />)
    console.log(goatDisplays)
    return (
      <div>{goatDisplays}</div>
    );
  }
}

export default Browse;