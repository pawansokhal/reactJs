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
              <h2 className="inner-title">Junior Eco Ambassador</h2>
              <h3 id="junior" className="m-b-15">Become a junior Eco Ambassador</h3>
              <div className="junior-ambassador-img">
                <img src="images/junior-ambassador.jpg" alt="junior ambassador" />		
              </div>
              <p>Schools are at the centre stage of a child’s development and towards shaping their mindset. In
                this day and age there is a lot to be learned with the changing social and environmental dynamics.
                We take this opportunity to educate the students about whales, sea life and our responsibility
                towards our community in creating an environmentally conscious society.</p>
              <p><strong>What we do:</strong><br />
                We shall be arranging an interactive study session where the students will be given a deeper view
                of the sea life. They will be later given leaflets to share with their classes and submit an
                assignment based on what they have learned and what they personally feel is lacking or
                important. This will inspire them to think and connect with the deeper impacts of usage of
                plastics, disposal of recycling, Eco- friendly shopping etc.</p>
              <p><strong>Awards &amp; Rewards:</strong><br />
                We shall choose 5 best presentations submitted and send those students for an Orca Whale &amp;
                Dolphin safari. There is no better way to understand the beauty and wonders of the sea than to go
                and see it first-hand. ORCA offers schools, colleges and universities the chance to give students
                of all ages an unforgettable experience that will enrich their learning immeasurably.
                Operating out of both Newcastle and Portsmouth, these trips combine ORCA’s background in
                citizen science with their experience of inspiring young people, showing them first hand
                conservation projects. Every trip is tailored to the age group, making it a perfect addition to any
                syllabus regardless of level. Trips are usually run over two nights on routes to Spain (Santander)
                and Holland (Ijmuiden) respectively</p>
              <p>The participating school will be awarded a Surrey whales- Safe Oceans award. This award will
                entitle the school to become an Orca member hence supporting the charity with educating more
                students. We shall pay the school’s membership for 2 years. We shall also list the school on our
                website for appreciating their endeavour to educate students and make them environmentally
                conscious. <Link className="btn btn-default submit-btn ecoambassadobutton" to="juniorecoambassadorform"><b>Register Now</b></Link></p>
            </div>
          </div>
        </section>
        
        );
    }
}




export default(AboutUs);