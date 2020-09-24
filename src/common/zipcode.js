import React, { Component } from 'react';

class ZipCode extends Component {
  render() {
    return (
        <React.Fragment>
          <div className="container" id="zipcode">
            <div className="text-center login-form">
              <form id="zipcod_margin_top" className="form-box" onSubmit={this.props.handleSubmitZipcode}>
                <h3 className="text-center p-b-20">
                  Enter Your Postcode
                 </h3>
                <div className="form-group" >
                
                  <input id="postcode" className="form-control" maxLength="8" title="Please enter exactly 8 digits" required type="text" name="postcode" placeholder="CR3 0HD" onChange={this.props.handleInputChange} value={this.props.postcode} />
                  <i className="fa fa-map-marker" />
                  {this.props.isValidaPostcode === "Y" ? 
                <div className="pull-right check"><i className="fa fa-check" /></div>
                :  null}
                </div>
              
                <button className="btn btn-default default-btn btn-submit">
                  Submit
            </button>
                <p className="text-right p-t-20 grey"><a href="javascript:void(0)" onClick={this.props.hideModal ? this.props.hideModal : this.props.postCode} className="text-danger">Skip</a></p>
              </form>
            </div>
          </div>
        </React.Fragment>
    )

  }
}

export default(ZipCode);
