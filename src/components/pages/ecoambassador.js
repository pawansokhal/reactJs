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
            <div className="about-sec-main">
              <h2 className="inner-title">Eco Ambassador</h2>
              <h3 className="m-b-15">Become an Eco Ambassador:</h3>
              <div className="eco-ambassador-img">
                <img src="images/eco-ambassador.jpg" alt="eco ambassador" />	
              </div>		  
              <p>As an Eco ambassador you shall be responsible for promoting Eco-friendly shopping in
                your area. You shall achieve this by:</p>
              <ul className="eco_ul p-b-20">
                <li><i className="fa fa-dot-circle-o" /> <span>Signing residents up for FREE, convenient &amp; efficient recycling with Surrey whales</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Creating awareness against usage of plastic/polythene bags &amp; providing alternatives</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Bringing householders to Surrey whales platform to shop in an Eco friendly manner.</span></li>
                <li><i className="fa fa-dot-circle-o" /> <span>Arranging beach clean-ups and other community activities</span></li>
              </ul>  
              <p>You shall be responsible for 100-130 households. This role is mostly for women staying at
                home due to family responsibilities. We wish to extend them a chance to work from home
                while supporting our cause. It is a paid full time work from home position. Contact us to
                check if any Ambassador positions are open in your area.<br/> <Link className="btn btn-default submit-btn ecoambassadobutton" to="ecoambassadorform"><b>Register Now</b></Link></p>
              <hr />
            </div>
          </div>
        </section>
        );
    }
}




export default(AboutUs);