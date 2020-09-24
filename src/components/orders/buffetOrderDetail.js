import React from 'react';
/*eslint-disable no-script-url*/
class BuffetOrderDetail extends React.Component {
 
  render() {
    return (
      <div>
      {/* breadcrumb */}
      <div className="container p-t-110 mob-container">
        <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
          <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <a href="buffet-order.php" className="stext-109 cl8 hov-cl1 trans-04">
            Buffet Orders
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">
            Buffet Order Details
          </span>
        </div>
      </div>
      {/* Product Detail */}
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="bor10 m-t-0 p-t-43 p-b-40">
            {/* Tab01 */}
            <div className="tab01">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 m-lr-auto">
                  <div className="order-box bor10 m-lr-28 p-lr-15-sm m-b-30">
                    <div className="order-box-top p-3">
                      <div className="row">
                        <div className="col-md-5"><a role="button" className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4">Order ID 165</a></div>
                        <div className="col-md-7 text-right"><span className="flex-r-m stext-106 cl6 pt-3">12:26 PM, 2018-June-17</span></div>
                      </div>
                    </div>
                    <div className="order-box-main p-3">
                      <div className="order-details p-lr-15">
                        <div className="row p-t-15 p-b-20 bor12">											
                          <div className="col-md-12">
                            <div className="icons-left"><i className="zmdi zmdi-pin" /><label>27 dd Smith Street, WX31N2 Greater London</label></div>
                          </div>
                          <div className="col-md-6">
                            <div className="icons-left"><i className="zmdi zmdi-time" /> <label>9 : 30 PM</label></div>
                          </div>
                          <div className="col-md-6">
                            <div className="icons-left"><i className="zmdi zmdi-calendar" /> <label>June 26,2018</label> </div>
                          </div>
                          <div className="col-md-6">
                            <div className="icons-left"><i className="zmdi zmdi-account" /> <label>7</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="icons-left"><i className="zmdi zmdi-money-box" /> <label>£199</label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="icons-left"><strong className="p-r-15">Transaction ID(s):</strong> 
                              <span className="p-r-15">X13N21659</span> <span className="p-r-15">N12314663</span>
                            </div>
                          </div> 													
                        </div>
                        <div className="row p-t-15 p-b-20 bor12">
                          <h3 className="p-t-15 p-b-20 col-md-6">Details</h3>										
                          <a href="change-buffet.php" className="p-t-15 p-b-20 col-md-6 text-right">Add More</a>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6">Chivas Regal 12YO</div>
                              <div className="col-md-6"><div className="icons-left"><i className="zmdi zmdi-account" /><label>3</label><br /><small>£31/Pax</small></div></div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6">Ballentines 12YO</div>
                              <div className="col-md-6"><div className="icons-left"><i className="zmdi zmdi-account" /><label>2</label><br /><small>£28/Pax</small></div></div>
                            </div>
                          </div>
                        </div>
                        <div className="row p-t-15 p-b-20 bor12">
                          <h3 className="p-t-15 p-b-20 p-l-15">Add Ons</h3>										
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6"><strong>Bar Setup</strong></div>
                              <div className="col-md-6"><div className="icons-left">Yes <br /><small>£35</small></div></div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6"><strong>Bar Tender</strong></div>
                              <div className="col-md-6"><div className="icons-left">Advanced <br /><small>£70</small></div></div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6"><strong>Cocktail Kit</strong></div>
                              <div className="col-md-6"><div className="icons-left">3 Choices of Liquor <br /><small>£70</small></div></div>
                            </div>
                          </div>
                        </div>
                        <div className="row bs-wizard" style={{borderBottom: 0}}>	
                          <div className="col-sm-4 bs-wizard-step complete">
                            <div className="text-left bs-wizard-stepnum">Placed</div>
                            <div className="progress"><div className="progress-bar" /></div>
                         <span className="bs-wizard-dot" />
                          </div>
                          <div className="col-sm-4 bs-wizard-step complete-half">{/* default */}
                            <div className="text-center bs-wizard-stepnum">Dispatched</div>
                            <div className="progress"><div className="progress-bar" /></div>
                         <span className="bs-wizard-dot" />
                          </div>
                          <div className="col-sm-4 bs-wizard-step default">{/* default */}
                            <div className="text-right bs-wizard-stepnum">Delivered</div>
                            <div className="progress"><div className="progress-bar" /></div>
                         <span className="bs-wizard-dot" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-box-bottom p-lr-15">
                      <div className="row">
                        <a className="flex-c-m stext-106 cl6 p-3 col-lg-5" href="javascript:void(0)"><button className="size-104 bor4 pointer hov-btn1 trans-04 col-lg-12 cancel">Cancel</button></a>
                      </div>	
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>    

    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: bindActionCreators(addToCart, dispatch),
//     addToWishList: bindActionCreators(addToWishList, dispatch),
//     getProductList: bindActionCreators(getProductList, dispatch),
//     getProductDetail: bindActionCreators(getProductDetail, dispatch),
//     fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    
//   }
// }
// function mapStateToProps(state) {
//   return {
//     productsList: state.product.products,
//     productDetails: state.product.productdetails,
//     categoriesList: state.common.categories,
//     brandsList: state.home.brands
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default (BuffetOrderDetail);
