import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkoutFormStrip';

class Payment extends Component {
  render() {

    // {console.log('cartdata.publishable_key', this.props.publishable_key)}
    return (
    <StripeProvider apiKey={this.props.publishable_key ? this.props.publishable_key : "pk_test_ScDRYOHrwZONDIAL7ZJufB7C"}>
        <div className="Modal-animationWrapper">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
       
      </StripeProvider>
     
    );
  }
}

export default Payment;