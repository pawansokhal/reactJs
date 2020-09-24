import React from 'react';
import { connect } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import { Link, browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { addToCart, getProductReview, addProductReview, updateCart, removeWishList, addToWishList, getProductDetail, getProductForQuickView, getComboProductDetail, fetchCartAndWihslistCount } from '../../actions/products';
import { objectToQueryString, currencySymbol, delcurrencySymbol, metadata } from '../../common/common';
import $ from "jquery";
import ImagesPopup from '../common/imagesPopup';
import ProductImage from './productimage';
import PopupModal from '../common/popupModal';
import ProductReview from './productReview';
import RelatedProducts from './relatedProducts';
import RecentViewProducts from './recentViewProducts';
// import ComboProducts from './comboProducts';
import QuickView from './quickView';
import ComboQuickView from './comboquickView';
import Timeslot from '../../common/timeslot'

/*eslint-disable no-script-url*/
class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoaded: false,
      isOpenLightbox: false,
      model: false,
      productId: this.props.params.id,
      productDetails: [],
      comboproductdetails: [],
      firsttimecall: true,
      rating: '',
      remarks: ''
      // product:"main"
    }
    this.pathname = this.props.location.pathname;
    this.addItemInCart = this.addItemInCart.bind(this);
    this.updateItemInCart = this.updateItemInCart.bind(this);
    this.showModel = this.showModal.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.closeImagePopup = this.closeImagePopup.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addProductReviews = this.addProductReviews.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItemInWishlist = this.addItemInWishlist.bind(this);
    this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
    this.updateItemCount = this.updateItemCount.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);

  }



  handleInputChange(event) {
    event.preventDefault();
    const rating = event.target.dataset.rating ? event.target.dataset.rating : findDOMNode(event.target).parentNode.dataset.rating;
    const ratingName = event.target.dataset.ratingname ? event.target.dataset.ratingname : findDOMNode(event.target).parentNode.dataset.ratingname;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (ratingName === 'review_rating') {
      this.setState({
        rating: rating
      });
    }
    this.setState({
      [name]: value
    });
  }

  onImageClick(event) {
    const index = this.refImageGallery.getCurrentIndex()
    this.setState({
      isOpenLightbox: true,
      photoIndex: index
    })
  }
  updateItemCount(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    let itemCount = event.target.dataset.itemcount
    const doJob = event.target.dataset.do ? event.target.dataset.do : findDOMNode(event.target).parentNode.dataset.do;
    let count = doJob === "plus" ? parseInt(itemCount, 10) >= 1 ? parseInt(itemCount, 10) + 1 : parseInt(itemCount, 10) + 2 : parseInt(itemCount, 10) > 1 ? parseInt(itemCount, 10) - 1 : 1;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    const tempproduct = producttype === "main" ? this.state.productDetails : this.state.productdetailsquickview

    if (producttype === "combo") {
      let temp = this.state.comboproductdetails
      temp.quantity_in_my_cart = count.toString()
      this.setState({
        comboproductdetails: temp,
        quantity: count
      })

    } else {
      tempproduct.quantity_in_my_cart = count.toString()
      if (producttype === "main") {
        if (value) {
          tempproduct.quantity_in_my_cart = value
          count = value
        }
        Object.assign(this.state, {
          productDetails: tempproduct
        })
        this.setState({
          productDetails: tempproduct,
          quantity: count
        })
      } else {
        if (value) {
          tempproduct.quantity_in_my_cart = value
          count = value
        }
        Object.assign(this.state, {
          productdetailsquickview: tempproduct
        })
        this.setState({
          productdetailsquickview: tempproduct,
          quantity: count
        })

      }
    }
    return false;
  }

  closeImagePopup(event) {
    this.setState({
      isOpenLightbox: false
    })
  }

  hideModal() {
    this.setState({ model: false })
  }
  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })
    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "1"
    }
    ReactPixel.fbq('track', 'AddToCart');
    console.log('ReactPixel', ReactPixel)
    this.props.addToCart(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    
  }

  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })

    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "1"
    }
    ReactPixel.fbq('track', 'AddToCart');
    console.log('event', ReactPixel)
    this.props.updateCart(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
  }

  showModal(e) {
    const producttype = e.target.dataset.producttype ? e.target.dataset.producttype : findDOMNode(e.target).parentNode.dataset.producttype;
    const type = e.target.dataset.type
    this.setState({
      product: JSON.parse(e.target.dataset.data),
      producttype: producttype,
      model: true,
      type: type
    });
    Object.assign(this.state, { type: type, product: JSON.parse(e.target.dataset.data), producttype: producttype, model: true })
    let formData = {}
    if (type === "combo") {
      Object.assign(this.state, { comboproductdetails: [] })
      formData = {
        combo_id: JSON.parse(e.target.dataset.data).combo_id
      }
      this.props.getComboProductDetail(objectToQueryString(formData))
    } else {
      Object.assign(this.state, { productdetailsquickview: [] })
      formData = {
        product_id: JSON.parse(e.target.dataset.data).id,
      }
      this.props.getProductForQuickView(objectToQueryString(formData))
    }
  }



  // addItemInWishlist(event) {
  //   event.preventDefault();
  //   const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
  //   const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
  //   const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;


  //   Object.assign(this.state, { type: type, id: id, producttype: producttype })
  //   const formData = {
  //     item_type: type === "combo" ? "combo" : "product",
  //     item_id: id,
  //   }
  //   this.props.addToWishList(objectToQueryString(formData))
  //   this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
  // }
  // removeItemInWishlist(event) {
  //   event.preventDefault();
  //   const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
  //   const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
  //   const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
  //   Object.assign(this.state, { type: type, id: id, producttype: producttype })

  //   this.setState({ disabled: true });
  //   const formData = {
  //     item_type: type === "combo" ? "combo" : "product",
  //     item_id: id,
  //     quantity: 1
  //   }
  //   this.props.removeWishList(objectToQueryString(formData))
  //   this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
  //   return true
  // }

  removeItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: itemID, producttype: producttype })

    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: itemID,
      quantity: 1
    }
    this.props.removeWishList(objectToQueryString(formData))
    const newState = type === "combo" ? this.state.comboproductdetails : this.state.productDetails
    newState.in_my_wishlist = "N";
    if (type === "combo") {
      this.setState({
        comboproductdetails: newState
      })
    } else {
      this.setState({
        productDetails: newState
      })
    }

  }

  addItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: itemID, producttype: producttype })
    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: itemID
    }
    this.props.addToWishList(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    const newState = type === "combo" ? this.state.comboproductdetails : this.state.productDetails
    newState.in_my_wishlist = "Y";
    if (type === "combo") {
      this.setState({
        comboproductdetails: newState
      })
    } else {
      this.setState({
        productDetails: newState
      })
    }
  }

  componentWillMount() {
    const formData = {
      product_id: this.props.params.id,
      page_number: 1,
      number_of_records_needed: 5
    }
    this.props.getProductReview(objectToQueryString(formData))
    this.props.getProductDetail(objectToQueryString(formData))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.addedrating) {
      $("#reviews-add").slideToggle("slow");
      $("#reviews-feed").slideToggle("slow");
      this.setState({
        rating: '',
        remarks: ''
      });
    }

    if (nextProps.isupdated) {

      let formData = {}
      if (this.state.type === 'combo') {
        formData = {
          combo_id: this.state.id
        }
        this.props.getComboProductDetail(objectToQueryString(formData))
        this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
      } else {

        if (this.state.producttype === 'main') {
          formData = {
            product_id: this.state.id
          }
          this.props.getProductDetail(objectToQueryString(formData))
          this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
        } else {
          formData = {
            product_id: this.state.id
          }
          this.props.getProductForQuickView(objectToQueryString(formData))
          this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
        }
      }
    }

    const thisLocationId = (this.props.params.id) ? this.props.params.id : '';
    const nextLocationId = (nextProps.location.pathname) ? nextProps.location.pathname.split("/").splice(-1) : '';

    if (parseInt(thisLocationId, 10) !== parseInt(nextLocationId[0], 10)) {
      this.setState({
        firsttimecall: true,
        productDetails: []
      });
      const formData = {
        product_id: nextLocationId[0],
      }
      $("html, body").animate({ scrollTop: 0 }, 1);
      this.props.getProductReview(objectToQueryString(formData))
      this.props.getProductDetail(objectToQueryString(formData))
      this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    }
    if (nextProps.productDetails.data) {
      if (!Array.isArray(nextProps.productDetails.data) && this.state.firsttimecall && nextProps.productDetails.data) {
        this.setState({
          productDetails: nextProps.productDetails.data,
          firsttimecall: false,
          originalValue: nextProps.productDetails.data.quantity_in_my_cart
        });
        if (!Array.isArray(this.state.productDetails)) {
          let images = [];
          let productDetails = [];
          productDetails = this.state.productDetails
          productDetails.product_images.map((image) => {
            return images.push(image.full_image);
          })
        }
        nextProps.productDetails.data.meta_keywords ?
          metadata(nextProps.productDetails.data.meta_keywords, nextProps.productDetails.data.meta_description)
          : null
      } else {
        if (!Array.isArray(nextProps.productDetails.data) && nextProps.productDetails.data && this.state.producttype === 'main') {
          this.setState({
            productDetails: nextProps.productDetails.data,
            originalValue: nextProps.productDetails.data.quantity_in_my_cart
          });
        }
      }
    }

    if (nextProps.productdetailsquickview) {
      if (!Array.isArray(nextProps.productdetailsquickview.data) && nextProps.productdetailsquickview.data && this.state.producttype === 'sub') {
        this.setState({
          productdetailsquickview: nextProps.productdetailsquickview.data,
          comboproductdetails: {},
          originalValue: nextProps.productdetailsquickview.data.quantity_in_my_cart
        });
      }
    }
    if (nextProps.comboproductdetails) {
      if (!Array.isArray(nextProps.comboproductdetails.data) && nextProps.comboproductdetails.data && this.state.producttype === 'combo') {
        this.setState({
          comboproductdetails: nextProps.comboproductdetails.data,
          originalValue: nextProps.comboproductdetails.data.quantity_in_my_cart
        });
      }
    }
  }
  addProductReviews(event) {
    event.preventDefault();
    const formData = {
      product_id: this.state.productId,
      rating: this.state.rating,
      remarks: this.state.remarks
    }
    this.props.addProductReview(objectToQueryString(formData))
  }
  componentDidMount() {
    $("html, body").animate({ scrollTop: 0 }, 1);      
        const options = {
        autoConfig: true, 	// set pixel's autoConfig
        debug: true, 		// enable logs
        };
    ReactPixel.init('507827629695409', options);
    var allimages = document.getElementsByTagName('img');
    for (var i = 0; i < allimages.length; i++) {
      if (allimages[i].getAttribute('data-src')) {
        allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
      }
    }
  }
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
      pathname: '/login',
      search: '',
      state: { previouspath: this.pathname }
    });
  }
  

  render() {
    let images = [];
    let productDetails = [];
    let productreview = [];
   
    if (!Array.isArray(this.state.productDetails)) {
      productDetails = this.state.productDetails
      productDetails.product_images.map((image) => {

        return images.push(image.full_image);
      })
    }

    // comboproductdetails
    if (this.props.productreview.hasOwnProperty('data')) {
      productreview = this.props.productreview.data
    }

    return (
      <div className="">
        <section className=" content-sec">
          <div className="container">
          <h2 className="inner-title">Product</h2>
          {(localStorage.getItem('catlogid') == 2) ? (<h3 className="alert alert-success wish-alert">Wish to shop plastic free? Go to <u>SurreyWhales</u>.</h3>) :''}
          </div> 
        </section>
        <section id="eye-catcher" className="eye-catcher-sec content-sec">
        
       {/* <Timeslot/> */}
        </section>
        {!Array.isArray(productDetails) ?
          <div className="">
            {/* <div className="container p-t-110">
              <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                <Link to={"/"} className="stext-109 cl8 hov-cl1 trans-04">
                  Home
              <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
                </Link>
                <span className="stext-109 cl4">
                  {productDetails.name}
                </span>
              </div>
            </div> */}
            {/* Product Detail */}
            <section id="section1" className="prodetail-detail-sec content-sec p-b-50 m-t-50">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6  col-md-7 col-sm-7 col-xs-12 detail-left-sec">
                    <div className="image-gallery-content">
                      <div className="image-gallery-thumbnails-wrapper left">
                        {productDetails.product_images ?
                          <ProductImage
                            images={productDetails.product_images}
                            cbOnImageClick={this.onImageClick}
                            refImageGallery={i => this.refImageGallery = i}
                          />
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-5 col-sm-5 col-xs-12 detail-right-sec">
                    <div className="p-r-50 p-t-5 p-lr-0-lg">
                      <h4 className="js-name-detail p-b-15">
                        {productDetails.name}
                      </h4>
                      <span className="product-price">
                        {
                          (parseFloat(productDetails.original_price_per_unit) > parseFloat(productDetails.sale_price_per_unit)) ?
                            <span className="p-r-10"> {delcurrencySymbol(productDetails.original_price_per_unit)}   {currencySymbol(productDetails.sale_price_per_unit)}</span>
                            : <span> {currencySymbol(productDetails.sale_price_per_unit)} </span>
                        }
                      </span>
                      {(localStorage.getItem('cust_id') === null) ? (
                        // <a href="javascript:void(0)" data-producttype="main" data-tooltip={productDetails.in_my_wishlist === "N" ? "Please Login" : "Please Login"} className=" pull-right p-tb-2" onClick={this.redirectToLogin} data-id={productDetails.id}>
                        //   {productDetails.in_my_wishlist === "Y" ?
                        //     <img className="icon-heart1 dis-block trans-04" src="/../images/icons/icon-heart-02.png" data-tooltip="Add to Wishlist" alt="dsd" data-id={productDetails.id} />
                        //     : <img className="icon-heart1 dis-block trans-04" src="/../images/icons/icon-heart-01.png" data-tooltip="Add to Wishlist" alt="sds" data-id={productDetails.id} />}
                        // </a>
                        <a href="javascript:void(0)"  data-producttype="main" data-tooltip={productDetails.in_my_wishlist === "N" ? "Please Login" : "Please Login"} className=" pull-right p-tb-2 wishlist" onClick={this.redirectToLogin} data-id={productDetails.id}>
                          {productDetails.in_my_wishlist === "Y" ?
                            <i className="fa fa-heart" data-tooltip="Add to Wishlist" data-id={productDetails.id} ></i>
                            : <i className="fa fa-heart-o" data-tooltip="Add to Wishlist"  data-id={productDetails.id} ></i>}
                        </a>
                      ) : <a href="javascript:void(0)"   data-producttype="main" data-tooltip={productDetails.in_my_wishlist === "N" ? "Add to Wishlist" : "Remove From Wishlist"} className="pull-right p-tb-2 wishlist" onClick={productDetails.in_my_wishlist === "Y" ? this.removeItemInWishlist : this.addItemInWishlist} data-id={productDetails.id}>
                          {productDetails.in_my_wishlist === "Y" ?
                            <i className="fa fa-heart"  data-tooltip="Add to Wishlist"   data-id={productDetails.id} ></i>
                            : <i className="fa fa-heart-o"  data-tooltip="Add to Wishlist"  data-id={productDetails.id} ></i>}
                        </a>}
                      {/* <a href="javascript:void(0)" data-producttype="main" data-tooltip={productDetails.in_my_wishlist === "N" ? "Add to Wishlist" : "Remove From Wishlist"} className=" cl2 pull-right  fs-14 cl3 trans-04 lh-10 p-lr-40 p-tb-2  tooltip100" onClick={productDetails.in_my_wishlist === "Y" ? this.removeItemInWishlist : this.addItemInWishlist} data-id={productDetails.id}>
                      {productDetails.in_my_wishlist === "Y" ?
                        <img className="icon-heart1 dis-block trans-04" src="/../images/icons/icon-heart-02.png" data-tooltip="Add to Wishlist" alt="dsd" data-id={productDetails.id} />
                        : <img className="icon-heart1 dis-block trans-04" src="/../images/icons/icon-heart-01.png" data-tooltip="Add to Wishlist" alt="sds" data-id={productDetails.id} />}
                    </a> */}
                      <p className="dis-block m-t-10">{productDetails.name}</p>
                      <span className="dis-block"><b>SKU : </b> {productDetails ? productDetails.sku : null}</span>
                      {productDetails.brand_name  ? 
                      <span className="dis-block">
                        <b>Brand : </b> <Link to={"/products?brands_id=" + productDetails.brand_id} className="brand">{productDetails ? productDetails.brand_name : null} </Link>
                      </span>
                      : null}
                      <span className="dis-block">
                        <b>Store : </b> {productDetails.catalogue_name} 
                      </span>
                      <span className="dis-block">
                        <b>Category : </b> 
                        <Link to={"/products?cat_id=" + productDetails.cat_id} className="cat-name">{productDetails ? productDetails.cat_name : null} </Link>
                      </span>
                      {/* <p className="stext-102 cl3 p-t-23">
                        {productDetails.info_text}
                      </p> */}
                      <div className="product-footer dis-block m-t-20">
                        <div className="qty-box m-b-15">
                            <form>
                              <div className="input-group">
                                <span className="input-group-btn">
                                <button type="button" className="btn btn-default btn-number" data-producttype="main" data-do="minus" data-itemcount={productDetails ? productDetails.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={productDetails ? productDetails.id : null} >-</button>
                                  {/* <button type="button" className="btn btn-default btn-number" disabled="disabled" data-type="minus">
                                    <span className="glyphicon glyphicon-minus"></span>
                                  </button> */}
                                </span>
                                {/* <input type="text" className="form-control input-number" value="1" min="1" max="10" /> */}
                                <input data-producttype="main" className="form-control input-number" min="1" max="10" type="number" name="quantity" value={productDetails.quantity_in_my_cart === "0" ? "1" : productDetails.quantity_in_my_cart ? productDetails.quantity_in_my_cart : "1"} data-id={productDetails ? productDetails.id : null} data-itemtype={productDetails.item_type} onChange={this.updateItemCount} />
                                <span className="input-group-btn">
                                  {/* <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                                    <span className="glyphicon glyphicon-plus"></span>
                                  </button> */}
                                  <button type="button" className="btn btn-default btn-number"  data-producttype="main" data-do="plus" data-itemcount={productDetails ? productDetails.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={productDetails.id} >+</button>
                                </span>
                              </div>
                            </form>
                        </div>
                        <button data-producttype="main" onClick={parseInt(this.state.originalValue, 10) > 0 ? this.updateItemInCart : this.addItemInCart} data-id={productDetails.id} className="btn btn-default default-btn addcart-detail">
                          Add to Cart
                        </button>
				            </div>
						 
                      {/* <div className="p-t-33">
                        <div className="flex-w flex-r-m p-b-10">
                          <div className="size-204 flex-w flex-m respon6-next">
                            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                              <button data-producttype="main" data-do="minus" data-itemcount={productDetails ? productDetails.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={productDetails ? productDetails.id : null} className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">-</button>
                              <input data-producttype="main" className="mtext-104 cl3 txt-center num-product" min="1" type="number" name="quantity" value={productDetails.quantity_in_my_cart === "0" ? "1" : productDetails.quantity_in_my_cart ? productDetails.quantity_in_my_cart : "1"} data-id={productDetails ? productDetails.id : null} data-itemtype={productDetails.item_type} onChange={this.updateItemCount} />
                              <button data-producttype="main" data-do="plus" data-itemcount={productDetails ? productDetails.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={productDetails.id} className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">+</button>
                            </div>
                            <button data-producttype="main" onClick={parseInt(this.state.originalValue, 10) > 0 ? this.updateItemInCart : this.addItemInCart} data-id={productDetails.id} className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                              Add to Cart
                            </button>

                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>

             <section className="content-sec p-b-20 product-tabs">
                <div className="container">
                    <div className="panel with-nav-tabs panel-default">
                        <div className="panel-heading">
                          <ul className="nav nav-tabs">
                            <li className="active"><a href="#tab1default" data-toggle="tab">Description</a></li>
                            <li><a href="#tab2default" data-toggle="tab">Reviews</a></li>
                          </ul>
                        </div>
                        <div className="panel-body">
                          <div className="tab-content">
                              <div className="tab-pane fade in active" id="tab1default">
                                <p>
                                  {productDetails.info_text}
                                </p>
                              </div>
                              <div className="tab-pane fade " id="tab2default">
                                <p>
                               
                                </p>
                                {/* <ProductReview {...this.props} cusstate={this.state} addProductReviews={this.addProductReviews} handleInputChange={this.handleInputChange}/> */}
                              </div>
                                {/* <div className="tab-pane fade" id="tab2default"> */}
                                {/* <ProductReview {...this.props} cusstate={this.state} addProductReviews={this.addProductReviews} handleInputChange={this.handleInputChange} /> */}
                                  {/* <div class="review-box">
                                    <span class="review-txt p-r-20">qwretyi</span>
                                    <ul class="rating"><li><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-half-o"></i></li></ul>
                                  </div>
                                  <p class="user-name">Robert Burns</p>
                                                
                                    <form id="reviews-add" class="w-full">
                                      <h3 class="p-b-7 m-t-25">Add a review</h3>
                                      <div class="your-review-sec p-t-10 p-b-23">
                                        <span class="m-r-16">Your Rating</span>
                                        <ul class="rating"><li><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-half-o"></i></li></ul>
                                      </div>
                                      <div class="your-review-sec p-b-10 p-t-20">
                                        <label>Your review</label>
                                        <textarea class="form-control" id="remarks" name="remarks"></textarea>
                                      </div>
                                      <button class="btn btn-default default-btn">Submit</button>
                                    </form> */}
                                  
                                {/* </div> */}
                                
                              </div>
                            </div>
                        </div>
                        {localStorage.getItem('catlogid') === "2" ? 
                        <span >Surrey Whales is not affiliated with or authorised by Tesco.</span>
                        :null}
                    </div>
                </section> 

            {/* <ComboProducts productDetails={this.state.productDetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} /> */}
            {/* <RelatedProducts productDetails={this.state.productDetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} />
            <RecentViewProducts productDetails={this.state.productDetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} /> */}
            {(this.state.isOpenLightbox) &&
              <ImagesPopup images={images} index={this.state.photoIndex.toString()} cbOnCloseRequest={this.closeImagePopup} />
            }
            {this.state.model ?
              <PopupModal title={this.state.popname} size="lg" cbHideModal={this.hideModal} >
                {this.state.type === "combo" ?
                  <ComboQuickView
                    data={this.state.comboproductdetails}
                    csstate={this.state}
                    onImageClick={this.onImageClick}
                    addItemInCart={this.addItemInCart}
                    addItemInWishlist={this.addItemInWishlist}
                    updateItemInCart={this.updateItemInCart}
                    updateItemCount={this.updateItemCount}
                    removeItemInWishlist={this.removeItemInWishlist}
                  />
                  :
                  <QuickView
                    data={this.state.productdetailsquickview}
                    csstate={this.state}
                    onImageClick={this.onImageClick}
                    addItemInCart={this.addItemInCart}
                    addItemInWishlist={this.addItemInWishlist}
                    updateItemInCart={this.updateItemInCart}
                    updateItemCount={this.updateItemCount}
                    removeItemInWishlist={this.removeItemInWishlist}
                  />
                }
              </PopupModal> : null}

          </div>

          : null}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: bindActionCreators(addToCart, dispatch),
    updateCart: bindActionCreators(updateCart, dispatch),
    addToWishList: bindActionCreators(addToWishList, dispatch),
    getProductDetail: bindActionCreators(getProductDetail, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    getProductReview: bindActionCreators(getProductReview, dispatch),
    addProductReview: bindActionCreators(addProductReview, dispatch),
    removeWishList: bindActionCreators(removeWishList, dispatch),
    getComboProductDetail: bindActionCreators(getComboProductDetail, dispatch),
    getProductForQuickView: bindActionCreators(getProductForQuickView, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    isupdated: state.product.isupdated,
    addedrating: state.product.added,
    productsList: state.product.products,
    productDetails: state.product.productdetails,
    categoriesList: state.common.categories,
    productreview: state.product.productreview,
    comboproductdetails: state.product.comboproductdetails,
    productdetailsquickview: state.product.productdetailsquickview,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

// const ProductImages = (props) => {
//   let gallaryImages = []
//   props.images.map(item => {
//     gallaryImages.push({
//       original: item.full_image,
//       thumbnail: item.thumbnail_image,
//     });
//     return true;
//   });
//   return (
//     <div className="col-md- detail-left-sec">
//       <ImageGallery
//         ref={props.refImageGallery}
//         items={gallaryImages}
//         infinite={true}
//         thumbnailPosition="left"
//         showFullscreenButton={false}
//         useBrowserFullscreen={false}
//         showPlayButton={false}
//         lazyLoad={true}
//         onClick={props.cbOnImageClick}
//         useTranslate3D={true}
//       />
//     </div>
//   )

// }
