
var input = [
{id: "1", name: "Whiskey", image: "http://18.218.135.118/0.2/uploads/cat-images/79eb4f1b1ca77a22b10d50771a3bfde1_whiskey.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/79eb4f1b1ca77a22b10d50771a3bfde1_whiskey.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/79eb4f1b1ca77a22b10d50771a3bfde1_whiskey1.jpg", …},
{id: "4", name: "Wine & Champagne", image: "http://18.218.135.118/0.2/uploads/cat-images/3ae1fbe624d0ec9e9797ee2d693eb685_Champagne.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/e9e6e1f150a0109c455e9fdd0a2466e9_wine.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/ccf26d3f69a3c7fd970fa30ee7df2783_wine.jpg", …},
{id: "9", name: "Beer & Sake", image: "http://18.218.135.118/0.2/uploads/cat-images/9d676700334201b543e4887f42c1be2b_beer.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/0cbedab1a5ccb705ed63d005cd4f9cf9_beer-and-sake.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/0cbedab1a5ccb705ed63d005cd4f9cf9_beer and sake.jpg", …},
{id: "12", name: "Spirits & Liqueurs", image: "http://18.218.135.118/0.2/uploads/cat-images/ef77267b13dbcb256ae555a9a0eafc9c_Spirits.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/32d4279f5bf38df8e6dbc02c9e2d6299_spritis-and-liquor.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/32d4279f5bf38df8e6dbc02c9e2d6299_sprits-and-liquor.jpg", …},
{id: "18", name: "Premium Drinks", image: "http://18.218.135.118/0.2/uploads/cat-images/c76c3ebd37fdade6ae873c7e129fd9fb_Tequila.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/97d4fca166dd19ce4ce021c1fe218ba5_premium-liquor.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/97d4fca166dd19ce4ce021c1fe218ba5_premium-liquor.jpg"},
{id: "19", name: "Hookah & Tobacco", image: "http://18.218.135.118/0.2/uploads/cat-images/570789f117a506c6155f372379e7d1c7_Hookah.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/a75e4b6e888ba56599a121e82aaec452_hookah-and-tobacco.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/a75e4b6e888ba56599a121e82aaec452_hookah-&-tobacco.jpg"},
{id: "20", name: "Accessories", image: "http://18.218.135.118/0.2/uploads/cat-images/8a5290e16f0c749940fb5b6c5e8e6672_Accessories.png", megamenu_banner: "http://18.218.135.118/0.2/uploads/cat-images/7d2279445bfc73b180a9dc5422253ae2_accessories.1.jpg", homepage_banner: "http://18.218.135.118/0.2/uploads/cat-images/7d2279445bfc73b180a9dc5422253ae2_accessories.jpg", …}
]




let categories = temp1.map(item => {
    if('subcat' in item && item.subcat.length > 0)
    {
        item.subcat.forEach(element => {
            element.parentId = item.id;
        });
    }
    return item;
})

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom'
import { fetchCategories, } from '../actions/common';
import { fetchCartAndWihslistCount, getCartData, getProductListSearch, updateCart } from '../actions/products';
import { logout } from '../actions/auth';
import $ from "jquery";
import { objectToQueryString, rating } from './common';
/*eslint-disable no-script-url*/

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      istoggle: false,
      cartAndWishlistCount: [],
      serverCall: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateItemInCart = this.updateItemInCart.bind(this);
    this.cartItem = this.cartItem.bind(this);
  }
  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: "0"
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.updateCart(objectToQueryString(formData))
    this.setState({
      serverCall: true
    });
    return true
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'search') {
      const formData = {
        item_type: "product",
        number_of_records_needed: 15,
        search_keyword: value
      }
      this.props.getProductListSearch(objectToQueryString(formData))
    }
    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!Array.isArray(nextProps.cartAndWishlistCount)) {
      this.setState({
        cartAndWishlistCount: nextProps.cartAndWishlistCount
      });
    }

    if (!Array.isArray(nextProps.categoriesList)) {
      localStorage.setItem('categories', JSON.stringify(nextProps.categoriesList.data));
    }
    if (nextProps.isupdated && this.state.serverCall) {
      this.props.getCartData()
      this.props.fetchCartAndWihslistCount()
      this.setState({
        serverCall: false
      });
      return false;
    }

  }
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchCartAndWihslistCount()
  }



  cartItem(event) {
    event.preventDefault();
    this.props.getCartData()
  }
  sidebarShow() {
    $('.js-sidebar').addClass('show-sidebar')
  }
  hideCartListSideBar() {
    $('.js-panel-cart').removeClass('show-header-cart');

  }


  handleSubmit(event) {
    this.props.logout()
  }

  render() {
    let cust_id = localStorage.getItem('cust_id') !== null ? true : false
    let selectedCat =  this.props.location.query.cat_id 
    // const lastChar = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
    let categories = [];
    let cartdata = [];
    let cartitems = 0;
    if (this.props.categoriesList.hasOwnProperty('data')) {
       categories = this.props.categoriesList.data.map(item => {
        if('subcat' in item && item.subcat.length > 0)
        {
            item.subcat.forEach(element => {
                element.parentId = item.id;
            });
        }
        return item;
    })
    }

    for(let i = 0 ; i < categories.length ; i++) {
      let current = categories[i];
      let matchFound = false;
    
      
      if('subcat' in current && Array.isArray(current.subcat)  && current.subcat.length > 0) {
        let subcat = current.subcat;
        for(let j=0; j < subcat.length; j++)
        {
          let subcatItem = subcat[j];
          
          if(parseInt(subcatItem.id, 10) === parseInt(selectedCat, 10) || parseInt(subcatItem.parentId, 10) === parseInt(selectedCat, 10))
          {
           
           matchFound = true;
           categories[i]['active'] = true;
           subcat[j]['active'] = true;
           break;
          } else {
           matchFound = false;
           categories[i]['active'] = false;
           subcat[j]['active'] = false;
           break;
          }
        }
      }

      if(matchFound)
      {
        
        break;
      }
    }

    if (this.state.cartAndWishlistCount.hasOwnProperty('data')) {
      cartitems = parseInt(this.state.cartAndWishlistCount.data.cart_items_total, 10)
    }
    if (this.props.cartdata.hasOwnProperty('data')) {
      cartdata = this.props.cartdata.data
    }

    let productsList = [];
    if (this.props.productsListSearch.hasOwnProperty('data')) {
      productsList = this.props.productsListSearch.data
    }
  
    return (
      <React.Fragment>
        <header>
          {/* Header desktop */}
          <div className="container-menu-desktop">
            {/* Topbar */}
            <div className="top-bar">
              <div className="content-topbar flex-sb-m justify-content-between h-full container">
                <div className="left-top-bar">
                  <i className="zmdi zmdi-truck" /><span className="top-left-text">24/7 Express Delivery<br />
                    <small>in selected postcodes</small></span>
                </div>
                <div className="top-header-left"><Link to="/newin">New In</Link> | <Link to="/brands">Brands</Link> | <a href="javascript:void(0)">Editorial</a></div>
                {/* Icon header */}
                <div className="account-icon-header flex-w flex-r-m">
                  <div className="flex-c-m h-full p-lr-15">
                    {cust_id ?
                      <div onClick={this.sidebarShow} className="icon-header-item cl9 hov-cl1 trans-04 p-l-10 js-show-sidebar">
                        <i className="zmdi zmdi-account" />
                      </div>
                      :
                      <Link to="/login" className="icon-header-item cl9 hov-cl1 trans-04 p-l-10" ><i className="zmdi zmdi-account" /></Link>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap-menu-desktop">
              <nav className="limiter-menu-desktop container">
                {/* Logo desktop */}
                <Link to="/" className="logo">
                  <img src="/images/icons/logo-01.png" alt="IMG-LOGO" />
                </Link>
                {/* Menu desktop */}
                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li className="nav-item dropdown mega-dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop By Category </a>
                      <div className="dropdown-menu mega-menu row z-depth-1" aria-labelledby="navbarDropdownMenuLink">
                        <div className="col-md-5 col-xl-3 sub-menu">
                          <ul className="dropdown-menu multi-level">
                            {
                              categories.length ?
                              categories.map(function (cate, index) {
                                  return (
                                    <li className={cate.subcat !== undefined && cate.subcat.length > 0 ?  cate.active ? "dropdown-submenu active" :  "dropdown-submenu" : selectedCat === cate.id ? "active" : "" } key={index}>
                                      <Link to={"/products?cat_id=" + cate.id} className={cate.subcat !== undefined && cate.subcat ? "dropdown-toggle" : ''} data-id={cate.id}>{cate.name}</Link>
                                      <ul className="dropdown-menu" key={index}>
                                        <li className="dropdown" >
                                          <div className="pull-right img-box-li"><CateImage catimage={cate.megamenu_banner} /> </div>
                                          {cate.subcat !== undefined ?
                                            cate.subcat.map(function (subcat, index) {
                                              return (
                                                <span className= {selectedCat === subcat.id  || subcat.active ? "links-li active" : "links-li"} key={index}>
                                                  <Link className={selectedCat === subcat.id   || subcat.active  ? "cat-link-left active" :  "cat-link-left"} to={"/products?cat_id=" + subcat.id}>{subcat.name}</Link>
                                                </span>
                                              )
                                            }.bind(this)) : null}
                                        </li>
                                      </ul>
                                    </li>
                                  )
                                }.bind(this)) : null
                            }
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Bar Exchange</a>
                      <ul className="sub-menu">
                        <li> <Link to="/barexchnge">All</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/buffet">Buffet</Link>
                    </li>
                    <li>
                      <Link to="/offers">Offers</Link>
                    </li>
                  </ul>
                </div>
                {/* Icon header */}
                <div className="wrap-icon-header flex-w flex-r-m">
                  <div className="icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                    <i className="zmdi zmdi-search" />
                  </div>
                  <div className={cartitems > 0 ? "  icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti 11 js-show-cart" : "icon-header-item cl0 hov-cl1 trans-04 p-l-22 p-r-11 22 js-show-cart"} onClick={this.cartItem} data-notify={cartitems}>
                    <i className="zmdi zmdi-shopping-cart" />
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Header Mobile */}
          <div className="wrap-header-mobile">
            {/* Logo moblie */}
            <div className="logo-mobile">
              <a href="/"><img src="images/icons/logo-01.png" alt="IMG-LOGO" /></a>
            </div>
            {/* Icon header */}
            <div className="wrap-icon-header flex-w flex-r-m m-r-15">
              <div className="icon-header-item cl10 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                <i className="zmdi zmdi-search" />
              </div>
              <div className="icon-header-item cl10 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify={2}>
                <i className="zmdi zmdi-shopping-cart" />
              </div>
            </div>
            {/* Button show menu */}
            <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </div>
          </div>
          {/* Menu Mobile */}
          <div className="menu-mobile">
            {/* Topbar */}
            <div className="topbar-mobile">
              <div className="content-topbar flex-sb-m justify-content-between h-full container">
                <div className="left-top-bar">
                  <i className="zmdi zmdi-truck" /><span className="top-left-text">24/7 Express Delivery<br />
                    <small>in selected postcodes</small></span>
                </div>
                <div className="top-header-left"><a href="javascript:void(0)">New In</a> | <a href="javascript:void(0)">Brands</a> | <a href="javascript:void(0)">Editorial</a></div>
                {/* Icon header */}
                <div className="account-icon-header flex-w flex-r-m">
                  <div className="flex-c-m h-full p-lr-15">
                    <div className="icon-header-item cl9 hov-cl1 trans-04 p-l-10 js-show-sidebar">
                      <i className="zmdi zmdi-account" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="main-menu-m">
              <li>
                <a href="index.php">Home</a>
              </li>
              <li className="nav-item dropdown mega-dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop By Category </a>
                <div className="dropdown-menu mega-menu row z-depth-1" aria-labelledby="navbarDropdownMenuLink">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-5 col-md-5 col-xl-3 sub-menu">
                        <ul className="dropdown-menu multi-level">
                          {
                            categories.length ?
                            categories.map(function (cate, index) {
                        
                                return (
                                  <li className="dropdown-submenu whiskies-cat-li has-child" key={index}>
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{cate.name}</a>
                                    <ul className="dropdown-menu" key={index}>

                                      <li className="dropdown" >
                                        <div className="pull-right img-box-li"><CateImage catimage={cate.image} /> </div>
                                        {cate.subcat !== undefined ?
                                          cate.subcat.map(function (subcat, index) {
                                            return (
                                              <span className="links-li" key={index}>
                                                <a className="cat-link-left" href="product.php">{subcat.name}</a>
                                              </span>
                                            )
                                          }) : null}
                                      </li>
                                    </ul>
                                  </li>

                                )
                              }) : null
                          }
                          <li className="divider" />
                          <li className="premium-cat-li no-child"><a href="javascript:void(0)">Premium Drinks</a></li>
                          <li className="hookah-cat-li no-child"><a href="javascript:void(0)">Hookah &amp; Tobacco</a></li>
                          <li className="dropdown-submenu accessories-cat-li has-child">
                            <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">Accessories</a>
                            <ul className="dropdown-menu">
                              <li><a href="javascript:void(0)">Glassware</a></li>
                              <li><a href="javascript:void(0)">Barware</a></li>
                              <li><a href="javascript:void(0)">Cocktails &amp; Mixtures</a></li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-7 col-md-7 col-xl-9">
                        <div className="row">
                          <div className="col-sm-6 col-xl-6 m-t-10 clearfix d-md-block">
                          </div>
                          <div className="col-sm-6 col-xl-6 m-t-10 clearfix d-xl-block">
                            <div className="news-single whiskies-cat">
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-02.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single wine-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-03.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single beer-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-04.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single spirits-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-05.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single premium-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-06.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single hookah-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-07.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="news-single accessories-cat" style={{ display: 'none' }}>
                              <div className="row">
                                <div className="col-md-12">
                                  {/*Image*/}
                                  <div className="view overlay z-depth-1 text-center">
                                    <img src="images/product-08.jpg" alt="IMG-PRODUCT" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a href="javascript:;">Bar Exchange</a>
                <ul className="sub-menu">
                  <li><a href="all.php">All</a></li>
                  <li><a href="favorites.php">Favorites</a></li>
                </ul>
              </li>
              <li>
                <a href="buffet.php">Buffet</a>
              </li>
              <li>
                <a href="offers.php">Offers</a>
              </li>
            </ul>
          </div>
          {/* Modal Search */}
          <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
            <div className="search-header-main">
              <div className="container-search-header">
                <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                  <img src="../images/icons/icon-close2.png" alt="CLOSE" />
                </button>
                <form className="wrap-search-header flex-w p-l-15">
                  <button className="flex-c-m trans-04">
                    <i className="zmdi zmdi-search" />
                  </button>
                  {/* <input className="flex-c-m stext-101  size-101   hov-btn1 p-lr-15 trans-04 " type="text" name="search" placeholder="Search" value={propState.search} onChange={this.handleInputChange}/> */}
                  <input className="plh3" type="text" name="search" placeholder="Search..." onChange={this.handleInputChange} value={this.props.search} />
                  { productsList.length > 0 ? 
                  <Link to={'/products?search_keyword=' + this.state.search} className="view-all-search pull-right" >
                    ViewAll
                  </Link>
                  : null}
                  <ul className={productsList.length > 0 ? "list header-cart-wrapitem w-full" : "js-hide-modal-search"}>
                    {
                      productsList.length ?
                        productsList.map(function (product, index) {
                          return (
                            <li className=" flex-w flex-t m-b-12 hover" key={index}>
                              <Link to={product.item_type === "combo" ? "/combo/" + product.id : "/product/" + product.id}>
                                <div className="header-cart-item-img">
                                  <img src={product.thumbnail_image} alt="IMG" />
                                </div>
                                <div className="header-cart-item-txt p-t-8">
                                  <span className="header-cart-item-name m-b-18 hov-cl1 trans-04 close-cart">
                                    {product.name}
                                  </span>
                                  <span className="header-cart-item-info">
                                    £  {product.sale_price_per_unit}
                                  </span>
                                </div></Link>
                            </li>)
                        }) : null}
                  </ul>

                  {/* <button type="submit" className="search-button text-center">Search</button> */}
                </form>
              </div>
            </div>
          </div>
        </header>
        {/* Sidebar */}
        <aside className="wrap-sidebar js-sidebar">
          <div className="s-full js-hide-sidebar" />
          <div className="sidebar flex-col-l p-t-22 p-b-25">
            <div className="flex-r w-full p-b-30 p-r-27">
              <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar">
                <i className="zmdi zmdi-close" />
              </div>
            </div>
            <div className="sidebar-content flex-w w-full p-lr-65 js-pscroll">

              <ul className="sidebar-link w-full">
                <li className="p-b-13">
                  <Link to="profile" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Profile</Link>
                </li>
                <li className="p-b-13">
                  <Link to="orders" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Orders</Link>
                </li>
                <li className="p-b-13">
                  <Link to="buffetorder" className="stext-102 cl2 hov-cl1 trans-04 close-profile">Buffet Orders</Link>
                </li>
                <li className="p-b-13">
                  <Link to="/lpoints" className="stext-102 cl2 hov-cl1 trans-04 close-profile">
                    L Points <br />
                    {/* <small>3201</small> */}
                  </Link>
                </li>
                <li className="p-b-13">
                  <Link to="address" className="stext-102 cl2 hov-cl1 trans-04 close-profile"> Addresses</Link>
                </li>
                <li className="p-b-13">
                  <Link to="wishlist" className="stext-102 cl2 hov-cl1 trans-04 close-profile">My Wishlist</Link>
                </li>
                <li className="p-b-13">
                  <Link to="resetpassword" className="stext-102 cl2 hov-cl1 trans-04 close-profile"> Change Password</Link>
                </li>
              </ul>
              <button className="close-profile flex-c-m stext-101 cl0 size-111 bg1 bor1 hov-btn1 p-lr-15 trans-04 " onClick={this.handleSubmit}> Logout </button>
            </div>
            <div className="flex-c w-full p-b-30 p-t-27 p-l-27 p-r-27">
              {/* {this.props.authenticated ?
              <button className="close-profile flex-c-m stext-101 cl0 size-111 bg1 bor1 hov-btn1 p-lr-15 trans-04 " onClick={this.handleSubmit}> Logout </button>
              : null} */}
            </div>
          </div>
        </aside>


        {/* Cart */}

        <div className={cartitems > 0 ? "wrap-header-cart js-panel-cart" : "wrap-header-cart js-panel-cart hide"}>
          <div className="s-full js-hide-cart" />
          <div className="header-cart flex-col-l p-l-35 p-r-25">
            <div className="header-cart-title flex-w flex-sb-m p-b-8">
              <span className="mtext-103 cl2">
                Your Cart
                </span>
              <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                <i className="zmdi zmdi-close" />
              </div>
            </div>
            <div className="header-cart-content flex-w js-pscroll">
              <ul className="header-cart-wrapitem w-full">
                {
                  cartdata.length ?
                    cartdata.map(function (cartitem, index) {
                      return (
                        <li className="header-cart-item flex-w flex-t m-b-8" key={index}>
                          <Link to={"/product/" + cartitem.id} onClick={this.hideCartListSideBar} className=" close-cart header-cart-item-img  pointer" data-id={cartitem.id}>
                            <img src={cartitem.thumbnail_image} alt="IMG" data-id={cartitem.id} className="close-cart" />
                          </Link>
                          <div className="close-cart header-cart-item-txt p-t-8 ">
                            <Link onClick={this.hideCartListSideBar} to={"/product/" + cartitem.id} data-id={cartitem.id} className=" close-cart pointer header-cart-item-name m-b-6 hov-cl1 trans-04">
                              {cartitem.name}
                            </Link>
                            <span className="header-cart-item-info">
                              {cartitem.quantity} x £ {cartitem.sale_price_per_unit}
                            </span>
                          </div>
                          <a href="javscript:void(0)" onClick={this.updateItemInCart} data-id={cartitem ? cartitem.id : null} className="cartdelete" ><i data-id={cartitem ? cartitem.id : null} className="zmdi zmdi-delete"></i></a>
                        </li>)
                    }.bind(this)) : null}
              </ul>
              <div className="w-full">
                <div className="header-cart-total w-full p-tb-40">
                  Total: £ {this.props.cartdata.cart_total}
                </div>
                <div className="header-cart-buttons flex-w w-full">
                  <Link to="/cart" onClick={this.hideCartListSideBar} className=" close-cart js-hide-cart' flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                    View Cart
                </Link>
                  <Link to="/cart" onClick={this.hideCartListSideBar} className=" close-cart  js-hide-cart' flex-c-m stext-101 cl0 size-107 bg1 bor2 hov-btn1 p-lr-15 trans-04 m-b-10">
                    Check Out
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch),
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    getCartData: bindActionCreators(getCartData, dispatch),
    getProductListSearch: bindActionCreators(getProductListSearch, dispatch),
    updateCart: bindActionCreators(updateCart, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    isupdated: state.product.isupdated,
    categoriesList: state.common.categories,
    cartAndWishlistCount: state.product.cartcount,
    cartdata: state.product.cartdata,
    productsListSearch: state.product.searchproducts,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const CateImage = (props) => {
  const image_url = props.catimage;
  return (
    <div className="news-single">
      <div className="view overlay z-depth-1 text-center">
        <img src={image_url} alt="IMG-PRODUCT" />
      </div>
    </div>

  )
}
