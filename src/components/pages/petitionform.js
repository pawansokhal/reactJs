import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { petition } from '../../actions/common';
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
      event.preventDefault();
      let form = new FormData();
      form.append('fullname', this.state.name);
      form.append('email', this.state.email);
      form.append('phone', this.state.phone_number);
      form.append('message', this.state.msg);
      this.props.juniorEcoAmbassador(form)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.petitionData) {
      this.setState({
        name: '',
        email: '',
        phone_number: '',
        msg: ''
      }); 
    }
}

  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
  }

  render() {

    return (
      <section className="contact-sec content-sec p-b-50 m-t-50">
      <div className="container shipping-address">
<div className="animation-form ">
<form onSubmit={this.handleSubmit}>
  <div className="form-box ">
    <div className="form-group">
      <input type="text" required name="fname" className="form-control" placeholder="First Name" onChange={this.handleInputChange} value={this.state.email}/>
    </div>
    <div className="form-group">
      <input type="text" required  name="lname" className="form-control" placeholder="Last Name" onChange={this.handleInputChange} value={this.state.email}/>
    </div>
    <div className="form-group last-input">
    <input autoComplete="off" required className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" name="email" placeholder="Your Email Address" onChange={this.handleInputChange} value={this.state.email} />
    </div>
    </div>
  {/* <div className="checkbox">
    <label><input type="checkbox" /> Display my name and comment on this petition</label>
  </div> */}
  <button type="submit" className="btn btn-default"><i className="fa fa-lock" aria-hidden="true" /> Sign this petition</button>
</form>
<p>By signing, you accept Change.org’s Terms of Service and Privacy Policy, and agree to receive occasional emails about campaigns on Change.org. You can unsubscribe at any time.</p> 
</div>
</div>
</section>

    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    petition: bindActionCreators(petition, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    petitionData: state.common.petition,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contactus);