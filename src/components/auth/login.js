import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainContainer from '../common/mainContainer'; 
import { browserHistory, Link } from 'react-router';  
import { getProfile, loginUser, sendOtpForForgetPassword, resendOtpForForgetPassword, verifyOtpForForgetPassword, resetPassword } from '../../actions/auth';
import { fetchCartAndWihslistCount} from '../../actions/products';
import { objectToQueryString } from '../../common/common';
import PopupModal from '../common/popupModal';
import ForgetPassword from './forget_password';
import $ from "jquery";
/*eslint-disable no-script-url*/
class Login extends Component {
  constructor(props){
    super(props)
    this.state  = {
      disabled:false,
      username:'',
      userpassword:'',
      rendernoturl:['/register', '/login', '/thanks']
    }
    this.urlassgin =''
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.sendOtp = this.sendOtp.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
    this.resetPasswordForgetPassword = this.resetPasswordForgetPassword.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    this.setState({
      [name] : value
  });
    
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

  sendOtp(event) {
    event.preventDefault();
    const formData = {
      phone_number: this.state.phone
    }
    this.props.sendOtpForForgetPassword(objectToQueryString(formData))
  }

  resendOtp(event) {
    event.preventDefault();
    const formData = {
      cust_id: localStorage.getItem('cust_id')
    }
    
    this.props.resendOtpForForgetPassword(objectToQueryString(formData))
  }
  verifyOtp(event) {
    event.preventDefault();
    const formData = {
      otp: this.state.otp,
      cust_id: localStorage.getItem('cust_id')
    }
    this.props.verifyOtpForForgetPassword(objectToQueryString(formData))
  }
  resetPasswordForgetPassword(event) {
    event.preventDefault();
    const formData = {
      new_password: this.state.new_password,
      cust_id: localStorage.getItem('cust_id'),
      otp: this.state.otp
    }
    this.props.resetPassword(objectToQueryString(formData))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdated) {
      this.setState({
        model: false,
        modeldata: null,
        modelname: null,
        phone: '',
        email: '',
        otp: '',
      });
      $("#verify-number").slideToggle();
      $("#send-otp").slideToggle();
      $("#reset-password").slideToggle();
    }

    if (nextProps.otpsend) {
      localStorage.setItem('cust_id', nextProps.custId.cust_id);
      
      setTimeout( function(){$('#verify-number').fadeIn( "slow" );} , 1000);
      setTimeout( function(){} , 1000);
      $('#send-otp').fadeOut( "slow" );
     
      
    }
    if (nextProps.verifyotp) {
      setTimeout( function(){$('#reset-password').fadeIn( "slow" );} , 1000);
      setTimeout( function(){} , 1000);
      $('#verify-number').fadeOut( "slow" );
      // setTimeout( function(){} , 1000);
      // $('#verify-number').fadeOut( "slow" );
      // setTimeout( function(){} , 1000);
      // $('#reset-password').fadeIn( "slow" );
    
     
      // $("#verify-number").slideToggle();
      // $("#reset-password").slideToggle();
    }
    if (nextProps.authenticated && nextProps.userData !== null) {
   
      localStorage.setItem('cust_id', nextProps.userData.data.cust_id);
      localStorage.setItem('session_key', nextProps.userData.data.session_key);
      if(nextProps.userData.data.cust_id) {
        
     $('#menu_links').hide() 
        const formData = {
          cust_id: localStorage.getItem('cust_id'),
          session_key: localStorage.getItem('session_key'),
        }
        this.props.fetchCartAndWihslistCount()
        if( localStorage.getItem('name') === null) {
          this.props.getProfile(objectToQueryString(formData))
        }
      }
          if(this.props.location.state !== '' && this.props.location.state !== undefined){
              let url=  this.props.location.state.previouspath; 
              let redirect = this.state.rendernoturl.includes(url)
              if(redirect) {
                browserHistory.go(-3);
              } else {
                
                browserHistory.goBack();
              }
          }else{   
               browserHistory.push('/');
          }
    }
   
}

  handleSubmit(event){
    event.preventDefault();
    this.setState({disabled:true});
    const formData = {
      phone_number: this.state.username,
      password: this.state.password,
      fcm_id: 1,
      version_number: 1.0,
      deviceOS: "web",
  }
    this.props.loginUser(objectToQueryString(formData))
  }
  render() {
    return (
      <MainContainer>
      <section className="contact-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
  <div className="container">
    <div className="text-center login-form">
      <form className="form-box" onSubmit={this.handleSubmit}>
        <h3 className="text-center p-b-30">
          Login
        </h3>
        <div className="form-group" >
          <input className="form-control"  required   type="text" name="username" placeholder="Username" onChange={this.handleInputChange} value={this.props.username}/>
          <i className="fa fa-phone"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password"  required placeholder="Password" onChange={this.handleInputChange} value={this.props.password} />
          <i className="fa fa-lock" />
        </div>
        <button className="btn btn-default default-btn btn-submit">
          Submit
        </button>
        <div className="form-group">
          <p className="text-right p-t-20"><a href="javascript:void(0)" onClick={this.showModal} className="text-danger">Forgot Password?</a></p>
        </div>
        <p className="text-center p-t-20 p-b-10">Not a member? Please Register</p>
        <Link to="/register" className="btn btn-default default-btn">Register</Link>
      </form>
    </div>		
  </div>
</section>
{/* </MainContainer> 
       <MainContainer>
      {/* <div className="container">
        <div className="flex-w flex-tr">
          <div className="size-110 text-center login-form">
            <form className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" onSubmit={this.handleSubmit}>
              <h4 className="mtext-105 cl2 txt-center p-b-30">
                Login
              </h4>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input className="input1 bg-none plh1 stext-111 cl2 plh3 size-116 p-l-62 p-r-30" maxLength="11" pattern="\d{11}" title="Please enter exactly 10 digits" required   type="tel" name="phone_number" placeholder="Phone Number" onChange={this.handleInputChange} value={this.props.phone_number}/>
                <div className="focus-input1 trans-04"></div>
                <img className="how-pos4 pointer-none" src="images/icons/icon-phone.png" alt="ICON" />
                
              </div>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input className="input1 bg-none plh1  stext-111 cl2 plh3 size-116 p-l-62 p-r-30"  required type="password" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.props.password} />
                <div className="focus-input1 trans-04"></div>
                <img className=" how-pos4 pointer-none how-pos-password" src="images/icons/lock.png" alt="ICON" />
                
              </div>
              <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                Submit
              </button>
              <div className="flex-w flex-tr forgot-text-link pull-right">
                <p className="text-right p-t-20 "><a href="javascript:void(0)" onClick={this.showModal} className="text-danger">Forgot Password?</a></p>
              </div><br/>
              <p className="text-center p-t-20 not-member p-b-10">Not a member? Please Signup</p>
              <Link to="/register" className="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn1 p-lr-15 trans-04 pointer">Sign Up</Link>
            </form>
          </div>
          </div>
          </div> */}
          {this.state.model ?
          <PopupModal title={this.state.popname} cbHideModal={this.hideModal} >
              <ForgetPassword
                {...this.state} newPhoneNumber={this.sendOtp}
                resendOtp={this.resendOtp}
                verifyOtp={this.verifyOtp}
                resetPassword={this.resetPasswordForgetPassword}
                handleInputChange={this.handleInputChange} />
          </PopupModal> : null}
      </MainContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    userData: state.auth.loginUser,
    otpsend: state.auth.otpsend,
    resend: state.auth.resend,
    verifyotp: state.auth.verifyotp,
    custId: state.auth.cust_id,
    isupdated: state.auth.isupdated,

  };
}
 const mapDispatchToProps = (dispatch) => {
        return {
          getProfile: bindActionCreators(getProfile, dispatch),
          fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
          loginUser: bindActionCreators(loginUser, dispatch),
          sendOtpForForgetPassword: bindActionCreators(sendOtpForForgetPassword, dispatch),
          resendOtpForForgetPassword: bindActionCreators(resendOtpForForgetPassword, dispatch),
          verifyOtpForForgetPassword: bindActionCreators(verifyOtpForForgetPassword, dispatch),
          resetPassword: bindActionCreators(resetPassword, dispatch),
        }
    }

export default connect(mapStateToProps, mapDispatchToProps )(Login);
