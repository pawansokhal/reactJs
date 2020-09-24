import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
class SingleDatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      startDate: moment().subtract(29, 'days'),
    };
  }

  handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
    });
    this.props.handleDate(picker.startDate.format('Y-MM-DD'))
  }

  render() {
    let label = this.props.dateforupdate ? moment(this.props.dateforupdate).format('DD-MMM-YY') : this.state.startDate.format('DD-MMM-YY');
    let locale = {
      format: 'YYYY-MM-DD',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };

    let buttonStyle = { width: '100%' };

    return (
      <div className={this.props.class ? this.props.class : " form-group col-md-3"} >
        {this.props.LabelName ?
          <label htmlFor="exampleInputdestination">{this.props.LabelName}</label>
          : " "}
          <DatetimeRangePicker startDate="1/1/2014" endDate="3/1/2014">
        <button>Click Me To Open Picker!</button>
      </DatetimeRangePicker>
        <DatetimeRangePicker
          singleDatePicker
          showDropdowns
          locale={locale}
          maxDate={moment(new Date())}
          startDate={this.state.startDate}
          onEvent={this.handleEvent}
        >
          {/* <Button className="selected-date-range-btn" style={buttonStyle}>
            <div className="pull-left">
              <i className="fa fa-calendar" />
              &nbsp;
                <span>
                {label}
              </span>
            </div>
            <div className="pull-right">
              <i className="fa fa-angle-down" />
            </div>
          </Button> */}
        </DatetimeRangePicker>
      </div>
    );
  }

}

export default SingleDatePicker;