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
<section className="about-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container"> 
              <div className="about-sec-main freerecycling-text">
                <h2 className="inner-title">Free Recycling Facility</h2>
                <div className="col-sm-6">
                  <p>As E-commerce has progressed, it has also bought cardboard boxes, bubble wraps and other types of packaging materials. We have come to realise that these boxes tend to take a lot of space at home and sometimes the council is unable to clear them due to their size or number, as they do not fit in the recycling bins. Even generally with the rise in consumerism, recycling systems are going through an overload. We all need to come together as a community and actively assist and create a system that allows conscious disposal of recyclables. We request you to shop with us and allow us to register you for a hassle-free recycling disposal.</p>
                  <p>When you register, Kindly tick the box for free recycling facility. You will then be able to access your recycling facility against your shopping credits. Each time you wish to hand us some recycling, you will go to the 'My Recycling' link provided under your account. You can then open a new request and add basic details of the type of recyclables that you wish to be collected. We shall note the request and alert you 24 hours prior to the recycling van coming to your area. You can then leave the recycling in open vicinity for our recycler whale (the driver) to collect. Once it is cleared, you will receive an alert on your phone.
                    We are clearing the recycling as a part of our corporate and social responsibility. We will do it from our business earnings hence there will no additional cost to you. We only urge you to shop more so we can strongly move forward with our initiative. </p>
                  <p>We are also planning to give recycling bins per street (by early next year) separately for glass, plastic and batteries etc, so residents can dispose their recyclables in their own time. We shall then clear it from there. We will be initiating our efforts in the areas where we can find more customers as it will help us sustain our supermarket as well as our Eco-friendly initiative. We shall keep posting our updates under the Eco-mission on our website. Kindly stay connected and shop with us so we can progress fast and make Surrey fully Eco-friendly.</p>
                  <br />
                  <Link className=" pull-right btn btn-default submit-btn ecoambassadobutton" to="/register"><b>Click here to register</b></Link>
                </div>
                <div className="eco-ambassador-img2 col-sm-6">
                  <img src="images/free-recycling.jpg" alt="eco ambassador" />
                </div>
              </div>
          </div>
        </section>
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