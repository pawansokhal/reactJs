import React from 'react';
import { connect } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import { findDOMNode } from 'react-dom'
import Moment from 'moment';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { addToCart, fetchCartAndWihslistCount, getCartData, updateCart, removeWishList, addToWishList, timeSlot } from '../../actions/products';
import { getAddress, addAddress, searchAddressViaPostCode } from '../../actions/auth';
import { placedOrders, couponsAndOffers } from '../../actions/orders';
import { objectToQueryString, currencySymbol } from '../../common/common';
import PopupModal from '../common/popupModal';
import Coupon from './coupon';
import Timer from '../common/timer';
import Toastr from 'toastr';
import DateTimePicker from 'react-datetime';
//import Timeslot from '../../common/timeslot'
import Strippaymentgateway from './strippaymentgateway'
import AddressMap from '../map/googleplaceaddress';
// import MapContainer from '../map/mapcontainer';
const google = window.google;
/*eslint-disable no-script-url*/
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartdata: [],
      showModal: false,
      lpoint: true,
      coupon_code: '',
      coupon: '',
      // dateTime: Moment(),
      express_delivery_eligibility: '',
      latitude: '',
      longitude: '',
      markers: [],
      showResultsByName: false,
    }
    this.marker = ''
    this.map = ''
    this.searchBox = ''
    this.bounds = ''
    this.pathname = this.props.location.pathname;
    this.updateItemInCart = this.updateItemInCart.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addNewAddress = this.addNewAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItemInWishlist = this.addItemInWishlist.bind(this);
    this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
    this.handleStartDateTimeChanges = this.handleStartDateTimeChanges.bind(this);
    this.applyCoupon = this.applyCoupon.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  removeItemInWishlist(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: 1
    }
    this.props.removeWishList(objectToQueryString(formData))
    return true
  }
  addItemInWishlist(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ id: id });
    const formData = {
      item_type: "product",
      item_id: id
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToWishList(objectToQueryString(formData))
  }
  handleInputChange(event) {
    const target = event.target;
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const itemtype = event.target.dataset.itemtype !== undefined ? event.target.dataset.itemtype : findDOMNode(event.target).parentNode.dataset.itemtype;
    const value = target.value;
    const name = target.name;
    console.log('name,value', name, value)
    Object.assign(this.state, { delivery: target.dataset.delivery })
    if (name === "lpoint") {
      if (!localStorage.getItem('cust_id')) {
        Toastr.error("You need to login to use LPoints", "Please Login", {
          timeOut: 1000
        });
        return false;
      } else {

        this.setState({
          [name]: target.checked ? true : false,
        });
      }

    } else if (name === "qty") {
      const formData = {
        item_type: itemtype,
        item_id: id,
        quantity: value
      }
      setTimeout(
        this.props.updateCart(objectToQueryString(formData)),
        1000);
    } else if (name === 'product_search') {
      if (value.length > 3) {
        let searchProducts = {
          postcode: value
        }
        this.props.searchAddressViaPostCode(objectToQueryString(searchProducts));
        this.setState({
          showResultsByName: true
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  }
  handleFocus(event) {
    event.target.select();
  }
  hideModal() {
    this.setState({ showModal: false })
  }
  showModal(event) {
    const coupon = event.target.dataset.coupon !== undefined ? event.target.dataset.coupon : findDOMNode(event.target).parentNode.dataset.coupon;
    const name = event.target.dataset.name !== undefined ? event.target.dataset.name : findDOMNode(event.target).parentNode.dataset.name;
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const itemtype = event.target.dataset.itemtype !== undefined ? event.target.dataset.itemtype : findDOMNode(event.target).parentNode.dataset.itemtype;
    this.setState({
      showModal: true,
      coupon: coupon,
      modelname: name,
      id: id,
      itemtype: itemtype
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const finalvalue = event.target.dataset.finalvalue !== undefined ? event.target.dataset.finalvalue : findDOMNode(event.target).parentNode.dataset.finalvalue;
	console.log(this.state.deliver_by_slot_starting );
    if (localStorage.getItem('cust_id') && localStorage.getItem('session_key')) {

      if (this.state.address_id) {
        if (localStorage.getItem('strip_token')) {
          const formData = {
            address_id: this.state.address_id,
            use_lpoints: this.state.lpoint ? "Y" : "N",
            referral_code: this.state.referral_code,
            deliver_by: this.state.deliver_by || null,
            //deliver_by_slot_starting: this.state.deliver_by_slot_starting || null,
			deliver_by_slot_starting: this.state.deliver_by_slot_starting+':00' || null,
            coupon_code: this.state.coupon_code,
            customer_special_notes: this.state.customer_special_notes,
            payment_token: localStorage.getItem('strip_token'),
            amount: parseFloat(finalvalue)
          }
		  console.log('formData: ', formData);
          this.props.placedOrders(objectToQueryString(formData))
          localStorage.setItem('order_amount', parseFloat(finalvalue))
        } else {
          Toastr.error("Please fill card information", "Please fill card information!", {
            timeOut: 1000
          })
        }

      } else {
        Toastr.error("Address is mandatory", "Please Select Shipping Address!", {
          timeOut: 1000
        })
      }
    } else {
      browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath: this.pathname }
      });
      // browserHistory.push("/login")
    }
  }
  // addNewAddress(googleaddress, event) {
  //   console.log('event', event, googleaddress)
  //   const formData = {
  //     floor_number: googleaddress.floor_number,
  //     door_number: googleaddress.door_number,
  //     landmark: googleaddress.landmark,
  //     postcode: googleaddress.postcode,
  //     city_town: googleaddress.city_town,
  //     street_address: googleaddress.street_address,
  //     county: googleaddress.county,
  //     state:  googleaddress.state,
  //     country:  googleaddress.country,
  //   }

  //   googleaddress.floor_number? 
  //   this.props.addAddress(objectToQueryString(formData))
  //   : null
  // }

  addNewAddress(event) {
    event.preventDefault();
    const formData = {
      // floor_number: this.state.floor_number,
      door_number: this.state.door_number,
      postcode: this.state.postcode,
      city: this.state.city,
    }
    this.props.addAddress(objectToQueryString(formData))
  }

  componentWillMount() {
    this.props.getCartData()
    this.props.couponsAndOffers()
    if (localStorage.getItem('deliver_date')) {
      const formData = {
        date: Moment(localStorage.getItem('deliver_date')).format('YYYY-MM-DD')
      }
      this.props.timeSlot(objectToQueryString(formData))
    }
    if (localStorage.getItem('cust_id')) {
      const formData = {
        floor_number: this.state.floor_number,
        door_number: this.state.door_number,
        postcode: this.state.postcode,
        landmark: this.state.landmark,
      }
      this.props.getAddress(objectToQueryString(formData))
    }

  }

  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const name = event.target.dataset.name !== undefined ? event.target.dataset.name : findDOMNode(event.target).parentNode.dataset.name;
    const inputname = event.target.name
    const itemtype = event.target.dataset.itemtype !== undefined ? event.target.dataset.itemtype : findDOMNode(event.target).parentNode.dataset.itemtype;
    let itemCount = event.target.dataset.itemcount
    const value = event.target.value;
    let qty = ''
    if (name === 'removefromcart') {
      qty = itemCount > 1 ? (parseInt(itemCount, 10) - 1) : "1"
    } else {
      qty = (parseInt(itemCount, 10) + 1)
      ReactPixel.fbq('track', 'AddToCart');
      console.log('ReactPixel', ReactPixel)
    }
    console.log('event.keyCode', event.keyCode)
    if (inputname === 'qty') {
      this.setState({
        item_type: itemtype,
        item_id: id,
        quantity: value,
      });
      const formData = {
        item_type: itemtype,
        item_id: id,
        quantity: value
      }
      this.state.cartdata.filter((item, index) => {
        if (item.id.toString() === id) {
          const newState = this.state.cartdata;
          newState[index].quantity = value;
          this.setState({
            cartdata: newState
          })
        }
        return false;
      });
     
        // setTimeout(
      //   this.props.updateCart(objectToQueryString(formData)),
      //   5000);
      
    } else {
      const formData = {
        item_type: itemtype,
        item_id: id,
        quantity: qty
      }
      this.props.updateCart(objectToQueryString(formData))
    }

    return true
  }
  updateItemInCartonEnter(event) {
    console.log('event', event.which)
    event.preventDefault();
      // if(event.keyCode === 13) {
        console.log('this.state', this.state)
        const formData = {
          item_type: this.state.item_type,
          item_id:  this.state.item_id,
          quantity: this.state.quantity
        }
        this.props.updateCart(objectToQueryString(formData))

    // } 
    return true
  }
  removeItemFromCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const itemtype = event.target.dataset.itemtype !== undefined ? event.target.dataset.itemtype : findDOMNode(event.target).parentNode.dataset.itemtype;
    this.setState({ showModal: false });
    const formData = {
      item_type: this.state.itemtype,
      item_id: this.state.id,
      quantity: "0",

    }
    this.props.updateCart(objectToQueryString(formData))
    return true
  }


  applyCoupon(event) {
    event.preventDefault();
    const coupon_code = event.target.dataset.coupon_code !== undefined ? event.target.dataset.coupon_code : findDOMNode(event.target).parentNode.dataset.coupon_code;
    const couponindex = event.target.dataset.couponindex !== undefined ? event.target.dataset.couponindex : findDOMNode(event.target).parentNode.dataset.couponindex;
    console.log('couponindex', couponindex)
    this.setState({ coupon_code: coupon_code,   couponindex: couponindex });
    Object.assign(this.handleStartDateTimeChanges, { coupon_code: coupon_code ,   couponindex: couponindex})
    const formData = {
      coupon_code: coupon_code,
    
    }
    this.props.getCartData(objectToQueryString(formData))
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      let address = [];
      if (nextProps.address.hasOwnProperty('data')) {
        address = nextProps.address.data
      }
      this.setState({
        address: address,
        delivery: address.length > 0 ? address[0].express_delivery_eligibility : '',
        address_id: address.length > 0 ? address[0].id : ''
      });
    }



    if (this.state.coupon_code) {
      this.setState({
        cuopen: '', showModal: false
      });
    }
    const formData = {
      item_type: "product",
      coupon_code: this.state.coupon_code
    }
    if (nextProps.isupdated) {
      this.props.getCartData(objectToQueryString(formData))
      this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    }
    if (nextProps.isadded) {
      this.props.getAddress(objectToQueryString(formData))
      this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
      this.hideModal()
    }
    if (nextProps.isOrderAdded) {
      this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
      browserHistory.push("/thanks")
    }
    if (nextProps.cartdata.hasOwnProperty('data')) {
      const cartdata = nextProps.cartdata.data
      this.setState({
        cartdata: cartdata
      });
    }
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

  timeSlotDropDown() {
    let timeslot = []
    if (this.props.timeslot.hasOwnProperty('data')) {
      timeslot = this.props.timeslot.data
    }
    let slot = '';
    if (localStorage.getItem('deliver_by_slot_starting')) {
      slot = localStorage.getItem('deliver_by_slot_starting').split(" to ")
    }

    return (
      timeslot.length > 0 ?
        <div className="">
          <div className="col-md-6 col-xs-12">
            <span className="mtext-101 cl2">
              Slot
            </span>
          </div>
          <div className="col-md-6 col-xs-12">
            <select className="form-control" name="deliver_by_slot_starting" onChange={this.handleInputChange} defaultValue={slot ? slot[0] : this.state.deliver_by_slot_starting}>
              <option value="">Select Delivery Time Slot</option>
              {

                timeslot.map(function (time, index) {
                  return (
                    <option key={index} id={index} value={time.start} >{time.start} - {time.end} </option>
                  )
                })
              }
            </select>
          </div>
        </div>
        : null
    );
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showResultsByName: false,
      });
    }
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const options = {
      autoConfig: true, 	// set pixel's autoConfig
      debug: true, 		// enable logs
      };
  ReactPixel.init('507827629695409', options);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  dropDownProducts(products) {
    if (products !== undefined && products.length > 0) {
      return (
        <div name="customeSerach" ref={this.setWrapperRef} onClick={this.dropdownChange.bind(this)} className="customeSerach">
          {
            products.map(function (productinfo, index) {
              return (
                <div key={index} id={index} data-value={JSON.stringify(productinfo)} data-index={productinfo.id}>
                  <div className="media" data-value={JSON.stringify(productinfo)} data-id={productinfo.id}>
                    <div className="media-left" data-value={JSON.stringify(productinfo)} data-id={productinfo.id}>
                      <img className="media-object product_img" data-value={JSON.stringify(productinfo)} data-id={productinfo.id} alt="..." src={productinfo.thumbnail_image} />
                    </div>
                    <div className="media-right" ata-value={JSON.stringify(productinfo)} data-id={productinfo.id}>
                      <span data-value={JSON.stringify(productinfo)} data-id={productinfo.id}>{productinfo.id}  {productinfo.name} {currencySymbol(productinfo.original_price_per_unit)} </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      );
    } else {
      return products;
    }
  }
  dropdownChange(event) {
    event.preventDefault();
    const target = event.target;
    const val = target.dataset.value;
    const id = target.dataset.id;
    let tempState = this.state.inputvalue;
    if (val !== undefined) {
      if (tempState.length > 0) {
        let idx = tempState.findIndex(x => x.id === id);
        if (idx === -1) {
          tempState.push(Object.assign(JSON.parse(val), { 'display': 'y' }))
        }
        if (idx !== -1 && tempState[idx].display === "n") {
          tempState[idx].display = "y"
          tempState[idx]['qty'] = 0
          tempState[idx]['value'] = 0
          this.setState({
            inputvalue: tempState
          });
        }
      } else {
        tempState.push(Object.assign(JSON.parse(val), { 'display': 'y' }))
      }
      setTimeout(() => {
        this.setState({
          product_search: JSON.parse(val).name,
          showResultsByName: false,
          showResultsBySKU: false,
        });
      }, 20);
    }
  }

  render() {
    let cartdata = [];
    let offersAndCoupons = [];

    if (this.state.cartdata) {
      cartdata = this.state.cartdata
    }
    let address = [];
    address = this.state.address
    let countcart = this.props.cartAndWishlistCount
    let yesterday = Moment().subtract(0, 'day');
    let valid = function (current) {
      return current.isAfter(yesterday);
    };

    if (this.props.offersAndCoupons.hasOwnProperty('data')) {
      offersAndCoupons = this.props.offersAndCoupons.data
    }
    
    let carttotal = this.props.cartdata.cart_total
    let lpointValue = this.props.cartdata.loyalty_points_worth_money
    let couponDiscount = this.props.cartdata.coupon_discount
    let deliveryCharge = this.props.cartdata.delivery_charge
    // let tex = 3.60
    let tax = 0

    // let totalValue = carttotal > lpointValue ?
    //   this.state.lpoint ? (carttotal - couponDiscount - lpointValue + deliveryCharge + tax).toFixed(2)
    //     : (carttotal - couponDiscount + deliveryCharge + tax).toFixed(2)
    //   : !this.state.lpoint ? (carttotal - couponDiscount + deliveryCharge + tax).toFixed(2) : "0"
    let totalValue = carttotal ? (carttotal - couponDiscount + deliveryCharge + tax).toFixed(2)
      : (carttotal - couponDiscount + deliveryCharge + tax).toFixed(2)
    // : !this.state.lpoint ? (carttotal - couponDiscount + deliveryCharge + tax).toFixed(2) : "0"

    // for add addrass
    const searchaddress = this.props.searchaddress;
    const searchResult = this.dropDownProducts(searchaddress)
    console.log('searchResult', searchResult)

    return (
      <div>

        <section className=" content-sec">
          <div className="container">
            <h2 className="inner-title">Cart</h2>
          </div>
        </section>{/*END slider-sec */}
        <section id="eye-catcher" className="eye-catcher-sec content-sec">
          {/*<Timeslot />*/}
        </section>{/*END eye catcher sec */}
        <section id="section1" className="cart-sec content-sec p-b-50 m-t-20">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 breadcrumb-sec">
                {/* <ol className="breadcrumb">
                  <li><a href="javascript:void(0)">Home</a></li>
                  <li><a href="javascript:void(0)">Product</a></li>
                  <li className="active">Cart</li>
                </ol> */}
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12 cart-left-sec">
                <table id="cart" className="table table-hover table-condensed">
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Product</th>
                      <th style={{ width: '10%' }}>Price</th>
                      <th style={{ width: '8%' }}>Quantity</th>
                      <th style={{ width: '22%' }} className="text-center">Subtotal</th>
                      <th style={{ width: '10%' }} />
                    </tr>
                  </thead>
                  <tbody>

                    {cartdata.map(function (cartitem, index) {
                      const totalItem = parseFloat(cartitem.quantity, 10).toFixed(2) * parseFloat(cartitem.sale_price_per_unit, 10).toFixed(2)
                      return (
                        <tr key={index}>
                          <td className="cart-product" data-th="Product" >
                            <div className="row">
                              <h4 className="cart-title-txt-xs">Product</h4>
                              <div className="col-sm-2 col-xs-3 cart-product-img">
                                {/* <Link to={"/product/" + cartitem.id}> */}
                                <Link to={"/product/" + cartitem.slug + "/" + cartitem.id} >
                                  <img src={cartitem.thumbnail_image} alt="IMG" className="img-responsive" />
                                </Link>

                              </div>
                              <div className="col-sm-10 col-xs-9 cart-pro-desc">
                                <h5 className="nomargin">{cartitem.name}</h5>
                                <p className="cart-title"><b>SKU</b>: {cartitem.sku}</p>
                                <p className="cart-title"><b>Store</b>: {cartitem.catalogue_name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="price" data-th="Price"><h4 className="cart-title-txt-xs">Price</h4>£ {cartitem.sale_price_per_unit} </td>
                          <td className="qty" data-th="Quantity">
                            <h4 className="cart-title-txt-xs">Quantity</h4>
                            <form onSubmit={this.updateItemInCartonEnter.bind(this)}>
                            <input max="500" data-id={cartitem ? cartitem.id : null} onFocus={this.handleFocus} data-itemtype={cartitem.item_type} className="form-control text-center" min="1" type="number" name="qty"  value={cartitem.quantity}  onChange={this.updateItemInCart}/>
                            </form>
                          </td>
                          <td data-th="Subtotal" className="sub-total text-center"><h4 className="cart-title-txt-xs">Subtotal</h4>{totalItem ? currencySymbol(totalItem ? totalItem.toFixed(2) : null) : null}</td>
                          <td className="actions" data-th>
                            <li className="logout">
                              {/* <a onClick={this.showModal}  data-name="logout" className="btn btn-block btn-default default-btn">Logout</a> */}
                            </li>
                            <button className="btn btn-danger btn-sm" data-name="cartitem" data-itemtype={cartitem.item_type} onClick={this.showModal} data-id={cartitem ? cartitem.id : null} data-name="removefromcart" data-itemcount={cartitem.quantity}><i className="fa fa-trash-o" /></button>
                          </td>
                        </tr>
                      )
                    }.bind(this))}
                  </tbody>
                  <tfoot>
                    <tr className="visible-xs">
                      <td className="text-center" colSpan={5}><strong>  </strong></td>
                    </tr>
                    <tr>
                      <td>
                        {/* <a href="javascript:void(0)" className="btn btn-warning"><i className="fa fa-angle-left" /> Continue Shopping</a> */}
                      </td>
                      <td className="hidden-600" colSpan={2} />
                      <td className="hidden-600 text-center">{carttotal ? <strong className="hidden-xs">Total {carttotal ? currencySymbol(carttotal ? carttotal : null) : null}</strong> : null}</td>
                      <td>
                        {/* <button type="submit" onClick={this.handleSubmit} disabled={cartdata.length > 0 ? false : true} className={cartdata.length > 0 ? "btn btn-success btn-block" : " disabledcartbutton btn btn-success btn-block"}>
                       Checkout
                </button> */}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                { countcart.data && countcart.data.cart_quantity_of_all_items_total > 0 && offersAndCoupons.length > 0 ?
                    <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                      <div className="flex-w flex-m m-r-20 m-tb-5">
                        <button type="button" onClick={this.showModal} data-coupon={"Y"} className="pull-right btn">
                          Apply coupon
                    </button>
                      </div>
                    </div>
                    : null}
              </div>
              {localStorage.getItem('cust_id') ?
                <div className="col-md-4 col-sm-12 col-xs-12 cart-right-sec">
                  <div className="order-box m-b-20">
                    <div className="order-box-top p-15">
                      <div className="row">
                        <div className="col-md-7 text-cenetr">
                          <h3 className="">ADDRESS</h3>
                        </div>
                        <div className="col-md-5 text-cenetr">


                          <button type="button" onClick={this.showModal} className="btn pull-right"><i className="fa fa-plus" /></button>


                        </div>
                      </div>
                    </div>
                    <div className="order-box-main p-3">
                      <div className="order-details p-lr-15">
                        <div className="row p-t-15">
                          <div className="col-md-12">
                            <div className="icons-left icons-left-full">
                              {/* <i className="fa fa-map-marker" /> */}
                              {
                                address ?
                                  address.map(function (addr, index) {

                                    return (
                                      <div key={index}>
                                        {index === 0 ?
                                          <label><input required className="pull-left" type="radio" name="address_id" data-delivery={addr.express_delivery_eligibility} data-express={addr.express_delivery_eligibility} defaultChecked={addr.id} value={addr.id} onChange={this.handleInputChange} /></label>
                                          :
                                          <label><input required className="pull-left" type="radio" name="address_id" data-delivery={addr.express_delivery_eligibility} value={addr.id} onChange={this.handleInputChange} /></label>
                                        }
                                        <i className="fa fa-map-marker" />
                                        <label>
                                          {/* {addr.landmark.trim()}  */}
                                          {addr.door_number}, {addr.postcode} </label>
											  {/*  <span className={this.state.delivery === "Y" ? "stext-112 text-green" : "stext-112 text-red"}>{addr.id === this.state.address_id ? this.state.delivery === "Y" ? "Express Delivery Eligible" : "Express Delivery Not Eligible" : null} </span> */}
                                        {/* <span className="stext-112 m-l-20">{addr.landmark.trim()} {addr.postcode}</span> */}
                                      </div>
                                    )
                                  }.bind(this)) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : null}
              {carttotal ?
                <div className="col-md-4 col-sm-12 col-xs-12 cart-right-sec pull-right">
                  <div className="cart-total">
                    <div className="totals">
                      <h3 className="p-b-20">CART TOTAL</h3>
                      <div >
                        <br />
                      </div>
                      <div className="totals-item">
                        <label>Subtotal</label>
                        <div className="totals-value" id="cart-subtotal">{carttotal ? currencySymbol(carttotal ? carttotal : null) : null}</div>
                      </div>
                      {/* <div className="totals-item">
                      <label>Tax (5%)</label>
                      <div className="totals-value" id="cart-tax"> {currencySymbol("3.60")}</div>
                    </div> */}
                      {/* <div className="switcher-item">
                        <span className="mtext-101 cl2 lpoint-txt">
                          <label>L Points</label>
                          <div className="totals-value" id="cart-tax"> {lpointValue ? currencySymbol(lpointValue ? lpointValue : 0) : currencySymbol(0)}</div>
                          <div className="ms-switcher size-219 ms-switch-2 totals-value ">
                            <div className="onoffswitch">
                              <input type="checkbox" defaultChecked={this.state.lpoint && localStorage.getItem('cust_id') !== null ? true : false} name="lpoint" value={this.state.lpoint && localStorage.getItem('cust_id') !== null ? true : false} className="onoffswitch-checkbox" id="myonoffswitch01" onChange={this.handleInputChange} />
                              <label className={localStorage.getItem('cust_id') ? "onoffswitch-label" : "onoffswitch-label off"} htmlFor="myonoffswitch01">
                                <span className="onoffswitch-yes">Yes</span>
                                <span className="onoffswitch-no">No</span>
                                <span className="onoffswitch-switch"></span>
                              </label>
                            </div>
                          </div>

                        </span>
                      </div> */}
                      <div className="totals-item">
                        <label>Delivery Charge</label>
                        <div className="totals-value" id="cart-shipping">{currencySymbol(Math.abs(deliveryCharge))}</div>
                      </div>
                     
                      {couponDiscount ?
                       <div className="totals-item">
                       <label> Coupon Discount</label>
                       <ul>
                    {offersAndCoupons.map(function (product, index) {
                      return(
                        this.state.couponindex === index.toString() ?
                      <li key={index} data-coupon_code={product.code} data-couponindex={index} >
                      <img src={product.banner_image_url} alt="bottle" />
                      <div className="checkbox checkbox-info checkbox-circle"  data-coupon_code={product.code} data-couponindex={index} >
                        {/* <input  type="checkbox" defaultChecked={this.props.selected === product.code ? true : false } name="product_name" data-coupon_code={product.code} data-couponindex={index} /> */}
                        <label htmlFor="checkbox">
                        {product.promo_line}
                        </label>
                      </div>
                    </li>: null
                      )
                    }.bind(this)) }
                  </ul> 
                       {/* couponindex */}
                       {/* {offersAndCouponsData} */}
                       {/* {console.log('this.props.offersAndCoupons[this.state.couponindex]', offersAndCoupons[this.state.couponindex])} */}
                       <div className="totals-value" id="cart-shipping">  {couponDiscount ? currencySymbol(couponDiscount) : null} </div>
                     </div>
                      : null}
                      <div className="totals-item totals-item-total">
                        <label>Grand Total</label>
                        <div className="totals-value" id="cart-total">{currencySymbol(totalValue)}</div>
                      </div>
                      <br />
                      <div className="referral-box p-t-27 p-b-25">
                        <div className="row">
                          <div className="col-md-6 col-xs-12">
                            <span className="mtext-101 cl2">
                              Referal Code<br />
                              (If Available)
                             </span>
                          </div>
                          <div className="col-md-6 col-xs-12 p-t-1">
                            <div className="field-input-full">
                              <input type="text" id="referral_code" className=" form-control" name="referral_code" placeholder="Referral Code" onChange={this.handleInputChange} value={this.props.referral_code} />
                              {/* <div className="focus-input1 trans-06"></div> */}
                              <div className="focus-input1 trans-04"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-xs-12">
                          <span className="mtext-101 cl2">
                            Delivery time
                        </span>
                        </div>
                        <div className="col-md-6 col-xs-12 p-t-1">
                          <div className="field-input-full">
                            <DateTimePicker
                              defaultValue={Moment(localStorage.getItem('deliver_date'))}
                              dateFormat={"DD/MM/YYYY"}
                              timeFormat={false}
                              isValidDate={valid}
                              closeOnSelect={true}
                              onChange={this.handleStartDateTimeChanges}
                              inputProps={{ placeholder: 'Delivery date time ', name: 'deliver_by' }}
                            />
                            <div className="focus-input1 trans-04"></div>
                          </div>
                          <br />

                        </div>
                        {this.timeSlotDropDown()}
                      </div>
                    </div>

                    <Strippaymentgateway publishable_key={this.props.cartdata.publishable_key} />
                    <button type="submit" data-finalvalue={totalValue} onClick={this.handleSubmit} disabled={cartdata.length > 0 ? false : true} className={cartdata.length > 0 ? "checkout" : " disabledcartbutton checkout"}>
                      Proceed to Checkout
                </button>
                    {this.state.showModal && this.state.modelname !== "removefromcart" ?
                      <PopupModal title={this.state.popname} size={this.state.coupon === "Y" ? null : '' } cbHideModal={this.hideModal} >
                        {this.state.coupon === "Y" ? <Coupon offersAndCoupons={this.props.offersAndCoupons} applyCoupon={this.applyCoupon} selected={this.state.coupon_code} /> :
                          <div className="bg0 p-t-30 p-b-10 p-lr-25 p-lr-15-lg how-pos3-parent">
                            <div className="row">
                              <div className="col-md-12 add-address-border">
                                <div className="row">
                                  <div className="col-md-12 address-box">
                                    <div className="add-box pull-left">
                                      <h4 className="m-b-20">Add Address</h4>
                                    </div>
                                  </div>
                                </div>
                                <form method="post" className="form-horizontal cart-address-popup" onSubmit={this.addNewAddress}>
                                  <fieldset>
                                    <div className="form-group">
                                      <div className="row">
                                        {/* <div className="col-md-12 login-input">
                                        <div className="field-input-full">
                                        <input type="text" name="product_search" className="input1 bg-none plh1 form-control input-md" placeholder="Address" value={this.props.product_search} onChange={this.handleInputChange} />
                                        {this.state.showResultsByName ? searchResult : null}
                                          <div className="focus-input1 trans-06"></div>
                                        </div>
                                      </div> */}
                                        <div className="col-md-12 login-input">
                                          <div className="field-input-full">
                                            <input type="text" id="address1" className="input1 bg-none plh1 form-control input-md" name="door_number" placeholder="Door number" onChange={this.handleInputChange} value={this.props.door_number} />
                                            <div className="focus-input1 trans-06"></div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 login-input">
                                          <div className="field-input-full">
                                            <input type="text" id="city" className="input1 bg-none plh1 form-control input-md" name="postcode" title="Please enter correct post code" pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$" placeholder="Post Code" required onChange={this.handleInputChange} value={this.props.postcode} />
                                            <div className="focus-input1 trans-06"></div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 login-input">
                                          <div className="field-input-full">
                                            <input type="text" id="address2" className="input1 bg-none plh1 form-control input-md" name="city" placeholder="City" required onChange={this.handleInputChange} value={this.props.city} />
                                            <div className="focus-input1 trans-06"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    {/* <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-12 login-input">
                                      <div className="field-input-full">
                                        <input type="text" id="city" className="input1 bg-none plh1 form-control input-md" name="postcode" title="Please enter correct post code" pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$" placeholder="Post Code" required onChange={this.handleInputChange} value={this.props.postcode} />
                                        <div className="focus-input1 trans-06"></div>
                                      </div>
                                    </div>
                                    <br/>
                                    <div className="col-md-12 login-input">
                                      <div className="field-input-full">
                                        <input type="text" id="state" className="input1 bg-none plh1 form-control input-md" name="landmark" placeholder="Landmark" onChange={this.handleInputChange} value={this.props.landmark} />
                                        <div className="focus-input1 trans-06"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-sm-12 login-input">
                                          <button id="submit" className=" checkout" name="submit" type="submit" >Save Address</button>
                                        </div>
                                      </div>
                                    </div>
                                  </fieldset>
                                </form>
                              </div>
                            </div>
                          </div>
                        }
                      </PopupModal> : null}

                    {this.state.showModal && this.state.modelname === "removefromcart" ?
                      <PopupModal title={"Are you sure to remove product ?"} size={this.state.modelname === "removefromcart" ? "sm" : null} cancelButton={true} cbHideModal={this.hideModal}  >
                        <button className="btn btn-danger btn-sm pull-right" data-name="cartitem" data-itemtype={this.state.item_type} onClick={this.removeItemFromCart} data-id={this.state.id ? this.state.id : null} data-name="removefromcart" ><i className="fa fa-trash-o" /></button>
                      </PopupModal> : null}
                  </div>
                </div> : null}
            </div>
          </div>

        </section>{/*END section 1 */}
      </div>


    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: bindActionCreators(addToCart, dispatch),
    updateCart: bindActionCreators(updateCart, dispatch),
    getCartData: bindActionCreators(getCartData, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    getAddress: bindActionCreators(getAddress, dispatch),
    addAddress: bindActionCreators(addAddress, dispatch),
    placedOrders: bindActionCreators(placedOrders, dispatch),
    addToWishList: bindActionCreators(addToWishList, dispatch),
    removeWishList: bindActionCreators(removeWishList, dispatch),
    couponsAndOffers: bindActionCreators(couponsAndOffers, dispatch),
    timeSlot: bindActionCreators(timeSlot, dispatch),
    searchAddressViaPostCode: bindActionCreators(searchAddressViaPostCode, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    cartdata: state.product.cartdata,
    login: state.auth.authenticated,
    isupdated: state.product.isupdated,
    address: state.auth.address,
    isadded: state.auth.isupdated,
    isOrderAdded: state.orders.isupdated,
    offersAndCoupons: state.orders.offersandcoupons,
    cartAndWishlistCount: state.product.cartcount,
    timeslot: state.product.timeslot,
    searchaddress: state.auth.searchaddress,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);