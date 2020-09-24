import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';  
import { changePassword } from '../../actions/auth';
import { objectToQueryString } from '../../common/common';
import Toastr from 'toastr';
class ResetPassword extends Component {
    constructor(props){
        super(props)
        this.state  = {
            otp:'email',
            newpassword:''
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this); 
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isupdated) {
            browserHistory.push("/login")
        }
    }
    handleSubmit(event){
        event.preventDefault();
        if (this.state.new_password !== this.state.confirm_password) {
            Toastr.error('Password do not match.', 'Password Error');
            return true;
        }
        const formData = {
            cust_id: localStorage.getItem('cust_id'),
            session_key: localStorage.getItem('session_key'),
            previous_password: this.state.previous_password,
            new_password: this.state.new_password
        }
        this.props.changePassword(objectToQueryString(formData)) 
    }

    render() {
        return (
            <div>
            <div className="container p-t-110">
              <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
                <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
                  Home
                  <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
                </Link>
                <span className="stext-109 cl4">
                  Change Password
                </span>
              </div>
            </div>
            {/* Product Detail */}
            <div className="bg0 p-t-80 p-b-60">
              <div className="container">
                <div className="shipping-address">
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mt-4">Change Password</h4>
                    </div>
                  </div>
                  <form className="reset-password-form" onSubmit={this.handleSubmit}>
                  <div className="address-detail m-t-20">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12 login-input">
							 <div className="field-input-full">
                              <input type="Password" id="password" className="input1 bg-none plh1 form-control input-md" name="previous_password"  placeholder="Old Password" required  onChange={this.handleInputChange} value={this.props.previous_password}/>
							  <div className="focus-input1 trans-06"></div>
							 </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12 login-input">
							 <div className="field-input-full">
                              <input type="Password" id="password1" className="input1 bg-none plh1 form-control input-md" name="new_password"  placeholder="New Password" required onChange={this.handleInputChange} value={this.props.new_password} />
							  <div className="focus-input1 trans-06"></div>
							 </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12 login-input">
							 <div className="field-input-full">
                              <input type="Password" id="password2" className="input1 bg-none plh1 form-control input-md" name="confirm_password"  placeholder="Confirm Password" required onChange={this.handleInputChange} value={this.props.confirm_password} />
							  <div className="focus-input1 trans-06"></div>
							 </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 text-right edit-box">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-sm-12 login-input">
                              <button id="submit" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15" name="submit" type="submit">Update</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
              </div>
          </div>
               
        );
    }
}

const mapStateToProps = state => {
  return {
    isupdated: state.auth.isupdated,
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: bindActionCreators(changePassword, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(ResetPassword);
