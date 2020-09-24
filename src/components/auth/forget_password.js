import React, { Component } from 'react';
/*eslint-disable no-script-url*/
class ForgetPassword extends Component {

  render() { 
    return (
      <div className="container">
        <div className=" add-address-border">
          <div className="row">
            <div className="col-md-12 address-box">
              <div className="add-box pull-left">
                <h4 className="m-b-20">Change Number</h4>
              </div>
            </div>
          </div>
          <div className="form-wrap">	
            <form id="send-otp" method="post" className="form-box otp-form" onSubmit={this.props.newPhoneNumber}>
              <fieldset >
                <div className="form-group">
                      <input type="text" id="number" maxLength="11" className="form-control" name="phone" defaultvlaue={this.props.phone} placeholder="Phone Number" required  onChange={this.props.handleInputChange}/>
                      <i className="fa fa-phone"/>
                </div>
                <div className="form-group">
                      <button id="submit2" className="btn btn-default default-btn btn-submit" name="submit" type="submit">Send OTP</button>
                </div>
              </fieldset>
            </form>
            <form id="verify-number" method="post" className="form-box" onSubmit={this.props.verifyOtp}>
              <fieldset>
                <div className="form-group">
                      <input type="text" id="number-disabled" className="form-control" name="city"  placeholder={this.props.phone} disabled />
                      <i className="fa fa-phone"/>
                    </div>
                    <div className="form-group">
                      <input type="text" id="otp1" className="form-control" name="otp"  placeholder="OTP" defaultvlaue={this.props.otp} onChange={this.props.handleInputChange}/>
                      <i className="fa fa-lock"/>
                      <a href="javascript:void(0)" onClick={this.props.resendOtp} className="resend pull-right">Resend OTP</a>
                    </div>
                  
                  
                <div className="form-group">
                      <button id="submit3" className="btn btn-default default-btn btn-submit" name="submit" type="submit">Verify</button>
                </div>
              </fieldset>
            </form>
            <form id="reset-password" method="post" className="form-box" onSubmit={this.props.resetPassword}>
              <fieldset>
                <div className="form-group">
                  
                    <input type="text" id="otp2" className="form-control" name="new_password"  placeholder="New Password" defaultvlaue={this.props.new_password ? this.props.new_password : '' } onChange={this.props.handleInputChange}/>
                    <i className="fa fa-phone"/>
                    </div>
                    <div className="form-group">
                      <input type="text" id="otp" className="form-control" name="otp"  placeholder="OTP" readOnly value={this.props.otp ? this.props.otp : '' } onChange={this.props.handleInputChange}/>
                      <i className="fa fa-lock"/>
                      </div>
                      {/* <a href="javascript:void(0)" onClick={this.props.resendOtp} className="resend pull-right">Resend OTP</a> */}
                <div className="form-group">
                      <button id="submit4" className="btn btn-default default-btn btn-submit" name="submit" type="submit">Verify</button>
                </div>
              </fieldset>
            </form>
          </div>	
        </div>
    </div>


    );
  }
}
export default (ForgetPassword);
