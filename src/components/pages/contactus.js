import React from 'react';
import $ from "jquery";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactus } from '../../actions/common';
class Contactus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
        email: '',
        phone_number: '',
        msg: ''
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
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.contactdata) {
      console.log('nextProps.contactus', nextProps.contactdata)
      this.setState({
        name: '',
        email: '',
        phone_number: '',
        msg: ''
      }); 
    }
}

  handleSubmit(event) {
    event.preventDefault();
    let form = new FormData();
    form.append('fullname', this.state.name);
    form.append('email', this.state.email);
    form.append('phone', this.state.phone_number);
    form.append('message', this.state.msg);
    this.props.contactus(form)
  }
  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
  }

  render() {

    return (
      <div>
        <section className=" content-sec">{/*OPEN slider-sec */}
          <div className="container">
            <h2 className="inner-title">Contact Us</h2>
          </div>
        </section>{/*END slider-sec */}
        <section className=" p-b-50 m-t-50">{/*OPEN slider-sec */}
          <div className="container">
            <div className="contact-box-main">
              <div className="contact-col-left">
                <form onSubmit={this.handleSubmit}>
                  <h4 className="text-center p-b-30">
                    Send Us A Message
                    </h4>
                    <div className="form-group">
                    <input autoComplete="off" required className="form-control" type="text" name="name" placeholder="Your Name" onChange={this.handleInputChange} value={this.state.name} />
                    <i className="fa fa-user" />
                  </div>
                  <div className="form-group">
                    <input autoComplete="off" required className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" name="email" placeholder="Your Email Address" onChange={this.handleInputChange} value={this.state.email} />
                    <i className="fa fa-envelope-o" />
                  </div>
                  <div className="form-group">
                    <input autoComplete="off" required className=" form-control" onChange={this.handleInputChange} maxLength="11" pattern="\d{11}" title="Please enter exactly 10 digits" type="tel" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} />
                    <i className="fa fa-phone" />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="msg" placeholder="How Can We Help?" value={this.state.msg} onChange={this.handleInputChange} />
                  </div>
                  <button className="btn btn-default default-btn">
                    Submit
                    </button>
                </form>
              </div>
              <div className="contact-col-right">
                <div className="address-box right-sections">
                  <span className="map-marker left-block">
                    <span className="fa fa-map-marker" />
                  </span>
                  <div className="address-text right-block">
                    <span>Address</span>
                    <p>Cacozi Limited T/A Surrey Whales<br />
                      27 Old Gloucester Street<br />
                      London, WC1N 3AX</p>
                  </div>
                </div>
                <div className="contact-box right-sections">
                  <span className="phone-col left-block">
                    <span className="fa fa-phone" />
                  </span>
                  <div className="phone-txt right-block">
                    <span>Lets Talk</span>
                    <p>+44 (0) 203 8088336, 07938555555</p>
                  </div>
                </div>
                <div className="message-box right-sections">
                  <span className="message-col left-block">
                    <span className="fa fa-envelope-o" />
                  </span>
                  <div className="message-txt right-block">
                    <span>Customer Care</span>
                    <p>contact@surreywhales.com</p>
                  </div>
                </div>
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
    contactdata: state.common.contactus,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contactus);