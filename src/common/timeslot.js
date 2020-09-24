import React, { Component } from 'react';
import DateTimePicker from 'react-datetime';
import { connect } from 'react-redux';
import $ from "jquery";
import { findDOMNode } from 'react-dom'
import Moment from 'moment';
import { timeSlot } from '../actions/products';
import { objectToQueryString } from './common';
import PopupModal from '../components/common/popupModal';
import { bindActionCreators } from 'redux';
class TimeSlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartdata: [],
      model: false,
      lpoint: true,
      coupon_code: '',
      coupon: '',
      // dateTime: Moment(),
      express_delivery_eligibility: ''
    }
    this.handleStartDateTimeChanges = this.handleStartDateTimeChanges.bind(this);
    this.timeSlotDropDown = this.timeSlotDropDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setTimeSlot = this.setTimeSlot.bind(this);
  }
  setTimeSlot(event) {
    event.preventDefault();
    if (this.state.deliver_by_slot_starting) {
      localStorage.setItem('deliver_by_slot_starting', this.state.deliver_by_slot_starting);
      localStorage.setItem('deliver_date', this.state.deliver_by);
      setTimeout( function(){
        $('#zipcode').fadeOut(1000);
        this.setState({
          model: false,
        });
       
      }.bind(this) , 1000);
    }
  }
  hideModal() {
    this.setState({ model: false })
  }
  showModal(event) {
    const name = event.target.dataset.name !== undefined ? event.target.dataset.name : findDOMNode(event.target).parentNode.dataset.name;
    this.setState({
      model: true,
      modelname: name,
      isValidaPostcode: "N"
    });
  }
  handleStartDateTimeChanges(event) {
    this.setState({
      deliver_by: Moment(event).format('YYYY-MM-DD'),
      deliver_by_slot_starting: Moment(event).format('HH:mm:ss'),
      // dateTime:event
    });
    const formData = {
      date: Moment(event).format('YYYY-MM-DD')
    }
    this.props.timeSlot(objectToQueryString(formData))
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
   
    this.setState({
      [name]: value
    });
  }

  timeSlotDropDown() {
    let timeslot = []
    console.log('this.props.timeslot', this.props.timeslot)
    if( this.props.timeslot !== undefined) {

    
    if (this.props.timeslot.hasOwnProperty('data')) {
      timeslot = this.props.timeslot.data
    }
    return (
      timeslot.length > 0 ?
        <select className="form-control" name="deliver_by_slot_starting" onChange={this.handleInputChange} defaultValue={this.state.deliver_by_slot_starting}>
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
        {!localStorage.getItem('deliver_by_slot_starting') ? 
        <div className="container">
                            <div className="row"> 
                                <div className="col-md-12">
                                <div className="book-slot-sec">
                                    <div className="book-slot-left">
                                    <h2>Why not book a slot?</h2>
                                    <p>Book a slot now to secure a time convenient for you</p>
                                    </div>
                                    <div className="book-slot-button">
                                    
                                    <a href="javascript:void(0)" onClick={this.showModal} data-name="slot" className="btn btn-danger">Book a slot</a>
                                    </div>
                                </div>  
                                </div>  
                            </div>
                            </div>
  : null}


          {this.state.model ? 
<PopupModal title={this.state.popname}  cbHideModal={this.hideModal} >
<div className="container" id="zipcode">
            <div className="text-center login-form">
              <form id="zipcod_margin_top" className="form-box" onSubmit={this.setTimeSlot}>
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
                  onChange={this.handleStartDateTimeChanges}
                  inputProps={{ placeholder: 'Delivery date time ', name: 'deliver_by' }}
                />
                            <i className="fa fa-clock-o" />
                   </div>         
                              <br />
                          {this.timeSlotDropDown()}
                
                <button className="btn btn-default default-btn btn-submit">
                  Submit
            </button>
                {/* <p className="text-right p-t-20 grey"><a href="javascript:void(0)" onClick={this.props.hideModal ? this.props.hideModal : this.props.postCode} className="text-danger">Skip</a></p> */}
              </form>
            </div>
          </div>
</PopupModal> : null}
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
