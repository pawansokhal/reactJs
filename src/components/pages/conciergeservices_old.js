import React from 'react';
import { Link, browserHistory } from 'react-router';

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
          <section className="ambassador-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="about-sec-main concierge-page">
              <h2 className="inner-title">Concierge services</h2>
              {/* <h3 className="m-b-15">Become an Eco Ambassador:</h3> */}
              <div className="eco-ambassador-img pull-right">
                <img src="images/conciergeservices.jpg" alt="eco ambassador" />
                <h4> Dont miss out on the stunning New Christian Louboutin make up range or The 2000 pound bottle of Gin.</h4>	
              </div>		   
              <p>Surrey is located quite near yet far from Central London because due to the traffic and the the uproaring activity in London it seems tedious to make a trip. Surrey's residents find it hard to get many skincare, makeup and clothing brands nearby. Most of these products and brands are only available in Central London or Westfield shopping centre in Shepherds bush. A trip in that direction means:</p>
             <p>Congestion charge . Parking . An entire day . No one place with all needs . Tiring . Outside food</p>
             <p>
Often times, you may not even find all the items required or find something new that the store does not have in your size. The stores can mostly get the item for you but it will only be available on a different day. The thought of making a journey back in 2 days or a week seems unlikely & cumbersome. We have created a solution for the same, to bring London to Surrey, daily!</p> 

<p>
Register with us and you get:
</p>
<ul className="eco_ul p-b-20">
                <li><i className="fa fa-dot-circle-o" /> <span>On-demand shopping from Central London areas with a 10 pound delivery charge*.</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>You will simply go into your Surrey whales account and open New Order & fill the details. </span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>We will find the item for you, check its price and availability</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Confirm with a picture, required size and other specs.</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Send you the item details along with the price and availability status.</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Incase the item is readily available and you place the order by 4pm same day, we shall then deliver it to you the very next day.</span></li>
                 </ul>  
              <p>The entire process happens through updates on your phone. We do not disturb you by calls, we will send you an alert near 4pm to remind you to close the order for today so that it can be delivered tomorrow if required.
          We shall bring the concierge service to Same day delivery very soon and will be adding personal shopper service to it i.e. live shopping. The personal shopper will constantly exchange pics and videos with you and help you make a selection.
<br/>    <div className="eco-ambassador-img">
                <img src="images/conciergeservices2.jpg" alt="eco ambassador" className=" pull-right"/>	
                <h4>.</h4>
              </div></p>
            {/* <h4>Dont miss out on the stunning New Christian Louboutin make up range Or the 2000 pound bottle of Gin</h4> */}
    
     <ul className="concierge-img">

       <strong>*T&C apply</strong>
<li>  -   Returns and refunds will depend on each individual store's policy.</li>
<li>   -   The charge refers to collection from 2 different stores & maximum 10 items.</li>
<li>  -   For additional shopping a second charge of 10 pound will apply</li>
<li>  -   Each charge covers 2 shopping bags of large size (2ft x 2ft). There could be 6 small bags, as long as the shopping fits into a large size bag and they are all general shopping, we will not charge additionally (Or A large box (1.5 ft x 1.5 ft).</li>
<li>  -   Any items of heavier weight, unusual dimensions or requiring special care will be negotiated accordingly. We may have to send a special vehicle in these cases.</li>
     </ul>
     <Link className="btn btn-default submit-btn ecoambassadobutton" to="ecoambassadorform"><b>Register Now</b></Link>
            </div>
          </div>
        </section>
        // <Link className="btn btn-default submit-btn ecoambassadobutton" to="ecoambassadorform"><b>Register Now</b></Link>
        );
    }
}




export default(AboutUs);