import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { verifyOtpKey, resendOtp, signUpUser } from '../../actions/auth';
import { objectToQueryString } from '../../common/common';
import Toastr from 'toastr';
import { browserHistory } from 'react-router';
import MainContainer from '../common/mainContainer';
import DateTimePicker from 'react-datetime';
import ReactPixel from 'react-facebook-pixel';
import Moment from 'moment';
import $ from "jquery";
/*eslint-disable no-script-url*/
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            password: '',
            confirmpassword: '',
            country_id: 0,
            otp:''
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.resendOtpHandle = this.resendOtpHandle.bind(this);
    }

    handleDate(event) {
        if(event.length > 8 || event._isValid) {
        var eighteenYearsAgo = Moment().subtract(18, "years");
        var birthday = Moment(event);
        if (!birthday.isValid()) {
            Toastr.error('invalid date.', 'invalid date');
        }
        else if (eighteenYearsAgo.isAfter(birthday)) {
            this.setState({
                dob : Moment(event).format('YYYY-MM-DD')
              });
        }
        else { 
            Toastr.error('You must be above 18 years of age.', 'Restricted');
        }
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (target.type === 'checkbox') {
            const isChecked = event.target.checked;
            this.setState({
              [name]: isChecked ? "Y":"N"
            });
          } else {
            this.setState({
                [name]: value
            });
            } 
            console.log('state',this.state)

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isadded) {
            this.setState({
                phoneverification: true
            });
        }
        if (nextProps.isupdated) {
            browserHistory.push({
                pathname: '/login',
                search: '',
                state: { previouspath:  '/register' }
               });
        }
    }
    verifyOtp(event) {
        event.preventDefault();
        const formData = {
            verification_pin: this.state.otp,
            phone_number: this.state.phone_number
        }
        this.props.verifyOtpKey(objectToQueryString(formData))
        ReactPixel.fbq('track', 'CompleteRegistration');
        console.log('ReactPixel',ReactPixel)
    }
    resendOtpHandle(event) {
        event.preventDefault();
        const formData = {
            phone_number: this.state.phone_number
        }
        this.props.resendOtp(objectToQueryString(formData))
    }
    handleSubmit(event) {
        console.log('statewe', this.state)
        event.preventDefault();
        if (this.state.password !== this.state.confirmpassword) {
            Toastr.error('Password do not match.', 'Password Error');
            return true;
        }
        this.setState({ disabled: true });
        const formData = {
            first_name: this.state.first_name,
            middle_name: this.state.middle_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            referral_code: this.state.referral_code,
            dob: this.state.dob,
            gender: this.state.gender,
            password: this.state.password,
            take_order_from_home:this.state.take_order_from_home ? this.state.take_order_from_home : "N",
            free_recycling: this.state.free_recycling ? this.state.free_recycling :"N"
        }
        this.props.signUpUser(objectToQueryString(formData))
       
    }
    componentDidMount() {
        $("html, body").animate({ scrollTop: 0 }, 1);
        const options = {
          autoConfig: true, 	// set pixel's autoConfig
          debug: true, 		// enable logs
          };
      ReactPixel.init('507827629695409', options);
     
      }
    render() {
        return (
            <MainContainer>
                  <section className="contact-sec content-sec p-b-50 m-t-50">
                <div className="container">
                <div className="text-center signup-form">
				 
                            {!this.state.phoneverification ?
                             <div id="content-login" className="signup-form-inner">
                                    <form className="form-box" onSubmit={this.handleSubmit} autoComplete="off" >
                                        <h4 className="mtext-105 cl2 txt-center p-b-30">
                                            Register
                                        </h4>
                                      <div className="form-group">
                                            <input autoComplete="off" required className="form-control" type="text" name="first_name" placeholder="First Name" onChange={this.handleInputChange} value={this.props.first_name} />
                                            	<i className="fa fa-user"></i>
                                        </div>
                                      {/* <div className="form-group">
                                            <input autoComplete="off" className=" form-control" type="text" name="middle_name" placeholder="Middle Name" onChange={this.handleInputChange} value={this.props.middle_name} />
                                            <i className="fa fa-user"></i>
                                        </div> */}
                                      <div className="form-group">
                                            <input autoComplete="off" required className="form-control" type="text" name="last_name" placeholder="Last Name" onChange={this.handleInputChange} value={this.props.last_name} />
                                            <i className="fa fa-user"></i>
                                        </div>
                                      <div className="form-group">
                                            <input autoComplete="off" required className=" form-control"  onChange={this.handleInputChange}  maxLength="11" pattern="\d{11}" title="Please enter exactly 10 digits" type="tel"  name="phone_number" placeholder="Phone Number" value={this.props.phone_number} />
                                            <i className="fa fa-phone"></i>
                                        </div>
                                      <div className="form-group">
                                            <input autoComplete="off" required className="form-control"   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  type="email" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.props.email}  />
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                      <div className="form-group">
                                            <input autoComplete="off" className=" form-control" type="text" name="referral_code" placeholder="Referal Code (If Available)" onChange={this.handleInputChange} value={this.props.referral_code} />
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <div className="bor8 m-b-20 how-pos4-parent ">
                                            <DateTimePicker  timeFormat={false}   closeOnSelect={true}   onChange={this.handleDate} inputProps={{ placeholder: 'DOB ', name:'dob', required:true}} className="dob" />
                                            {/* <i className="fa  fa-birthday-cake"></i> */}
                                        </div>
                                        <div className="form-group select-box">
                                            <select required className="form-control" onChange={this.handleInputChange} value={this.props.gender} name="gender">
                                                <option value="">Gender</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                                <option value="NA">Other</option>
                                            </select>
                                        
                                        </div>
                                      <div className="form-group">
                                            <input autoComplete="off" required className=" form-control" type="password" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.props.password} />
                                            <i className="fa fa-lock"></i>
                                        
                                        </div>
                                      <div className="form-group">
                                            <input autoComplete="off" required className="form-control" type="password" name="confirmpassword" placeholder="Retype Password" onChange={this.handleInputChange} value={this.props.confirmpassword} />
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        {/* <div className="form-group ">
                                            <input autoComplete="off"  className="checkbox1" type="checkbox" name="free_recycling" onChange={this.handleInputChange} />
                                        <label htmlFor="freecycling">Interested in free recycling</label>
                                        </div>
                                        <div className="form-group  ">
                                        <input autoComplete="off"  className="checkbox1" type="checkbox" name="take_order_from_home" onChange={this.handleInputChange}  />
                                        <label htmlFor="takeorder">Prefer someone to visit you at your home to take order</label>
                                        </div> */}
                                          <div className="form-group ">
                                        <input autoComplete="off" required className="checkbox1"   type="checkbox" name="free_recycling" onChange={this.handleInputChange} />
                                        <label htmlFor="freecycling">I have read and agree to be bound by the  <Link to="/termsandconditions"> Term & Conditions</Link> </label>
                                    </div>
                                        <input type="submit" id="showregister" className="btn btn-default default-btn" value="Register"/>
                                        {/* <input autoComplete="off" type="submit" id="showregister" className="btn btn-default default-btn btn-submit" defaultValue="Sign Up" /> */}
                                        <div className="flex-w flex-tr">
                                            <p className="input1 bg-none plh1  size-210 text-right p-t-20">Already have an account? <Link to="/login" className="text-danger">Login</Link></p>
                                        </div>
                                        {/*<p className="text-center p-t-20 p-b-10">Not a member? Please Signup</p>*/}
                                    </form>
                                    </div>
                                :

                                <div id="content-register" className="otp-form-inner" onSubmit={this.verifyOtp}>
                                <form className="form-box">
                                  <h3 className="text-center p-b-30">
                                    Enter OTP
                                  </h3>
                                  <div className="form-group">
                                  <input autoComplete="off" className="form-control" type="phone" name="otp" placeholder="OTP" onChange={this.handleInputChange}  value={this.state.otp}/>
                                    <i className="fa fa-phone"></i>
                                    <p className="text-right"><a href="javascript:void(0)" onClick={this.resendOtpHandle} className="text-default">Resend OTP</a></p>
                                  </div>
                                
                                  <input type="submit"  className="btn btn-default default-btn btn-submit" defaultValue="Submit" />
                                  {/*<p className="text-center p-t-20 p-b-10">Not a member? Please Signup</p>*/}
                                </form>
                              </div>
                            }
  
                       </div>
                       </div>
                </section>
            </MainContainer>
        );
    }
}
const mapStateToProps = state => {
    return {
        isadded: state.auth.isadded,
        isupdated: state.auth.isupdated,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: bindActionCreators(signUpUser, dispatch),
        verifyOtpKey: bindActionCreators(verifyOtpKey, dispatch),
        resendOtp: bindActionCreators(resendOtp, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);





