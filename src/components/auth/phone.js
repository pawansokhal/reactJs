import React, { Component } from 'react';
/*eslint-disable no-script-url*/
class Phone extends Component {

  render() { 
    return (
      <div className="how-pos3-parent">
      <div className="row">
        <div className="col-md-12 add-address-border">
          <div className="row">
            <div className="col-md-12 address-box">
              <div className="add-box pull-left">
                <h4 className="m-b-20">Update Number</h4>
              </div>
            </div>
          </div>
          <form  id="send-otp" method="post" className="form-horizontal" onSubmit={this.props.newPhoneNumber}>
            <fieldset>
              <div className="form-group">
                  <div className="col-md-12 login-input m-b-15">
                  <div className="field-input-full">
                  <input type="text" id="number" maxLength="11" className="input1 bg-none plh1 form-control input-md" name="phone" value={this.props.phone} placeholder="Phone Number" required  onChange={this.props.handleInputChange}/>
                    <div className="focus-input1 trans-06"></div>
                  </div>
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-sm-12 login-input">
                    <button id="submit" className="btn btn-default default-btn" name="submit" type="submit">Save</button>
                  </div>
              </div>
            </fieldset>
          </form>
          
          <form id="verify-number" method="post" className="form-horizontal" onSubmit={this.props.verifyOtp}>
              <fieldset>
                <div className="form-group">
                    <div className="col-md-12 login-input m-b-15">
                    <div className="field-input-full">
                      <input type="text" id="number-disabled" className="input1 bg-none plh1 form-control input-md" name="city"  placeholder={this.props.phone} disabled />
                      <div className="focus-input1 trans-06"></div>
                    </div>
                    <br/>
                    <div className="field-input-full">
                    <input type="text" id="otp" className="input1 bg-none plh1 form-control input-md" name="otp"  placeholder="OTP" value={this.props.otp} onChange={this.props.handleInputChange}/>
                      <div className="focus-input1 trans-06"></div>
                    </div>
                    {/* <div className="col-md-12 login-input">
                    <div className="field-input-full">
                      <input type="text" id="otp" className="input1 bg-none plh1 form-control input-md" name="otp"  placeholder="OTP" value={this.props.otp} onChange={this.props.handleInputChange}/>
                      <div className="focus-input1 trans-06"></div>
                      </div>
                    </div> */}
                    <a href="javascript:void(0)" onClick={this.props.resendOtp} className="resend pull-right">Resend OTP</a>
                    </div>
                  </div>
                  <div className="form-group">
                  <div className="col-sm-12 login-input">
                    <button id="submit" className="btn btn-default default-btn" name="submit" type="submit">Save</button>
                  </div>
                </div>
                {/* <div className="form-group">
                    <div className="col-sm-12 login-input">
                      <button id="submit3" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" name="submit" type="submit">Verify</button>
                    </div>
                </div> */}
              </fieldset>
            </form>
        </div>
        </div>
          </div>
    );
  }
}
export default (Phone);
