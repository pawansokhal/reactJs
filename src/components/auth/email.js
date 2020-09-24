import React, { Component } from 'react';
/*eslint-disable no-script-url*/
class Email extends Component {

  render() {
    return (
      <div className=" how-pos3-parent">
      <div className="row">
        <div className="col-md-12 add-address-border">
          <div className="row">
            <div className="col-md-12 address-box">
              <div className="add-box pull-left">
                <h4 className="m-b-20">Update Email</h4>
              </div>
            </div>
          </div>
          <form method="post" className="form-horizontal" onSubmit={this.props.emailChange}>
            <fieldset>
              <div className="form-group">
                  <div className="col-md-12 login-input m-b-15">
                  <div className="field-input-full">
                  <input type="email" id="email2" className=" input1 bg-none plh1 form-control input-md" name="email"  defaultValue={this.props.modeldata}  placeholder="mattsteller@gmail.com" onChange={this.props.handleInputChange} required />
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
        </div>
      </div>
    </div>
    );
  }
}
export default (Email);
