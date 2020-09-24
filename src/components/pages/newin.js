 import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { findDOMNode } from 'react-dom'
import { fetchProductJustArrived, addToCart, addToWishList, removeWishList,   fetchCartAndWihslistCount } from '../../actions/products';
import { currencySymbol, objectToQueryString } from '../../common/common';
import { Link, browserHistory } from 'react-router';
import Pagination from "react-js-pagination";
import $ from "jquery";
class NewIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            disabled:false,
            page_number:1,
			number_of_records:10,
        }
        this.pathname = this.props.location.pathname;
        this.handlePageChange 	= this.handlePageChange.bind(this);
        this.addItemInCart = this.addItemInCart.bind(this);
        this.updateItemInCart = this.updateItemInCart.bind(this);
        this.addItemInWishlist = this.addItemInWishlist.bind(this);
        this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
    }
    
    componentWillMount(){
        this.props.fetchProductJustArrived();
    }
    
    handlePageChange(page) {
        this.setState({ activePage: page });
        const formData = {
          item_type: "product",
          cat_id: this.state.cat_id,
          children_cat_ids: this.state.children_cat_ids,
          brand_ids: this.state.brand_ids,
          page_number: page,
          number_of_records_needed: 15,
          search_keyword: this.state.search_keyword
        }
        this.props.fetchProductJustArrived(objectToQueryString(formData))
        $("html, body").animate({ scrollTop: 0 }, 600);
      }

   
  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    let itemCount = event.target.dataset.itemcount
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: parseInt(itemCount, 10) - 1
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.updateCart(objectToQueryString(formData))
    return true
  }
  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: 1
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToCart(objectToQueryString(formData))
    return true
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
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.removeWishList(objectToQueryString(formData))
    return true
  }
  
  addItemInWishlist(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key'),
      item_type: "product",
      item_id: id
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToWishList(objectToQueryString(formData))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdated ) {
          this.props.fetchCartAndWihslistCount()
        this.props.fetchProductJustArrived();
    }
  }
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath:'/newin' }
       });
  }

    render(){
        let products = [];
        if(Object(this.props.justarrivedproducts).hasOwnProperty('data')){
            products = this.props.justarrivedproducts.data;
        }
        
        return (
            <div className="container p-t-110 mob-container">
                    <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
                    <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
                        Home
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
                    </a>
                    <span className="stext-109 cl4">
                       New Products
                    </span>
                    </div>
                    <br/>
                    <section id="list-info">
                        <div className="row border-box-nopadding anchor_custom">
                            
                            {products.map((item, index) => {
                                return(
                                    <div key={index} className="col-md-12 border-lists newin-product-list">
                                        <div className="row">
                                            <div className="col-md-2 col-sm-4 col-xs-4 newin-product-img">
                                            <Link to={"/product/"+ item.slug +"/"+ item.id} >
                                                    <img alt={item.name} src={item.thumbnail_image} className="img-responsive" />
                                                </Link>
                                            </div>
                                            <div className="col-md-10 col-sm-8 col-xs-8 business-infor">
                                                <p>
                                                    <Link to={"/product/"+ item.slug +"/"+ item.id} >
                                                        {item.name}
                                                    </Link>
                                                </p>
                                                <h4>Brand :  by <b>{item.brand_name}</b></h4>
                                                <h4>Category : in <b>{item.cat_name}</b></h4>
                                                <p>{currencySymbol(item.sale_price_per_unit)}</p>
                                            </div>                              
                                        </div>

                                        <div className="row">
                                            
                                            <div className="col-md-12 text-right buttons-col">
                                                {(localStorage.getItem('cust_id') !== null) ? (
                                                    <button className="btn btn-primary btn-cart" onClick={item.in_my_wishlist === "Y" ? this.removeItemInWishlist :  this.addItemInWishlist} data-id={item.id}><i className={item.in_my_wishlist === "Y" ?"fa fa-heart wishlist-icon_color" : "fa fa-heart"}></i>Add To Wishlist</button>
                                                ): (
                                                    // <button className="btn btn-primary btn-cart" onClick={item.in_my_wishlist === "Y" ? this.removeItemInWishlist :  this.addItemInWishlist} data-id={item.id}><i className={item.in_my_wishlist === "Y" ?"fa fa-heart wishlist-icon_color" : "fa fa-heart"}></i>Add To Wishlist</button>
                                                    <button className="linkwishlist btn-primary btn-cart"  onClick={this.redirectToLogin} ><i className="fa fa-heart"></i>Add To Wishlist</button>
                                                )}                                                
                                                <button onClick={this.addItemInCart} data-id={item.id} className="btn btn-primary btn-cart"><i className="fa fa-shopping-cart"></i>Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex-c-m flex-w w-full p-t-38">
                                {
                                (this.props.justarrivedproducts.hasOwnProperty('total_pages') && this.props.justarrivedproducts.total_records > 2) ? (
                                    <Pagination
                                    hideDisabled={false}
                                    hideNavigation={true}
                                    hideFirstLastPages={false}
                                    prevPageText="<"
                                    nextPageText=">"
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.props.justarrivedproducts.total_records / this.props.justarrivedproducts.total_pages}
                                    totalItemsCount={this.props.justarrivedproducts.total_records}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange}
                                    activeLinkClass=" active-pagination1"
                                    linkClass="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1"
                                    />
                                ) : ('')
                                }

                  </div>
                    </section> 
                </div>
            
        );
    }
}



// export default NewIn
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductJustArrived: bindActionCreators(fetchProductJustArrived, dispatch),
        addToCart: bindActionCreators(addToCart, dispatch),
        addToWishList: bindActionCreators(addToWishList, dispatch),
        removeWishList: bindActionCreators(removeWishList, dispatch),
        fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch)
    }
}
function mapStateToProps(state) {
    return {
        justarrivedproducts: state.product.justarrivedproducts,
        isupdated: state.product.isupdated,
        authenticated: state.auth.authenticated,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIn);