import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
class AboutUs extends React.Component {
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
      pathname: '/login',
      search: '',
      state: { previouspath: '/newin' }
    });
  }

  render() {
    return (
      <section className="ambassador-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
        <div className="container">
          <div className="about-sec-main">
            <h2 className="inner-title">#PlasticFree</h2>
            <h3 className="m-b-15">Uniting communities in the fight against single-use plastics and throwaway culture</h3>
            <div className="eco-ambassador-img2 col-sm-6">
              <img src="images/plasticfree.jpg" alt="eco ambassador" />
              <div className="col-md-12   m-t-30">
                  <Link to="/categories?cat_id=1510"  className="btn btn-default ecoambassadobutton btn-block bold"   >Shop Plastic Free</Link>
                </div>
            </div>
            <div className="col-sm-6">
            <h4 className="inner-title">WHAT IS THE PROBLEM WITH PLASTIC IN OUR OCEANS?</h4><br />
            <p>
              For wildlife, it can be deadly. Plastic can entangle, injure and drown animals; it can also be mistaken for food and starve animals to death by blocking their digestive systems. For us humans it's not looking good either. At risk are our wild spaces and oxygen supply as well as our health. The chemicals that plastics leach into seawater have been linked to endocrine disruption and some cancers. With 1 in 3 fish caught for human consumption now containing plastic, it's no longer a question of if there is plastic in our seafood, but how bad exactly that contamination is for us.</p>
              </div>
              <div className="col-sm-12 liststyle">
            <ul className="eco_ul p-b-20">
              <li><i className="fa fa-dot-circle-o" /> <span>51 Trillion microscopic pieces of plastic, weighing 269,000 tonnes, in the ocean</span></li>
              <li><i className="fa fa-dot-circle-o" /> <span>1 in 3 Fish caught for human consumption, now containing plastic</span></li>
              <li><i className="fa fa-dot-circle-o" /> <span>1 million sea birds and 100,000 marine mammals are killed by plastic polution each year</span></li>
              <li><i className="fa fa-dot-circle-o" /> <span>138 Pieces of food and drink waste litter every 100 metres of coastline</span></li>
              <li><i className="fa fa-dot-circle-o" /> <span>29,000 Plastic bottles removed from the coast by SAS Beach Cleans in 2017</span></li>
              <li><i className="fa fa-dot-circle-o" /> <span>150 Years for a cotton bud stick to break down in the marine environment</span></li>
            </ul>
            </div> 
            <div className="junior-ambassador-imgq">
            <div className="col-sm-6"> <h4 className="inner-title mediavideo">WASTELAND</h4><br />
              <p>We along with our local community will campaign to put the problem of single-use plastic waste on the map, and raise awareness of the growing issue of marine plastic pollution. This video focusses on a continent-sized area of plastic waste in the North Pacific named 'Wasteland' – the world's newest and most threatening country</p>
             </div> <div className="col-sm-6"><iframe className="pull-right" width="100%" height="300" src="https://www.youtube.com/embed/du7rE3sQ_tE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <div className="mediavideo"></div>
            </div>
            <hr />
            <div className="junior-ambassador-imgq">
              <h4 className="inner-title">WHAT CAN WE DO ABOUT IT?</h4><br />
              <p>
                It’s impossible to get the existing 269,000 tonnes of plastic out of the ocean, but together we can stop putting more in.
                </p>
              <p> <b>WHAT WE'RE ALREADY DOING </b>: We are connecting with our communities in Surrey through our grocery supermarket. We believe that a business must handle its social responsibility to tackle environmental issues and bring communities together. We shall take a part of our profits from the business and use them towards spreading awareness and tackling the issue of plastics in the ocean</p>
              <p> <b>WHAT YOU CAN DO: </b>Sign up to receive your free Individual Action Plan for reducing your plastic use. Share the campaign, and request your friends to join as well. This will help all of us as a community to approach businesses in our area to stop the use of single-use plastics and responsible recycling disposal. This will help make Surrey more aware and green, we need to reduce our plastic footprint. A single person or household will feel alone in their initiative but if Surrey Whales brings all the willing households together, we will create a wave to help the whales and other sea life lead a cleaner & safe life</p>
            </div>
            <h4>"IMAGINE A WORLD WHERE OUR BEACHES AND SEASHORES ARE NOT BLIGHTED AND STRANGLED BY PLASTIC POLLUTION. PLASTIC FREE COASTLINES IS THAT VISION. IT'S WHAT PEOPLE AND PLANET ARE CRYING OUT FOR AND IT'S WHAT WE'RE WORKING HARD TO ACHIEVE."</h4>
            <br />
            <p className="text-center" ><span className="text-center">By: Surfers against Sewage</span></p>
            {/* <hr /> */}
            <h4 className="text-center">LETS ALL WORK TOGETHER TO BE PLASTIC FREE</h4>

            <br />
            <br />
            <p className="text-center" > <a target="_blank" className="btn btn-default submit-btn ecoambassadobutton text-center" href="https://www.change.org/p/plastic-free-ocean-demand-that-single-use-plastic-which-is-now-indestructible-be-biodegradable"><b>Register to join the PlasticFree movement</b></a>  </p>

          </div>
        </div>

      </section>

    );
  }
}




export default (AboutUs);