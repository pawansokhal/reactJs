import React, {Component} from 'react';
import {	
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  Elements,
  injectStripe,} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

   submit(ev) {
   
    if (this.props.stripe) {
	  this.props.stripe.createToken().then(({token}) => {
											if(token){
												
						localStorage.setItem('strip_token',token.id)
						      console.log('Received Stripe token:', token);
						}

    });
/*this.props.handleSubmit(payload)*/
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }``
    // if (response.ok) this.setState({complete: true});
  }  
  render() {
    if (this.state.complete) return <h2>Purchase Complete</h2>;
    return (
      <div className="strip">
      <div className="checkout">
        {/* <CardElement onBlur={this.submit}/> */}
         <span className="card-text">Card Number</span>
         <CardNumberElement/>
         <span className="card-text">Expiration Date</span>
         <CardExpiryElement /> 
         <span className  ="card-text">CVC</span>
        <CardCVCElement onBlur={this.submit} /> 
   {/* <button id="StripeElementbutton" className="checkout" onBlur={this.submit}>Proceed to Checkout</button>*/}
      </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);