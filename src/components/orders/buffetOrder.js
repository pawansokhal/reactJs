import React from 'react';
/*eslint-disable no-script-url*/
class BuffetOrder extends React.Component {
  render() {
    return (
      <div>
      {/* breadcrumb */}
      <div className="container p-t-110 mob-container">
        <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.php" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">
            Buffet Orders
          </span>
        </div>
      </div>
      {/* Product Detail */}
      <section className="sec-product-detail bg10 p-t-65 p-b-60">
        <div className="container">
          <div className="bor10 bg0 m-t-0 p-t-43 p-b-40">
            {/* Tab01 */}
            <div className="tab01">
              {/* Nav tabs */}
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item p-b-10">
                  <a className="nav-link active" data-toggle="tab" href="#buffet-upcoming" role="tab">Upcoming</a>
                </li>
                <li className="nav-item p-b-10">
                  <a className="nav-link" data-toggle="tab" href="#buffet-previous" role="tab">Previous</a>
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content p-t-43">
                {/* - */}
                <div className="tab-pane fade show active" id="buffet-upcoming" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 m-lr-auto">
                      <div className="order-box bor10 m-lr-28 p-lr-15-sm">
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
                            </div>
                            {/* <div className="row bs-wizard" style={{borderBottom: 0}}>	
                                {order.order_status === 'Cancelled' ?  
                              <React.Fragment>
                                        <div className= {order.order_status === 'Cancelled'  ? "bs-wizard-step  progress-dot placed complete " : "bs-wizard-step  progress-dot placed default"}>
                                          
                                            <div className="text-left bs-wizard-stepnum ">Placed</div>
                                              <span className="bs-wizard-dot"/>
                                            </div>

                                            <div className={order.order_status === 'Placed' ? "col-sm-6 col-xs-6 bs-wizard-step progress-line complete " : "col-sm-6 col-xs-6 bs-wizard-step progress-line " } >
                                              <div className="progress">
                                                <div className="progress-bar"></div>
                                              </div>
                                            </div>
                                            
                                            <div className={order.order_status === 'Placed'   ? "bs-wizard-step progress-dot dispatched complete" : "bs-wizard-step progress-dot dispatched default"} >
                                              <div className="text-center bs-wizard-stepnum">Cancelled</div>
                                              <span className={order.order_status === 'Placed'  ? "bs-wizard-dot complete" : "bs-wizard-dot default"}/>
                                            </div>
                                </React.Fragment>
                                  : 
                                <React.Fragment>
                                            <div className= {order.order_status === 'Placed' || order.order_status === 'Dispatched' ||  order.order_status === 'Delivered'  ? "bs-wizard-step  progress-dot placed complete " : "bs-wizard-step  progress-dot placed default"}>
                                            <div className="text-left bs-wizard-stepnum ">Placed</div>
                                            <span className="bs-wizard-dot"/>
                                            </div>

                                            <div className={order.order_status === 'Dispatched' || order.order_status === 'Delivered'  ? "col-sm-6 col-xs-6 bs-wizard-step progress-line complete " : "col-sm-6 col-xs-6 bs-wizard-step progress-line " } >
                                              <div className="progress">
                                                <div className="progress-bar"></div>
                                              </div>
                                            </div>
                                            
                                            <div className={order.order_status === 'Dispatched' ||  order.order_status === 'Delivered'  ? "bs-wizard-step progress-dot dispatched complete" : "bs-wizard-step progress-dot dispatched default"} >
                                              <div className="text-center bs-wizard-stepnum">Dispatched</div>
                                              <span className={order.order_status === 'Dispatched'  || order.order_status === 'Delivered' ? "bs-wizard-dot complete" : "bs-wizard-dot default"}/>
                                            </div>
                                            
                                            <div className={order.order_status === 'Delivered'  ? "col-sm-6 col-xs-6 bs-wizard-step progress-line complete " : "col-sm-6 col-xs-6 bs-wizard-step progress-line " } >
                                            <div className="progress">
                                              <div className="progress-bar"></div>
                                            </div>
                                            </div>
                                            
                                            <div className={order.order_status === 'Delivered'  ? "bs-wizard-step progress-dot delivered complete": "bs-wizard-step progress-dot delivered default" }>
                                              <div className="text-right bs-wizard-stepnum">Delivered</div>
                                              <span  className={order.order_status === 'Delivered'  ? "bs-wizard-dot complete" : "bs-wizard-dot default"}/>
                                            </div>
                                
                                </React.Fragment>
                                  
                                    } 
                                </div>*/}
                            <div className="row bs-wizard" style={{borderBottom: 0}}>	
                              <div className="col-sm-4 col-xs-4 bs-wizard-step complete">
                                <div className="text-left bs-wizard-stepnum">Placed</div>
                                <div className="progress"><div className="progress-bar" /></div>
                                <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step complete-half">
                                <div className="text-center bs-wizard-stepnum">Dispatched</div>
                                <div className="progress"><div className="progress-bar" /></div>
                                <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step default">
                                <div className="text-right bs-wizard-stepnum">Delivered</div>
                                <div className="progress"><div className="progress-bar" /></div>
                                <span className="bs-wizard-dot" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-box-bottom p-lr-15">
                          <div className="row">
                            <a className="flex-c-m stext-106 cl6 p-3 col-lg-5" href="buffet-order-details.php"><button className="size-104 bor4 pointer hov-btn1 trans-04 col-lg-12 cancel">View Detail</button></a>
                            <span className="flex-r-m stext-106 cl6 p-3 col-lg-7">
                              <strong className="p-r-10">Order Status: </strong>Dispatched</span>
                          </div>	
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* - */}
                <div className="tab-pane fade" id="buffet-previous" role="tabpanel">
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
                            </div>
                            <div className="row bs-wizard" style={{borderBottom: 0}}>	
                              <div className="col-sm-4 col-xs-4 bs-wizard-step disabled">
                                <div className="text-left bs-wizard-stepnum">Placed</div>
                                <div className="progress"><div className="progress-bar" /></div>
                              <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step disabled">{/* default */}
                                <div className="text-center bs-wizard-stepnum">Dispatched</div>
                                <div className="progress"><div className="progress-bar" /></div>
                              <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step disabled">{/* default */}
                                <div className="text-right bs-wizard-stepnum">Delivered</div>
                                <div className="progress"><div className="progress-bar" /></div>
                                <span className="bs-wizard-dot" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-box-bottom p-lr-15">
                          <div className="row">
                            <a className="flex-c-m stext-106 cl6 p-3 col-lg-5" href="buffet-order-details.php"><button className="size-104 bor4 pointer hov-btn1 trans-04 col-lg-12 cancel">View Detail</button></a>
                            <span className="flex-r-m stext-106 cl6 p-3 col-lg-7">
                              <strong className="p-r-10">Order Status: </strong> <span className="text-danger">Cancelled <br /><small className="cl8">(Plan Changed)</small></span></span>
                          </div>	
                        </div>
                      </div>
                      <div className="order-box bor10 m-lr-28 p-lr-15-sm">
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
                            </div>
                            <div className="row bs-wizard" style={{borderBottom: 0}}>	
                              <div className="col-sm-4 col-xs-4 bs-wizard-step complete">
                                <div className="text-left bs-wizard-stepnum">Placed</div>
                                <div className="progress"><div className="progress-bar" /></div>
                              <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step complete">{/* default */}
                                <div className="text-center bs-wizard-stepnum">Dispatched</div>
                                <div className="progress"><div className="progress-bar" /></div>
                              <span className="bs-wizard-dot" />
                              </div>
                              <div className="col-sm-4 col-xs-4 bs-wizard-step complete">{/* default */}
                                <div className="text-right bs-wizard-stepnum">Delivered</div>
                                <div className="progress"><div className="progress-bar" /></div>
                              <span className="bs-wizard-dot" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-box-bottom p-lr-15">
                          <div className="row">
                            <a className="flex-c-m stext-106 cl6 p-3 col-lg-5" href="buffet-order-details.php"><button className="size-104 bor4 pointer hov-btn1 trans-04 col-lg-12 cancel">View Detail</button></a>
                            <span className="flex-r-m stext-106 cl6 p-3 col-lg-7">
                              <strong className="p-r-10">Order Status: </strong> <span className="text-primary">Compleated</span></span>
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
export default (BuffetOrder);