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
              <h2 className="inner-title">Plastic Free </h2>
              <div className="col-md-6">              
                <img src="/../images/plastic.jpg" alt="log" className="ecohmission-img"/>
                <div className="col-md-12   m-t-30">
                  <Link to="/categories?cat_id=1510"  className="btn btn-default ecoambassadobutton btn-block bold"   >Shop Plastic Free</Link>
                </div>
              </div>
              <div className="col-md-6">
                <p>Surrey whales has started connecting with suppliers who are organic and plastic-free. We shall keep on sharing our updates with you on our site regularly. Currently, we have got local supermarkets like Tesco and Waitrose on our page to provide you with personal shopper services, by this we mean we will shop for your requirement from these stores. We shall not be charging any extra money for that, we are assuming that cost. This will only help us understand your needs so we can start by sourcing for essentials first. It is an added cost for us but we are passionate and serious about our initiative and understand the importance and urgency of the same. There is a retail database of over 25000 items in UK regular grocery market. Your input will help us understand what we need to focus on as we go along. We do not wish Plastic-free to be a difficult or an expensive choice. We welcome your shopping and your inputs to help us progress. We will add products to our plastic free and Eco friendly section regularly and we hope one day very soon, we shall majorly supply plastic-free. </p>
             </div>
             <div className="col-md-12">
                <p>We are also inviting people to start home hubs, where they can hold grocery orders for their street. We shall drop the orders we receive from their street with them. They can then hold or deliver the orders as arranged by the customer. This will help generate employment in our local area and bring back corner shop concept. The people running these home hubs will be regular people who care to be plastic-free and are not thinking around profits. They will earn but there will be nothing monopolistic about that. Our purpose is to engage the community into a plastic free lifestyle and generate employment making Surrey strong and self sufficient. </p>
                <h4>"This is our effort as a community to walk away from the supermarkets and decide what we think is the best for us."</h4>
              </div>
            <br />
            {/* <p className="text-center" ><span className="text-center">By: Surfers against Sewage</span></p> */}
            </div>
          </div>
        </section>
        
        );
    }
}




export default(AboutUs);