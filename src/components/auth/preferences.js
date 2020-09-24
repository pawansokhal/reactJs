import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
import { getProfile, changeName, changeEmail, changeAndAddNewPhone, changePhoneResendOtp, changePhoneVerifyOtp, takeOrderFromFome, freeRecycling } from '../../actions/auth';
import { objectToQueryString } from '../../common/common';
import PopupModal from '../common/popupModal';
import Email from './email';
import Phone from './phone';
import NameChange from './nameChange';
import $ from "jquery";
/*eslint-disable no-script-url*/
class Profile extends Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentWillMount() {
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
    }
    this.props.getProfile(objectToQueryString(formData))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (target.type === 'checkbox') {
      const isChecked = event.target.checked;
      this.setState({
        [name]: isChecked ? "Y" : "N"
      });
      let formData = '';
      if (name === "take_order_from_home") {
        formData = {
          take_order_from_home: isChecked ? "Y" : "N"
        }
        this.props.takeOrderFromFome(objectToQueryString(formData))
      } else {
        formData = {
          free_recycling: isChecked ? "Y" : "N"
        }
        this.props.freeRecycling(objectToQueryString(formData))
      }
    } else {
      this.setState({
        [name]: value
      });
    }

  }

  render() {
    let profile = [];
    if (this.props.profile.hasOwnProperty('data')) {
      profile = this.props.profile.data
    }
    return (

      <div>
        <section className="contact-sec content-sec p-b-50 m-t-50">
          <div className="container">
            <div className="text-center signup-form">
              <div id="content-login" className="signup-form-inner preferences-box" >
              {profile.first_name ?
                <form className="form-box" onSubmit={this.handleSubmit} autoComplete="off" >
                  <h4 className="mtext-105 cl2 txt-center p-b-30 ">
                    My preferences
                            </h4>
                            
                  <div className="form-group ">
                    <input autoComplete="off" className="checkbox1" defaultChecked={profile.free_recycling === "Y" ? true : false} value={profile.free_recycling === "Y" ? "N" : "Y"} type="checkbox" name="free_recycling" onChange={this.handleInputChange} />
                    <label htmlFor="freecycling">Interested in free recycling</label>
                  </div>
                  <div className="form-group  ">
                    <input autoComplete="off" className="checkbox1" defaultChecked={profile.take_order_from_home === "Y" ? true : false} value={profile.take_order_from_home === "Y" ? "N" : "Y"} type="checkbox" name="take_order_from_home" onChange={this.handleInputChange} />
                    <label htmlFor="takeorder">Prefer someone to visit you at your home to take order</label>
                  </div>
                  {/* <input type="submit" id="showregister" className="btn btn-default default-btn" value="Submit"/> */}
                </form>
                : null}
              </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: bindActionCreators(getProfile, dispatch),
    freeRecycling: bindActionCreators(freeRecycling, dispatch),
    takeOrderFromFome: bindActionCreators(takeOrderFromFome, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
