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
            <section className="about-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
  <div className="container">
    <div className="about-sec-main">
      <h2 className="inner-title">ABOUT US</h2>
      <h4 className="text-center p-b-30">An online grocery supermarket with a firm Eco-friendly initiative.</h4>
      <p>Surrey whales is a website run by <b>Cacozi Limited.</b></p>
      <p>Environmental welfare is at the core of our business. We believe in re-thinking every aspect of our
        day-to-day lives and altering things to safeguard the environment. Surrey whales, the name refers
        to the whales, largest mammals with remarkable lives. We wish to stay connected with the
        thought of these magnificent creatures and the environmental hazards they face, this thought
        gives us the motivation to persevere and preserve. Technology and ease of access has escalated
        consumerism but along with it also comes the responsibility of managing the excess. We shall be
        delivering groceries and treating each area we cover as our home. We will make sure that as we
        progress, the environmental welfare of that area progresses with us. We shall also engage with
        local councils to administer these changes.</p>
      <p>We named our project Surrey Whales in memory of the whale that died due to ingesting a
        lot of plastic bags. The news was very sad and it made a great impact on our team.
        Everyday a lot of sea creatures and land animals die after ingesting plastic and other nonrecyclable
        products. We humans have created and spread these materials. We do not by
        any means consciously wish to hurt other life forms but it happens and they die an
        unbearable death due to our negligence. We wish to make a conscious effort that
        wherever we will take our business, we will make sure we positively impact the
        environment in that area by taking the strength from the local community. Community is
        the strength behind any movement and we believe that our customers will come along
        with us to make our initiative a remarkable success.</p>
      <ul className="about_ul">
        <li><img src="images/delivery-truck.png" alt="img" /> <span>Same day grocery delivery*</span></li>
        <li><img src="images/package-for-delivery.png" alt="img" /> <span>Recyclable packaging for delivery</span></li>
        <li><img src="images/hub.png" alt="img" /> <span>Local collection hubs</span></li>
        <li><img src="images/recycling-symbol.png" alt="img" /> <span>Recycling collection service</span></li>
        <li><img src="images/guard.png" alt="img" /> <span>Concierge service for Central London stores</span></li>
        <li><img src="images/guarantee.png" alt="img" /> <span>Care &amp; Freshness guaranteed</span></li>
      </ul>
      <img src="./images/footer-logo.png" alt="logo" />
          <p className="address"> <b>Cacozi Limited </b><br/>
                T/A Surrey Whales<br/>
                27 Old Gloucester Street<br/>
                London, WC1N 3AX</p>
          <p className="address"><span>Phone:</span> +44 (0)203 8088336, 07938555555</p>
          <p className="address"><span>Email:</span> contact@surreywhales.com</p>

    </div>
  </div>
</section>

        );
    }
}




export default(AboutUs);