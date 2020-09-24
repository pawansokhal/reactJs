import React from 'react';
import { Link } from 'react-router';

/*eslint-disable no-script-url*/

class HeaderMobile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
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
                            catelist.length ?
                              catelist.map(function (cate, index) {
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
                  <img src="./images/icons/icon-close2.png" alt="CLOSE" />
                </button>
                <form className="wrap-search-header flex-w p-l-15">
                  <button className="flex-c-m trans-04">
                    <i className="zmdi zmdi-search" />
                  </button>
                  {/* <input className="flex-c-m stext-101  size-101   hov-btn1 p-lr-15 trans-04 " type="text" name="search" placeholder="Search" value={propState.search} onChange={this.handleInputChange}/> */}
                  <input className="plh3" type="text" name="search" placeholder="Search..." onChange={this.handleInputChange} value={this.props.search} />
                  <ul className={productsList.length > 0 ? "list header-cart-wrapitem w-full" : "js-hide-modal-search"}>
                    {
                      productsList.length ?
                        productsList.map(function (product, index) {
                          return (
                            <li className=" flex-w flex-t m-b-12 hover" key={index}>
                              <Link to={"/product/" + product.id}>
                                <div className="header-cart-item-img">
                                  <img src={product.thumbnail_image} alt="IMG" />
                                </div>
                                <div className="header-cart-item-txt p-t-8">
                                  <span  className="header-cart-item-name m-b-18 hov-cl1 trans-04 close-cart">
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
      </React.Fragment>
    );
  }
}


export default(HeaderMobile);