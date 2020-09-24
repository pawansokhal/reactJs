import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOrders } from '../../actions/orders';
import { objectToQueryString } from '../../common/common';
import $ from "jquery";
/*eslint-disable no-script-url*/
class Orders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: false
    }
    this.orderStatus = this.orderStatus.bind(this);
  }

  componentWillMount() {
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      item_type: "product",
      status: "new"
    }
    this.props.fetchOrders(objectToQueryString(formData))
    $("html, body").animate({ scrollTop: 0 }, 1);
  }
  orderStatus(event) {
   const status = event.target.dataset.status
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      item_type: "product",
      status: status
    }
    this.props.fetchOrders(objectToQueryString(formData))
  }
  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);
  }
  render() {
    let ordersList = [];
    if (this.props.ordersList.hasOwnProperty('data')) {
      ordersList = this.props.ordersList.data
    }
    return (
      <div>
  {/* <div className="container p-t-110 mob-container">
    <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
      <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
        Home
        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
      </a>
      <span className="stext-109 cl4">
        Orders
      </span>
    </div>
  </div> */}
  {/* Product Detail */}
  <section className="orders-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
  <div className="container">
    <div className="panel with-nav-tabs panel-default">
      <div className="panel-heading">
        <ul className="nav nav-tabs">
          <li className="active">
          <a onClick={this.orderStatus}  data-status="new" data-toggle="tab" href="#ordernew" role="tab">New Orders</a></li>
          <li>
            <a data-toggle="tab"  onClick={this.orderStatus} data-status="previous" href="#orderprevious" role="tab">Previous Orders</a>
          </li>
        </ul>
      </div>
      <div className="panel-body">
        <div className="tab-content">
            {ordersList.length ? 
             ordersList.map(function (order, index) {
            return( 
          <div className="tab-pane fade in active" id="ordernew" key={index}>
            <div className="order-box bor10 m-lr-28 p-lr-15-sm m-b-30">
              <div className="order-box-top p-10">
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-6">
                  <Link to={"/orderdetail/"+ order.order_id} className="order-id">Order ID: {order.order_id}</Link>
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-6 text-right">
                    <span className="order-time">Placed: {order.order_status}: {Moment(order.datetime_placed).format('MMM DD, YYYY HH:mm A')}</span>
                    
                    <Link to={"/orderdetail/"+ order.order_id} className="order-id order-id-repeate">Repeat Order</Link>
                  </div>
                </div>
              </div>
              <div className="order-box-main p-10">
              {/* {order.order_status === 'Cancelled' ? <img  className="canceledorder" src="../images/canceled.png" alt="canceled"/> : null} */}
                <div className="order-details">
                  <div className="row p-t-15 p-b-20">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <p className="text-center">
                        <label><strong>Due Amount</strong></label> £ {order.amount_due}</p>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <p className="text-center"><label><strong>Paid Amount</strong></label> £{order.amount_paid}</p>
                    </div>
                  </div>
                  {order.order_status === 'Cancelled' ?  
                    <React.Fragment>
                      <div className="row bs-wizard" style={{borderBottom: 0}}> 
                    <div className={order.order_status === 'Cancelled'  ? "col-xs-4 bs-wizard-step active" : order.order_status === 'Dispatched' ||  order.order_status === 'Delivered' ? "col-xs-4 bs-wizard-step complete" : "col-xs-4 bs-wizard-step disabled"}>
                      <div className="text-center bs-wizard-stepnum">Placed</div>
                      <div className="progress"><div className="progress-bar" /></div>
                      <a href="javascript:void(0)" className="bs-wizard-dot" />
                    </div>
                    <div className={order.order_status === 'Cancelled'  ? "col-xs-4 bs-wizard-step order_cancelled" : "col-xs-4 bs-wizard-step disabled"}>
                      <div className="text-center bs-wizard-stepnum">Cancelled</div>
                      <div className="progress"><div className="progress-bar" /></div>
                      <a href="javascript:void(0)" className="bs-wizard-dot" />
                    </div>
                  </div>
                  </React.Fragment>
                       
                        : 
                  <div className="row bs-wizard" style={{borderBottom: 0}}> 
                    <div className={order.order_status === 'Placed'  ? "col-xs-4 bs-wizard-step active" : order.order_status === 'Dispatched' ||  order.order_status === 'Delivered' ? "col-xs-4 bs-wizard-step complete" : "col-xs-4 bs-wizard-step disabled"}>
                      <div className="text-center bs-wizard-stepnum">Placed</div>
                      <div className="progress"><div className="progress-bar" /></div>
                      <a href="javascript:void(0)" className="bs-wizard-dot" />
                    </div>
                    <div className={order.order_status === 'Dispatched'  ? "col-xs-4 bs-wizard-step active" : order.order_status === 'Delivered' ? "col-xs-4 bs-wizard-step complete" : "col-xs-4 bs-wizard-step disabled"}>
                      <div className="text-center bs-wizard-stepnum">Dispatched</div>
                      <div className="progress"><div className="progress-bar" /></div>
                      <a href="javascript:void(0)" className="bs-wizard-dot" />
                    </div>
                    <div className={order.order_status === 'Delivered'  ? "col-xs-4 bs-wizard-step complete" : "col-xs-4 bs-wizard-step disabled"}>
                      <div className="text-center bs-wizard-stepnum">Delivered</div>
                      <div className="progress"><div className="progress-bar" /></div>
                      <a href="javascript:void(0)" className="bs-wizard-dot" />
                    </div>
                  </div> }
                </div>
              </div>
              <div className="order-box-bottom p-lr-15">
                <div className="row">
                <Link to={"/orderdetail/"+ order.order_id} className="p-10 col-md-5 col-sm-6 col-xs-12" ><button className="btn btn-default detail-btn">View Detail</button></Link>
                  <span className="p-10 col-md-7 col-sm-6 col-xs-12 text-right">
                  <strong className="p-r-5">Order Status: </strong>{order.order_status}</span>
                </div>
              </div>
            </div>
          </div>
          )
        }) : null }
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: bindActionCreators(fetchOrders, dispatch)  
  }
}
function mapStateToProps(state) {
  return {
    ordersList: state.orders.orders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);