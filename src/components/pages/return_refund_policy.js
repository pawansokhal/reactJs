 import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
class AboutUs extends React.Component {
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath:'/newin' }
       });
  }

    render(){
    
        
        return (
          <section id="section1" className="terms-and-conditions-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="about-sec-main">
              <h2 className="inner-title">RETURNS &amp; REFUNDS</h2>	
              
              <p><strong className="heading">What is your returns policy for non-perishable products?</strong><br />
                If you've changed your mind about a non-perishable item, you have up to 14 days after your delivery to contact us for a refund. Call us on 0203 8088 336 or email contact@surreywhales.com. We'll go through your options with you and arrange for your refund and return.</p> 
              <p>All we ask is that you return products in a re-saleable condition, with their original packaging and tags (if applicable). This means that if a product is sealed or has a hygiene seal, we ask that you do not remove this seal until you're sure you're keeping the item. When we get the item back from you will process your refund within 14 days.</p> 
              <p>While we don't offer exchanges, you're more than welcome to reorder any refunded item on your next shopping.</p> 
              <p><strong className="heading">What is your returns policy if there's something wrong with the product?</strong><br />
                If you discover that there's something wrong with the product, such as a fault, damage or it's not as described, you have a couple of options to get a refund.</p> 
              <p>If you've received an order in the last 48 hours, you can request a refund through our website or app. Simply select the 'Request refund' link from the Orders page and follow the instructions.</p> 
              <p>If more than 48 hours have passed and you don't see the 'Request refund' link, please email us at contact@surreywhales.com or call us on 0203 8088 336; we'll be happy to help go through your refund options with you.</p> 
              <p>As a consumer, you have certain legal rights regarding the return of goods that are faulty, damaged or not as described. Our refund policy does not affect your legal rights. Our returns policy is in accordance with statutory rights under the Consumer Contracts Regulations. For more information about these rights please contact your local authority Trading Standards Department, or Citizens Advice. You can also refer to the Which? website.</p> 
              <p><strong className="heading">What is your returns policy for perishable products?</strong><br />
                If there are any perishable items in your delivery that you're not happy with, you can either hand them back to your driver – who'll take them off your bill – or give us a call on 0203 8088 336 to discuss your options.</p> 
              <p>Unless there's something wrong with the item, unfortunately we can't offer a refund for any perishable items you change your mind about after your delivery.</p> 
              <p>Our returns policy is in accordance with statutory rights under the Consumer Contracts Regulations.</p> 
              <p><strong className="heading">How can I get a refund for missing items?</strong><br />
                If you've received an order in the last 48 hours, you can request a refund through our website or app. Simply select the 'Request refund' link from the Orders page and follow the instructions.</p> 
              <p>If more than 48 hours have passed and you don't see the 'Request refund' link, please email us at contact@surreywhales.com or call us on 0203 8088 336; we'll be happy to help go through your refund options with you.</p> 
            </div>
          </div>
        </section>
        );
    }
}




export default(AboutUs);