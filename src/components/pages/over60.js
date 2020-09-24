import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactus } from '../../actions/common';
import { objectToQueryString } from '../../common/common';
class Contactus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const status = event.target.dataset.status
    const formData = {
      email: this.state.email,
      session_key: this.state.phone_number,
      msg: this.state.msg
    }
    this.props.contactus(objectToQueryString(formData))
  }
  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
  }

  render() {

    return (
      <div>
        {/* <section className=" content-sec">
          <div className="container">
            
          </div>
        </section> */}
        <section className="about-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="about-sec-main"> 
            <h2 className="inner-title">Over 60 Order in Person</h2> 
              <div className="col-md-6">  
                          <div>
                            <p><span><strong>SIMPLER ORDERING FOR SENIORS:&nbsp;</strong>and even for people who need extra care or assistance in day to day life. We have hence taken an initiative for Surrey &amp; Berkshire, to take the orders in person for these customers. If you or your parent/relative or friend is over 60 or requires additional assistance, Kindly register them with us for easier shopping. We will:</span></p>
                            {/* <img width="500" src="images/above-60.jpg" alt="eco ambassador" style={{alignSelf:"right"}}/>	 */}
                            <ul className="">
                            <li>  -  <span>Send an account manager to visit them and understand their grocery requirement.</span></li>
                            <li>  -  <span >Set up a delivery and payment schedule.</span></li>
                            <li>  -  <span>Create a re-ordering plan with them and answer any concerns.</span></li>
                            <li>  -  <span >Stay in touch with them for their repeat needs over the phone.</span></li>
                            <li>  -  <span>Offer them delivery unpacking service.</span></li>
                            <li>  -  <span>Repeat visits can also be arranged.&nbsp;</span></li>
                            </ul>
                            <p><span>This will help you or your parents, friends or relatives shop hassle-free. All you have to do is call us or register their details with us and while registering choose the&nbsp;</span></p>
                            <p><strong><span>'Prefer someone to visit you at your home to take order'</span></strong></p>
                            </div>
                            <div>
                            <div><span>We will then get in touch with you and make arrangements for the visit. We wish for all our customers to experience Surrey whales as their own. Command us with pride, we are here to serve you better.</span></div>
                          </div>
                          
                      <br/>
                      <Link className=" pull-right btn btn-default submit-btn ecoambassadobutton" to="/register"><b>Click here to register</b></Link>                    
               
              </div>
            
                <div className="eco-ambassador-img2 col-sm-6">
                  <img src="images/above-60.jpg" alt="eco ambassador" />	
                </div>
             
            </div>
          </div>
        </section>
      </div>


    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    contactus: bindActionCreators(contactus, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    //  

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contactus);