import React, { Component } from 'react';
import DateTimePicker from 'react-datetime';
import { connect } from 'react-redux';
// import $ from "jquery";
// import { findDOMNode } from 'react-dom'
import Moment from 'moment';
import { timeSlot } from '../actions/products';
// import { browserHistory, Link } from 'react-router';
// import { objectToQueryString, generateUniqueDeviceId } from './common';
import { bindActionCreators } from 'redux';
class TimeSlot extends Component {
 

  timeSlotDropDown() {
    let timeslot = []
    if( this.props.timeslot !== undefined) {

    
    if (this.props.timeslot.hasOwnProperty('data')) {
      timeslot = this.props.timeslot.data
    }
    return (
      timeslot.length > 0 ?
        <select className="form-control" name="deliver_by_slot_starting" onChange={this.props.handleInputChange} defaultValue={this.props.deliver_by_slot_starting}>
          <option value="">Select Delivery Time Slot</option>
          {

            timeslot.map(function (time, index) {
              return (
                <option key={index} id={index} value={time.start +" to "+ time.end} >{time.start} - {time.end} </option>
              )
            })
          }
        </select>
        : null
    );
        }
  }
  render() {
    let yesterday = Moment().subtract(0, 'day');
    var farFuture = Moment().add(2, 'week');
    let valid = function (current) {
      return current.isAfter( yesterday ) && current.isBefore(farFuture);
    };

    return (
        <React.Fragment>
          <div className="container" id="zipcode">
            <div className="text-center login-form">
              <form id="zipcod_margin_top" className="form-box" onSubmit={this.props.setTimeSlot}>
                <h3 className="text-center p-b-20">
                  Select Your Time-Slot
            </h3>
                <div className="form-group" >
                <DateTimePicker
                defaultValue={Moment(localStorage.getItem('deliver_date'))}
                dateFormat={"DD/MM/YYYY"}
                  timeFormat={false}
                  isValidDate={valid}
                  closeOnSelect={true}
                  onChange={this.props.handleStartDateTimeChanges}
                  inputProps={{ placeholder: 'Delivery date time ', name: 'deliver_by' }}
                />
                            <i className="fa fa-clock-o" />
                   </div>         
                              <br />
                          {this.timeSlotDropDown()}
                
                <button type="submit" className="btn btn-default default-btn btn-submit">
                  Submit
            </button>
                {/* <p className="text-right p-t-20 grey"><a href="javascript:void(0)" onClick={this.props.hideModal ? this.props.hideModal : this.props.postCode} className="text-danger">Skip</a></p> */}
              </form>
            </div>
          </div>
        </React.Fragment>
    )

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    timeSlot: bindActionCreators(timeSlot, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    timeslot: state.product.timeslot,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeSlot);
