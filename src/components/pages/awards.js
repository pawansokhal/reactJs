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
              <h2 className="inner-title">AWARDS</h2>
              <h4 className="text-center p-b-30">The Surrey whales- SAFE OCEANS award.</h4>
              <p>We shall be awarding our customers, local businesses and schools that choose to go
                plastic free the SAFE OCEANS award. The winners of the award will be listed on our
                website, FB, twitter and instagram. We shall also recommend their names to the local
                council for the initiative they have shown for the community. We shall donate to ocean
                clean up on their behalf and also adopt a whale for them with ORCA for a year. You can
                contact us to understand how to achieve the plastic-free status.</p>
              <h3 className="p-t-20">Our Business &amp; the whales</h3>
              <p>The Surrey Whales project is very dear to us. We have come to a point where we believe that a lot
                is being said about saving the environment but not much has been done. We understand that the
                reason behind that is because any change can come from within the society and not by any single
                person. While we all understand and empathise with the environmental issues there is little one
                person can do to make an impact. Hence, we fill the recycling bin and roll it to the front of the
                house. Even in that regard there is a lot of recycling due to increasing E-commerce boxes &amp;
                general consumerism but comparatively smaller recycling bins. The plastic bag charge has been
                increased to 10p from 5p, that means there is still a gap. A person cannot be told but a
                community can be united.</p>
              <h2>United efforts bring change</h2>
              <p>So we planned to take the initiative believing that these effort will:</p>
              <ul className="light_ul p-b-20">
                <li><i className="fa fa-dot-circle-o" /> Unite the community</li>
                <li><i className="fa fa-dot-circle-o" /> Share a common purpose and work towards it</li>
                <li><i className="fa fa-dot-circle-o" /> Gain a sense of achievement as a community</li>
                <li><i className="fa fa-dot-circle-o" /> See and feel the change and pass it to our next generation</li>
              </ul> 
              <p>In this fast world where everyone is heads down involved in the phone window, we wish
                to reconnect the community towards a common purpose. We will all come out heroes as
                a community who counteracted on eradicating daily environmental pollutants. Hence,
                promising a sense of well being and friendliness making the community stronger.</p>
              <p>We have taken up following mission objectives towards a responsible Eco-friendly society:</p>
              <ul className="light_ul p-b-20">  
                <li><i className="fa fa-dot-circle-o" /> To make Surrey the first county that actively counteracts the usage of plastic/poly bags.</li>
                <li><i className="fa fa-dot-circle-o" /> To assist effective recyclable items disposal</li>
                <li><i className="fa fa-dot-circle-o" /> To challenge usage of mass produced non-recyclable poly packs for daily consumable item</li>
                <li><i className="fa fa-dot-circle-o" /> To provide more bins around target delivery areas for responsible waste disposal.</li>
                <li><i className="fa fa-dot-circle-o" /> To minimise pollution from trips to supermarkets and central London.</li>
                <li><i className="fa fa-dot-circle-o" /> Strengthening woman by providing work opportunities from home</li>
                <li><i className="fa fa-dot-circle-o" /> Funding sea life projects</li>
              </ul>
              <p>All our mission objectives will be shared on our website and media channels and regular updates
                will be provided to share the progress we as a community have achieved.We shall be sharing our
                plan with the students in an effort to take our message home. We also wish for the students to
                look at becoming a social entrepreneur. This would mean that whatever they decide to do they
                should plan a mission parallel to that and find a way to bring change. We strongly believe in the
                power of a community to bring change and to bring smiles. It is good to be a part of something
                greater than ourselves and only the other person can help us with that.</p>
              <h3 className="text-center m-t-20">If you wish to achieve something great…Unite!</h3>
            </div>
          </div>
        </section>
        
        );
    }
}




export default(AboutUs);