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
              <h2 className="inner-title">THE MISSION</h2>
              <p>As E-commerce has progressed, it has also bought cardboard boxes, bubble wraps and other
                types of packaging materials. We have come to realise that these boxes tend to take a lot of
                space at home and sometimes the council does not clear them due to their size or number, as
                they do not fit in the recycling bins. We believe that these should be consciously disposed for
                recycling and people should be able to make further orders guilt-free and care-free. We have
                taken up following mission objectives towards a responsible Eco-friendly society:</p>
              <ul className="light_ul p-b-20">
                <li><i className="fa fa-dot-circle-o" /> To make Surrey the first county that actively counteracts the usage of plastic/poly bags.</li>
                <li><i className="fa fa-dot-circle-o" /> To assist effective recyclable items disposal</li>
                <li><i className="fa fa-dot-circle-o" /> To challenge usage of non-recyclable plastics in daily consumable item packagings</li>
                <li><i className="fa fa-dot-circle-o" /> To provide more bins around target delivery areas for responsible waste disposal.</li>
                <li><i className="fa fa-dot-circle-o" /> To minimise pollution from trips to supermarkets and central London.</li>
                <li><i className="fa fa-dot-circle-o" /> Strengthening woman by providing work opportunities from home</li>
                <li><i className="fa fa-dot-circle-o" /> Funding sea life projects</li>
              </ul>
              <p>Plastic pollution poses a real threat to whales, dolphins and other sea animals. From the
                small fish eating dolphins to the largest filter feeding whales, 56% of them have been
                known to have eaten marine plastics that they mistook for food. Plastic is not food for
                anyone but these animals are unaware of the dangers. We all wish to keep our oceans clean
                and safe giving these creatures a wonderful habitat. Surrey Whales is working towards
                uniting the community and leading to a #PlasticFree community, where everyone actively
                works towards and contributes to a cleaner society.</p>
              <p>
                <strong>5 million</strong><br />
                Every year on an average between 5 million to 13 million tonnes of plastics leak into our
                oceans. That is a heavy number, actually more than the combined weight of all the blue
                whales on Earth.
              </p>
              <p>
                <strong>1 bottle</strong><br />
                If we were to break down a single 1L bottle into enough small fragments, we could have
                enough fragments to put one on every mile of the beaches covering the entire world.
              </p>
              <p>
                <strong>450 years</strong><br />
                It can take upto 450 years for a single-use plastic bottle to perish, it would literally mean
                that the bottle can outlive all living creatures on earth. Depending on how many we have
                already produced, we will never see the end of those.
              </p>
              <p>
                <strong>480 billion</strong><br />
                In the year 2016 more than 480 billion single-use plastic drinking bottles were sold around
                the world.
              </p>
              <p>
                <strong>80 bags</strong><br />
                Recently in 2018, a whale died with 80 plastic bags in its stomach. Some of these bags were
                even recyclable. Plastic is a silent killer and preys on the unsuspecting.</p>
              <div className="video-section p-b-15">
                <iframe width={560} height={315} src="https://www.youtube.com/embed/lb1aCIQfQwA?rel=0" frameBorder={0} allow="autoplay; encrypted-media" allowFullScreen />
              </div>
              <h3 className="m-b-15">We request you to sign the #unplastic petition so we can urge the local
                council to support our community to be plastic-free</h3>
              <p>We need to work towards a responsible society. We should choose to #unplastic ourselves. It
                may be difficult at first but all we need to consciously decide is:</p>
              <ol className="m-b-15">
                <li>1. Refrain from using single use plastics</li>
                <li>2. Recycle effectively &amp; responsibly</li>
              </ol>
              <p>Surrey whales will put in all its efforts to deliver you groceries without assistance of single
                use plastics and will also assist you with your recycling needs. Kindly join us in our
                initiative and make us stronger. We named ourselves Surrey whales to constantly remind
                ourselves of home that is Surrey and whales that need us to not use plastics. We request our
                home community to join us in this effort, lets #unplastic ourselves.</p>
            </div>
          </div>
        </section>
        
        );
    }
}




export default(AboutUs);