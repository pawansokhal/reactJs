import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cancelOrder, fetchCancellationReasonsList } from '../../actions/orders';
import { objectToQueryString } from '../../common/common';
import $ from "jquery";
/*eslint-disable no-script-url*/
class CancelOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,

        }
        this.orderid = this.props.orderid
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.fetchCancellationReasonsList()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }
    dropDownReason() {
        let cancelreasons = ''
        if (this.props.cancelreasons.hasOwnProperty('data')) {
            cancelreasons = this.props.cancelreasons.data
        }
        return (
            <select required="required" className="form-control" name="cancellation_reason" onChange={this.handleInputChange} value={this.props.cancellation_reason}>
                <option value="">Select Reason</option>
                {
                    Array.isArray(cancelreasons) ?
                        cancelreasons.map(function (reason, index) {
                            return (
                                <option key={index} id={index} value={reason.id} >{reason.reason} </option>
                            )
                        }) : null
                }
            </select>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            cancellation_reason: this.state.cancellation_reason,
            order_id: this.orderid,
            remarks: this.state.remarks
        }
        this.props.cancelOrder(objectToQueryString(formData))
    }
    componentDidMount() {
        $("html, body").animate({ scrollTop: 0 }, 1);
    }
    render() {
        return (
        
            <div id="content-login" className="signup-form-inner">
                <form className=" bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" onSubmit={this.handleSubmit}>
                    <h4 className="mtext-105 cl2 txt-center p-b-30">
                        Cancel Order
                                        </h4>
                    {this.dropDownReason()}
                    <div className="form-group">
                        <textarea required className="form-control" type="text" name="remarks" placeholder="Remarks" onChange={this.handleInputChange} value={this.props.remarks} />
                        <div className="focus-input1 trans-04"></div>
                    </div>
                    <input type="submit" id="showregister" className="btn btn-default default-btn btn-submit" defaultValue="Submit" />
                </form>
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {
        cancelreasons: state.orders.cancelreasons,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        cancelOrder: bindActionCreators(cancelOrder, dispatch),
        fetchCancellationReasonsList: bindActionCreators(fetchCancellationReasonsList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder);





