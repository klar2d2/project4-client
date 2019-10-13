import React, { Component } from 'react';
import axios from 'axios'
import {CREATE_REVIEW} from '../../constants'

class Reviews extends Component {

  state = {
    clientId: this.props.user._id,
    goatId: this.props.goat._id
  }

  componentDidMount() {
    console.log(this.props.user)
  }

  handleReview = () => {
    axios.post(CREATE_REVIEW, this.state)
    .then()
  }

  render(){
    const reviews = this.props.goat.reviews.map(review => {
      return(<div>
        <h3>{review.title}</h3>
        <p>{review.content}</p>
      </div>
    )
  })

    let newReview;
    if (this.props.user.isGoat == false) {
      newReview = <div className='new-review-box'>
        <h2>Submit a Review</h2>
        <form onSubmit={this.handleReview}>
          <input type='text' name='title' placeholder='Review Title' onChange={(e) => this.setState({ title: e.target.value, message: '' })} />
          <input className='review-textbox' name='content' type='textbox' placeholder='Contents' onChange={(e) => this.setState({ content: e.target.value, message: '' })} />
          <input type='submit' />
        </form>
      </div>
    }

    return(
      <div>
        <h2>Reveiws of {this.props.goat.firstname}</h2>
        {reviews}
        {newReview}
      </div>
    );
  }
}

export default Reviews;
