import React from 'react';
import { Link } from 'react-router';
import ReactPixel from 'react-facebook-pixel';
import $ from "jquery";
// import Moment from 'moment';
// import { connect } from 'react-redux';
// import { findDOMNode } from 'react-dom'
// import { bindActionCreators } from 'redux';
// import { objectToQueryString,  currencySymbol  } from '../../common/common';
// import Rating from '../common/rating';
/*eslint-disable no-script-url*/
class OrderDetail extends React.Component {

  clearCokies() {
    localStorage.removeItem('strip_token');
    localStorage.removeItem('order_amount');
  }
  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
    localStorage.removeItem('strip_token');
    document.addEventListener('mousedown', this.handleClickOutside);
    const options = {
      autoConfig: true, 	// set pixel's autoConfig
      debug: true, 		// enable logs
      };
  ReactPixel.init('507827629695409', options);
  ReactPixel.fbq('track', 'Purchase',  {value: localStorage.getItem('order_amount'), currency: 'GBP'});
  console.log('ReactPixel',ReactPixel)
  }
  render() {
    return (
      <div>
      {/* breadcrumb */}     
      <div className="container p-t-110">
      </div> 
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-3 col-lg-6 m-b-50 m-t-50 text-center">				        
              <div className="wrap-table-shopping-cart ">
            <div className="jumbotron text-xs-center">
              <h2 className="display-3 m-b-15">Thank You!</h2>
              <p className="lead">Your order has been successfully placed</p>
              <hr/>
              <p className="lead">
              <Link to="/"  onClick={this.clearCokies} className="btn btn-primary btn-bg">Continue shopping</Link>
              </p>
            </div>
            </div>
          </div>
        </div>
    </div>
    </div>
    )
  }
}


export default (OrderDetail);
