import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import {   addProductReview } from '../../actions/products';
import { objectToQueryString  } from '../../common/common';
import Rating from '../common/rating';
/*eslint-disable no-script-url*/
class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      model: false,
      order_id: this.props.params.id,
      orderproductdetail:[]
    }
    this.pathname = this.props.location.pathname;
    this.addProductReviews = this.addProductReviews.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }
  addProductReviews(event) {
    event.preventDefault();
    const formData = {
      product_id: this.props.params.id,
      rating: this.state.rating,
      remarks: this.state.remarks
    }
    this.props.addProductReview(objectToQueryString(formData))
  }
  
handleInputChange(event) {
  const rating = event.target.dataset.rating ? event.target.dataset.rating : findDOMNode(event.target).parentNode.dataset.rating;
  const ratingName = event.target.dataset.ratingname ? event.target.dataset.ratingname : findDOMNode(event.target).parentNode.dataset.ratingname;
  const target = event.target;
  const value = target.value;
  const name = target.name;
 
  if(ratingName === 'rating') {
    this.setState({
      rating: rating
    });  
  }
  this.setState({
    [name]: value
  });
}
redirectToLogin(event) {
  event.preventDefault();
  browserHistory.push({
      pathname: '/login',
      search: '',
      state: { previouspath: this.pathname }
     });
}

  render() {
    let productreview = [];
    let custId = localStorage.getItem('cust_id')
    let sessionKey = localStorage.getItem('session_key')
    if (this.props.productreview.hasOwnProperty('data')) {
      productreview = this.props.productreview.data
    }
    return (
      // <div className="tab-pane fade show " id="tab2default" role="tabpanel">
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
            <div className="p-b-30 m-lr-15-sm">
              {/* Review */}
              {productreview.map(function (review, index) {
                return (
                  <div className="flex-w flex-t p-b-68" key={index}>  
                    <div className="size-207">
                      <div className="flex-w flex-sb-m p-b-17">
                        <span className="mtext-107 cl2 p-r-20">
                        {review.remarks}
                         </span>
                        <Rating rating={parseFloat(review.rating)} />
                      </div>
                      <p className="stext-102 cl6">
                      {review.first_name} {review.last_name}
                     </p>
                    </div>
                  </div>
                )
              })}

              {/* Add review */}
              {custId && sessionKey ?
                <form id="reviews-add" className="w-full" onSubmit={this.addProductReviews}>
                  <h5 className="mtext-108 cl2 p-b-7">
                    Add a review
              </h5>
                  <div className="flex-w flex-m p-t-50 p-b-23">
                    <span className="stext-102 cl3 m-r-16">
                      Your Rating
                  </span>
                  <div className="flex-w flex-t">
                 <div className="size-full">
                 <ul className="rate-area">
                <input type="radio" id="5-star" name="rating" value="5" onClick={this.handleInputChange}/><label htmlFor="5-star" title="Amazing">5 stars</label>
                <input type="radio" id="4-star" name="rating" value="4" onClick={this.handleInputChange}/><label htmlFor="4-star" title="Good">4 stars</label>
                <input type="radio" id="3-star" name="rating" value="3" onClick={this.handleInputChange}/><label htmlFor="3-star" title="Average">3 stars</label>
                <input type="radio" id="2-star" name="rating" value="2" onClick={this.handleInputChange}/><label htmlFor="2-star" title="Not Good">2 stars</label>
                <input type="radio" id="1-star" name="rating" value="1" onClick={this.handleInputChange} /><label htmlFor="1-star" title="Bad">1 star</label>
              </ul>
                    </div>
                </div>
                </div>                 

                  <div className="row p-b-25">
                    <div className="col-12 p-b-5">
                      <label className="stext-102 cl3" htmlFor="review">Your review</label>
                      <textarea className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="remarks" name="remarks" value={this.props.remarks} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                    Submit
                 </button>
                </form> : <a href="javascript:void(0)" onClick={this.redirectToLogin}  > Please Login </a>}
            </div>
            <div className="p-b-30 m-lr-15-sm">
            <h5 id="reviews-feed">
                   Thanks For Your Feedback
              </h5>
            </div>
          </div>
        </div>
      // </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addProductReview: bindActionCreators(addProductReview, dispatch),
    
  }
}
function mapStateToProps(state) {
  return {
    productreview: state.product.productreview,
    isupdated: state.product.isupdated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
