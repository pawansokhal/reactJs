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
         <div className="coming-soon1 text-center">
         <h2>Coming Soon</h2>
         {/* <img src="../images/bg-img.jpg" alt="cs"/> */}
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