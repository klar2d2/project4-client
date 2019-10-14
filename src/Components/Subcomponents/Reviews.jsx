import React, { Component, PureComponent } from 'react';
import axios from 'axios'
import {CREATE_REVIEW, GET_REVIEW, UPDATE_REVIEW, GET_ONE_REVIEW, DELETE_REVIEW, CURRENT_USER} from '../../constants'

class Reviews extends Component {

  state = {
    title: '',
    content: '',
    clientId: this.props.user._id || '',
    goatId: this.props.goat._id,
    reviews: [],
    user: ''
  }


  handleChange = (e) => {
    const state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state)
  }

  handleDelete = (e) => {
    let usr
    usr = e.target.name
    console.log('wazgud')
    axios({
      method: 'post',
      url: DELETE_REVIEW(e.target.value),
      data: {
        _id: e.target.value,
        clientId: e.target.name
      }
    })
    .then(this.getReviews())
  }

  handleReview = (e) => {
    e.preventDefault()
    axios.post(CREATE_REVIEW(this.state.goatId), this.state)
    .then(response => {
      console.log('review created', this.state)
    })
    .catch(err => {
      console.log('Error in the axios post review route', err)
    })
  }

  getReviews = () => {
    this.setState({reviews: []})
    axios.get(GET_REVIEW(this.state.goatId))
    .then(response => {
      console.log('got the reviews', response.data.reviews)
      return response.data.reviews
    })
    .then((reviews) => {
      Promise.all(
        reviews.map((review) => {
          return axios.get(GET_ONE_REVIEW(review))
        })
      )
      .then(responses => {
        let reviewArr = []
        console.log(responses)
        responses.forEach(r => {
          if(r.data.review) {
            reviewArr.push(r)
          }
        })
        this.setState({reviews: reviewArr})
      })
      .catch(err => {
        console.log('Errror getting the one review', err)
      })
    })
    .catch(err => {
      console.log('Error in the get reviews route', err)
    })
  }


  componentDidMount() {
    this.getReviews()
  }

  render(){
    const reviews = this.state.reviews.map((review) => {
      return(
        <div key={review.data.review._id}>
          <h3>{review.data.review.title}</h3>
          <p>{review.data.review.content}</p>
          <button value={review.data.review._id} name={this.props.user._id} onClick={this.handleDelete}>Delete Review</button>
        </div>
    )
  })

    let newReview;
    if (this.props.user.isGoat === false) {
      newReview = <div className='new-review-box'>
        <h2>Submit a Review</h2>
        <form onSubmit={this.handleReview}>
          <input type='text' name='title' placeholder='Review Title' onChange={this.handleChange} />
          <input className='review-textbox' name='content' type='textbox' placeholder='Contents' onChange={this.handleChange} />
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
