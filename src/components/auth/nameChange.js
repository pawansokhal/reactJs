import React, { Component } from 'react';
/*eslint-disable no-script-url*/
class NameChanges extends Component {

  render() {
     let namedata = this.props.modeldata
    
    return (
          <div className=" how-pos3-parent">
            <div className="row">
              <div className="col-md-12 add-address-border">
                <div className="row">
                  <div className="col-md-12 address-box">
                    <div className="add-box pull-left">
                      <h4 className="m-b-20">Change Name</h4>
                    </div>
                  </div>
                </div>
                <form method="post" className="form-horizontal" onSubmit={this.props.nameChange}>
                  <fieldset>
                    <div className="form-group">
                        <div className="col-md-12 login-input m-b-15">
                        <div className="field-input-full">
                          <input type="text" id="fname" className="input1 bg-none plh1 form-control input-md" name="first_name"  defaultValue={namedata.first_name} placeholder="First Name" required  onChange={this.props.handleInputChange} />
                          <div className="focus-input1 trans-06"></div>
                        </div>
                        </div>
                        <div className="col-md-12 login-input m-b-15">
                        <div className="field-input-full">
                          <input type="text" id="mname" className="input1 bg-none plh1 form-control input-md" name="middle_name"   defaultValue={namedata.middle_name} placeholder="Middle Name"  onChange={this.props.handleInputChange} />
                          <div className="focus-input1 trans-06"></div>
                        </div>
                        </div>
                        <div className="col-md-12 login-input m-b-15">
                        <div className="field-input-full">
                          <input type="text" id="lname" className=" input1 bg-none plh1 form-control input-md" name="last_name"  defaultValue={namedata.last_name} placeholder="Last Name" required onChange={this.props.handleInputChange} />
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
export default (NameChanges);
