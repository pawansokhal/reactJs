import React from 'react';
import { Link } from 'react-router';
import Moment from 'moment';
import { findDOMNode } from 'react-dom' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOrdersDetails, ordersRatingReview } from '../../actions/orders';
import { objectToQueryString,  currencySymbol  } from '../../common/common';
import Rating from '../common/rating';
import Cancelorder from './cancelorder'
import PopupModal from '../common/popupModal';
import $ from "jquery";
/*eslint-disable no-script-url*/
class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      model: false,
      order_id: this.props.params.id,
      orderproductdetail:[],
      orderid: ''
    }
    this.ratingReviews = this.ratingReviews.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  hideModal() {
    this.setState({ model: false })
  }
  showModal(event) {
    const orderid = event.target.dataset.orderid !== undefined ? event.target.dataset.orderid : findDOMNode(event.target).parentNode.dataset.orderid;
    this.setState({
        model: true,
        orderid:orderid
      });
  }

  componentWillMount() {
    const formData = {
      order_id: this.state.order_id
    }
    this.props.fetchOrdersDetails(objectToQueryString(formData))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderproductdetail) {
      this.setState({
        orderproductdetail: nextProps.orderproductdetail
      }); 
    }
    if (nextProps.isupdated) {
      const formData = {
        order_id: this.state.order_id
      }
      this.setState({
        model: false,
        orderid:''
      });
      this.props.fetchOrdersDetails(objectToQueryString(formData))
    }
}
cancelOrder() {
  this.props.cancelOrder()
}
handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
}
ratingReviews(event) {
  event.preventDefault();
  const formData = {
    order_id: this.state.order_id,
    review_rating: this.state.review_rating,
    review_remarks: this.state.review_remarks,
    review_delivery_rating: this.state.review_delivery_rating
  }
  this.props.ordersRatingReview(objectToQueryString(formData))
}
componentDidMount() {
  $("html, body").animate({ scrollTop: 0 }, 1);
}
  render() {
    let detail = [];
    if (this.state.orderproductdetail.hasOwnProperty('data')) {
      detail = this.state.orderproductdetail.data
     
    }
    
    return (
  <section id="section1" className="cart-sec content-sec p-b-50 m-t-20">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 breadcrumb-sec">
      {/* <ol className="breadcrumb">
          <li>  <Link href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className=" m-l-9 m-r-10" aria-hidden="true" />
          </Link></li>
          <li><Link href="/orders" className="stext-109 cl8 hov-cl1 trans-04">
            Orders
            <i className=" m-l-9 m-r-10" aria-hidden="true" />
          </Link></li>
          <li className="active">  {!Array.isArray(detail) ?  detail.order_id : null}</li>
        </ol> */}
      </div>
      <div className="col-md-8 col-sm-12 col-xs-12 cart-left-sec"> 
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr className="table_head">
              <th width={180}>Details</th>
              <th />
              <th className="column-4">
               {/* <Link to={"/orderdetail/"+ detail.order_id} className="order-id pull-right">Repeat Order</Link> */}
                 {detail.order_status === 'Cancelled' ? <img  className="canceledorderdetail" src="../images/canceledr.png" alt="canceled"/> : null}</th>
            </tr>
          </thead>
          <tbody>
          {detail.hasOwnProperty('order_items') ?  
                      detail.order_items.map(function(item, index) {
                       return(
                            <tr>
                              <td className="cart-product" data-th="Product" key={index}>
                                <div className="how-itemcart1">
                                <img src={item.thumbnail_image} alt="IMG" />
                                </div>
                              </td>
                              <td className="price">{item.item_name}<br/>
                              <span>Store:Tesco</span>
                              </td>
                              <td className="qty">
                                <span>{item.quantity}<small>£{item.sale_price_per_unit}/Unit</small></span>
                              </td>
                            </tr>
                          )
              }
              
            ) : null
          }
          </tbody>
          <tfoot className="tfoot">
            <tr>
              <th className="column-1">Sub Total</th>
              <td className="column-2" />
              <td className="column-4">£ { detail.order_amount}</td>
            </tr>
            <tr>
              <th className="column-1">Delivery Charges</th>
              <td className="column-2" />
              <td className="column-4">£{ detail.delivery_charges}</td>
            </tr>
            <tr>
              <th className="column-1">Loyality Discount</th>
              <td className="column-2" />
              <td className="column-4"> £{ detail.loyalty_discount}</td>
            </tr>
            <tr>
              <th className="column-1">Order Total</th>
              <td className="column-2" />
              <td className="column-4">£ { detail.order_amount} </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="col-md-4 col-sm-12 col-xs-12 cart-right-sec">
        <div className="order-box m-b-20">
          <div className="order-box-top p-15">
            <div className="row">
              <div className="col-md-5">
                <div className="m-r-8 m-tb-4 oredr-no">{detail.order_id}</div>
              </div>
              <div className="col-md-7 text-right">
                <span className="pt-3">{Moment(detail.order_time).format('HH:mm A, MMM DD, YYYY')}</span>
              </div>
            </div>
          </div>
          <div className="order-box-main p-3">
            <div className="order-details p-lr-15">
              <div className="row p-t-15">
                <div className="col-md-12">
                {detail.address? 
                  <div className="icons-left icons-left-full">
                    <i className="fa fa-map-marker" />
                    <label> {detail.address.door_number}, {detail.address.floor_number}, {detail.address.landmark}, {detail.address.postcode}  </label>
                  </div>
                  : null}
                </div>
                <div className="col-md-4">
                  <div className="icons-left">
                    <i className="fa fa-clock-o" /> 
                    <label>ASAP</label>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="icons-left">
                    <i className="fa fa-calendar" /> 
                    <label> {Moment(detail.order_time).format('MMMM DD, YYYY')}</label> 
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icons-left">
                    <i className="fa fa-shopping-bag" /> 
                    <label>{detail.number_of_items}</label>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="icons-left">
                    <label><span><strong> {currencySymbol(detail.order_amount)} </strong></span></label>
                   
                  </div>
                </div>
                <div className="col-md-12 transition-id">
                  <label><strong>Transaction ID:</strong> <span>{detail.transaction_id}</span></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="p-t-35 p-b-85">
        {detail.can_be_cancelled === 'Y'? 
                <button onClick={this.showModal} type="button" data-orderid={detail.order_id} className="btn btn-block default-btn btn-submit">
                Cancel
              </button>
              : null}
              .
              
        </form>
      </div>
    </div>{/* cart Content END */}
  </div>
     {this.state.model ?
        <PopupModal title={this.state.popname} title="Cancel Order" cbHideModal={this.hideModal} >    
          <Cancelorder  orderid={this.state.orderid}/>
        </PopupModal>
        : null}
</section>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersDetails: bindActionCreators(fetchOrdersDetails, dispatch),
    ordersRatingReview: bindActionCreators(ordersRatingReview, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    orderproductdetail: state.orders.orderproductdetail,
    isupdated: state.orders.isupdated,
    login: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
