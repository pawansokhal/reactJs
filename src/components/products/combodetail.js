import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { addToCart, getProductReview, addProductReview, updateCart, removeWishList, addToWishList, getProductDetail, getProductForQuickView, getComboProductDetail, fetchCartAndWihslistCount } from '../../actions/products';
import { objectToQueryString, currencySymbol, delcurrencySymbol, metadata } from '../../common/common';
import $ from "jquery";
import ImagesPopup from '../common/imagesPopup';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import PopupModal from '../common/popupModal';
import RelatedProducts from './relatedProducts';
import RecentViewProducts from './recentViewProducts';
import QuickView from './quickView';
import ComboQuickView from './comboquickView';


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
    let count =  doJob === "plus" ?  parseInt(itemCount, 10) + 1 : parseInt(itemCount, 10) > 1 ?  parseInt(itemCount, 10) - 1 :1 ;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    const tempproduct = producttype === "main" ? this.state.comboproductdetails : this.state.productdetailsquickview
    if(producttype === "combo") {
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
      item_type: type === "product" ? "product" : "combo",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "1"
    }
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
      item_type: type === "product" ? "product" : "combo",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "1"
    }
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

  removeItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: itemID, producttype: producttype })
    
    const formData = {
      item_type: type === "product" ? "product" : "combo",
      item_id: itemID,
      quantity: 1
    }
     this.props.removeWishList(objectToQueryString(formData))
     const newState = type === "combo" ?  this.state.comboproductdetails : this.state.productDetails
    newState.in_my_wishlist = "N";
    if(type === "combo" ) {
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
      item_type: type === "product" ? "product" : "combo",
      item_id: itemID
    }
    this.props.addToWishList(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    const newState = type === "combo" ?  this.state.comboproductdetails : this.state.productDetails
    newState.in_my_wishlist = "Y";
    if(type === "combo" ) {
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
      combo_id: this.props.params.id,
      page_number: 1,
      number_of_records_needed: 5
    }
    this.props.getProductReview(objectToQueryString(formData))
    this.props.getComboProductDetail(objectToQueryString(formData))
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
        firsttimecall:true,
        productDetails: []
      });
      const formData = {
        product_id: nextLocationId[0],
      }
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
        nextProps.productDetails.data.meta_keywords ?
        metadata( nextProps.productDetails.data.meta_keywords,  nextProps.productDetails.data.meta_description)
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
      if (!Array.isArray(nextProps.comboproductdetails) ) {
        this.setState({
          comboproductdetails: nextProps.comboproductdetails.data,
          originalValue: nextProps.comboproductdetails.data ? nextProps.comboproductdetails.data.quantity_in_my_cart : "0"
        });
      }
    }
    // if (nextProps.comboproductdetails) {
    //   if (!Array.isArray(nextProps.comboproductdetails.data)) {
    //     this.setState({
    //       comboproductdetails: nextProps.comboproductdetails.data,
    //       firsttimecall: false
    //     });
    //   } else {
    //     if (!Array.isArray(nextProps.comboproductdetails.data) && this.state.producttype === 'combo') {
    //       this.setState({
    //         comboproductdetails: nextProps.comboproductdetails.data
    //       });
    //     }
    //   }
    // }
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


  render() {
    let images = [];
    let productDetails = [];
    let comboproductProductList = [];
    if (!Array.isArray(this.state.comboproductdetails)) {
      productDetails = this.state.comboproductdetails
      productDetails.combo_images.map((image) => {
        return images.push(image.full_image);
      })
      comboproductProductList =  this.state.comboproductdetails.products_in_combo
    }


    // comboproductdetails
    // if (this.props.productreview.hasOwnProperty('data')) {
    //   productreview = this.props.productreview.data
    // }
    return (
      !Array.isArray(productDetails) ? 
      <div>
        <div className="container p-t-110">
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <Link to={"/"} className="stext-109 cl8 hov-cl1 trans-04">
              Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
            </Link>
            <Link to={"/products"} className="stext-109 cl8 hov-cl1 trans-04">
              Champagne
           <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
            </Link>
            <span className="stext-109 cl4">
              {productDetails.name}
            </span>
          </div>
        </div>
        {/* Product Detail */}
        <section className="sec-product-detail bg10 p-t-65 p-b-60">

          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg- p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    {productDetails.combo_images ?
                      <ProductImages
                        images={productDetails.combo_images}
                        cbOnImageClick={this.onImageClick}
                        refImageGallery={i => this.refImageGallery = i}
                      />
                      : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    {productDetails.name}
                  </h4>
                  <span className="mtext-106 cl2">
                    {
                      (parseFloat(productDetails.original_price) > parseFloat(productDetails.sale_price)) ?
                        <span> {delcurrencySymbol(productDetails.original_price)}   {currencySymbol(productDetails.sale_price)}</span>
                        : <span> {currencySymbol(productDetails.sale_price)} </span>
                    }
                  </span>
                  <a href="javascript:void(0)" data-producttype="main" data-tooltip={productDetails.in_my_wishlist === "N" ? "Add to Wishlist" : "Remove From Wishlist"} className=" cl2 pull-right  fs-14 cl3 trans-04 lh-10 p-lr-40 p-tb-2  tooltip100" onClick={productDetails.in_my_wishlist === "Y" ? this.removeItemInWishlist : this.addItemInWishlist} data-id={productDetails.id}>
                    {productDetails.in_my_wishlist === "Y" ?
                      <img className="icon-heart1 dis-block trans-04" src="/../../images/icons/icon-heart-02.png" data-tooltip="Add to Wishlist" alt="dsd" data-id={productDetails.id} />
                      : <img className="icon-heart1 dis-block trans-04" src="/../../images/icons/icon-heart-01.png" data-tooltip="Add to Wishlist" alt="sds" data-id={productDetails.id} />}
                  </a>
                  <p className="stext-102 cl3 p-t-23">
                    {productDetails.info_text}
                  </p>
                  {productDetails.sku  ?
                  <div>
                  <span className="dis-block">
                   <b>SKU : </b> {productDetails ? productDetails.sku : null}
                   </span>
                  <span className=" dis-block">
                  <b>Brand : </b> <Link to={"/products?brands_id="+productDetails.brand_id} className="stext-109 cl8 hov-cl1 trans-04">{productDetails ? productDetails.brand_name : null} </Link>
                  </span>
                  <span className="dis-block">
                  <b>Category : </b> <Link to={"/products?cat_id="+productDetails.cat_id} className="stext-109 cl8 hov-cl1 trans-04">{productDetails ? productDetails.cat_name : null} </Link>
                  </span>
                  </div>
                  :null}
                  <div className="p-t-33">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
               <div className="container">
            <div className="row">
                        <div className="col-md-12">
                            
                            {comboproductProductList.map((item, index) => {
                                return(
                                    <div key={index} className="col-md-12 border-lists newin-product-list">
                                        <div className="row">
                                            <div className="col-md-2 col-sm-4 col-xs-4 newin-product-img">
                                            <Link to={"/product/"+item.product_id} >
                                                    <img alt={item.name} src={item.product_thumbnail_image} className="img-responsive" />
                                                </Link>
                                            </div>
                                            <div className="col-md-10 col-sm-8 col-xs-8 business-infor">
                                                <p>
                                                    <Link to={"/product/"+item.product_id} >
                                                        {item.product_name}
                                                    </Link>
                                                </p>
                                                <h4>Brand :  by <b>{item.brand_name}</b></h4>
                                                <h4>Category : in <b>{item.cat_name}</b></h4>
                                                <p>{currencySymbol(item.sale_price_per_unit)}</p>
                                            </div>                              
                                        </div>

                                        <div className="row">
                                            
                                            {/* <div className="col-md-12 text-right buttons-col">
                                                {(localStorage.getItem('cust_id') !== null) ? (
                                                    <button className="btn btn-primary btn-cart" onClick={item.in_my_wishlist === "Y" ? this.removeItemInWishlist :  this.addItemInWishlist} data-id={item.id}><i className={item.in_my_wishlist === "Y" ?"fa fa-heart wishlist-icon_color" : "fa fa-heart"}></i>Add To Wishlist</button>
                                                ): (
                                                    <Link className="linkwishlist btn-primary btn-cart" to="/login"><i className="fa fa-heart"></i>Add To Wishlist</Link>
                                                )}                                                
                                                <button onClick={this.addItemInCart} data-id={item.id} className="btn btn-primary btn-cart"><i className="fa fa-shopping-cart"></i>Add To Cart</button>
                                            </div> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </div>
          </div>
        </section>

          {/* <ComboProducts productDetails={this.state.comboproductdetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} /> */}
          <RelatedProducts productDetails={this.state.comboproductdetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} />
          <RecentViewProducts productDetails={this.state.comboproductdetails} addItemInWishlist={this.addItemInWishlist} showModal={this.showModal} />
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

        : null
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

const ProductImages = (props) => {
  let gallaryImages = []
  props.images.map(item => {
    gallaryImages.push({
      original: item.full_image,
      thumbnail: item.thumbnail_image,
    });
    return true;
  });

  return (
    <div className="col-md- detail-left-sec">
      <ImageGallery
        ref={props.refImageGallery}
        items={gallaryImages}
        infinite={true}
        thumbnailPosition="left"
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showPlayButton={false}
        lazyLoad={true}
        onClick={props.cbOnImageClick}
        useTranslate3D={true}
      />
    </div>
  )

}
