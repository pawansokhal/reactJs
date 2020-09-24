import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
import { getProfile, changeName, changeEmail, changeAndAddNewPhone, changePhoneResendOtp, takeOrderFromFome, freeRecycling } from '../../actions/auth';
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
    this.state = {
      otp: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.newPhoneNumber = this.newPhoneNumber.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);

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
    // this.setState({
    //   [name]: value
    // });
    if (target.type === 'checkbox') {
      const isChecked = event.target.checked;
      this.setState({
        [name]: isChecked ? "Y":"N"
      });
    let  formData = '';
      if(name === "take_order_from_home") {
        formData = {
          take_order_from_home:isChecked ? "Y":"N"
        }
        this.props.takeOrderFromFome(objectToQueryString(formData))
      } else {
        formData = {
          free_recycling:isChecked ? "Y":"N"
        }
        this.props.freeRecycling(objectToQueryString(formData))
      }
      
    } else {
      this.setState({
          [name]: value
      });
      }
      
  }
  
  
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdated) {
      this.setState({
        modeldata: null,
        modelname: null,
        model: false,
        phone: '',
        email: '',
        otp: '',
      });
      $("#verify-number").slideUp("slow");
      $("#send-otp").slideDown("slow");
      const formData = {
        cust_id: localStorage.getItem('cust_id'),
        session_key: localStorage.getItem('session_key'),
      }
      this.props.getProfile(objectToQueryString(formData))
    }
    if (nextProps.added) {
      $("#verify-number").slideDown("slow");
      $("#send-otp").slideUp("slow");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      floor_number: this.state.floor_number,
      door_number: this.state.door_number,
      postcode: this.state.postcode,
      landmark: this.state.landmark,

    }
    this.props.addAddress(objectToQueryString(formData))
  }

  emailChange(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      email: this.state.email
    }
    this.props.changeEmail(objectToQueryString(formData))
  }

  newPhoneNumber(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      new_phone_number: this.state.phone
    }
    this.props.changeAndAddNewPhone(objectToQueryString(formData))
  }

  resendOtp(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
    }
    this.props.changePhoneResendOtp(objectToQueryString(formData))
  }
  verifyOtp(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      new_phone_number: this.state.phone,
      otp: this.state.otp
    }
    this.props.changePhoneVerifyOtp(objectToQueryString(formData))
  }


  nameChange(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      first_name: this.state.first_name ? this.state.first_name : this.state.modeldata.first_name,
      middle_name: this.state.middle_name ? this.state.middle_name : '',
      last_name: this.state.last_name ? this.state.last_name : this.state.modeldata.last_name,
    }
    this.props.changeName(objectToQueryString(formData))
  }
  showModal(e) {
    let mdata = e.target.dataset.data;
    if (e.target.dataset.name === 'namechange') {
      mdata = JSON.parse(e.target.dataset.data)
    }
    this.setState({
      modeldata: mdata,
      modelname: e.target.dataset.name,
      model: true
    });
  }
  hideModal() {
    this.setState({ model: false })
  }



  render() {
    let profile = [];
    if (this.props.profile.hasOwnProperty('data')) {
      profile = this.props.profile.data
    }
    return (
      <div>
        <section id="section1" className="cart-sec content-sec p-b-50 m-t-20">{/*OPEN slider-sec */}
  <div className="container">
    <div className="row">
      <div className="col-sm-12 breadcrumb-sec">
        <ol className="breadcrumb">
          <li><a href="javascript:void(0)">Home</a></li>
          <li className="active">My Profile</li>
        </ol>
      </div>
    </div></div>
          <div className="container">
          {profile.first_name ?
            <div className="shipping-address">
              <form className="bor10 p-lr-15 p-t-35 p-b-35 p-lr-15-lg w-full-md">
                <div className="field-group m-b-20 p-b-20 how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">Name</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30"> {profile.first_name} {profile.middle_name}  {profile.last_name}</h3>
                  <a href="javascript:void(0)" onClick={this.showModal} data-data={JSON.stringify(profile)} data-name="namechange" className="stext-106 cl6 p-r-20 pointer pull-right js-show-modal4">Change</a>
                </div>
                <div className="field-group m-b-20 p-b-20 how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">Phone</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30">{profile.phone_number}</h3>
                  <a href="javascript:void(0)" onClick={this.showModal} data-name="phone" data-data={profile.phone_number} className="stext-106 cl6 p-r-20 pointer pull-right js-show-modal3">Change</a>
                </div>
                <div className="field-group m-b-20 p-b-20 how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">Email</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30">{profile.email}</h3>
                  <a href="javascript:void(0)" onClick={this.showModal} data-name="email" data-data={profile.email} className="stext-106 cl6 p-r-20 pointer pull-right js-show-modal5">Change</a>
                </div>
                <div className="field-group m-b-20 p-b-20 how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">DOB</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30">{Moment(profile.dob).format('MMMM DD,YYYY')}</h3>
                </div>
                <div className="field-group m-b-20 p-b-20 how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">Gender</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30">{profile.gender === "M" ? "Male" :"Female"}</h3>
                </div>
                <div className="field-group how-pos4-parent">
                  <label className="cl7 p-l-20 p-r-30">Referal Code</label>
                  <h3 className="mtext-108 cl2 plh3 p-l-20 p-r-30">{profile.referral_code}</h3>
                </div>
                {/* <div className="field-group how-pos4-parent row-list">
                  <label className="cl7 p-l-20 p-r-30 left-label">Interested in free recycling</label>
                  {console.log('profile.free_recycling', profile.free_recycling)}
                  <input autoComplete="off"   className="checkbox1" defaultChecked={profile.free_recycling === "Y"? true :false} value={profile.free_recycling === "Y"? "N" :"Y"}  type="checkbox" name="free_recycling" onChange={this.handleInputChange} />
                </div>
                <div className="field-group how-pos4-parent row-list">
                  <label className="cl7 p-l-20 p-r-30 left-label">Prefer someone to visit you at your home to take order</label>
                  <input autoComplete="off"  className="checkbox1" defaultChecked={profile.take_order_from_home === "Y"? true :false} value={profile.take_order_from_home === "Y"? "N" :"Y"} type="checkbox" name="take_order_from_home" onChange={this.handleInputChange}  />
                </div> */}
              </form>
            </div>
                : null}
          </div>
      
        </section>
        {this.state.model ?
          <PopupModal title={this.state.popname} cbHideModal={this.hideModal} >
            {this.state.modelname === "namechange" ? <NameChange {...this.state}   modeldata={this.state.modeldata} nameChange={this.nameChange} handleInputChange={this.handleInputChange} /> : null}
            {this.state.modelname === "email" ? <Email  {...this.state} emailChange={this.emailChange} handleInputChange={this.handleInputChange} /> : null}
            {this.state.modelname === "phone" ?
              <Phone
                {...this.state} newPhoneNumber={this.newPhoneNumber}
                resendOtp={this.resendOtp}
                verifyOtp={this.verifyOtp}
                handleInputChange={this.handleInputChange} /> : null}
          </PopupModal> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    isupdated: state.auth.isupdated,
    added: state.auth.added,
    resend: state.auth.resend,


  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: bindActionCreators(getProfile, dispatch),
    changeEmail: bindActionCreators(changeEmail, dispatch),
    changeName: bindActionCreators(changeName, dispatch),
    changeAndAddNewPhone: bindActionCreators(changeAndAddNewPhone, dispatch),
    changePhoneResendOtp: bindActionCreators(changePhoneResendOtp, dispatch),
    freeRecycling: bindActionCreators(freeRecycling, dispatch),
    takeOrderFromFome: bindActionCreators(takeOrderFromFome, dispatch),
    

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
