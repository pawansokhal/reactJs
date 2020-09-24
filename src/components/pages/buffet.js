import React from 'react';

/*eslint-disable no-script-url*/
class Buffet extends React.Component {
 

  render() {
    return (
      <div>
      <div className="container p-t-110 mob-container">
        <div className="title-head-box">
          <h2 className="pull-left">Liquor Buffet</h2>
          <p className="text-center p-t-15 p-b-15 pull-right">Postcodes served</p>	 
        </div>	
        <div className="m-b-40 buffet-product-list">
          <ul className="nav nav-tabs first-image-tabs text-center" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="pills-Liquor-tab" data-toggle="pill" href="#pills-Liquor" role="tab" aria-controls="pills-Liquor" aria-selected="true">
                <span className="product-tab-img"><img src="images/wine.png" alt="Beer" /></span>
                Liquor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="pills-Food-tab" data-toggle="pill" href="#pills-Food" role="tab" aria-controls="pills-Food" aria-selected="false">
                <span className="product-tab-img"><img src="images/cake-sm.png" alt="Food" /></span>
                Food</a>
            </li>	  
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-Liquor" role="tabpanel" aria-labelledby="pills-Liquor-tab">
              <div className="inner-tab-container bg10 p-l-15 p-r-15 p-b-20">
                {/* Tab01 */}
                <div className="tab01 p-b-20 p-t-20">
                  {/* Nav tabs */}
                  <ul className="second-tabs">
                    <li className="tab-item p-b-10">
                      <a href="javascript:void(0)" className="tab-link active">Whisky</a>
                    </li>
                    <li className="tab-item p-b-10">
                      <a href="javascript:void(0)" className="tab-link">Vodka</a>
                    </li>
                    <li className="tab-item p-b-10">
                      <a href="javascript:void(0)" className="tab-link">Beer</a>
                    </li>
                  </ul>
                </div>
                <div className="liquor-buffet-items">
                  <div className="row">
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/bottle-1.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Classic
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div> 
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/bottle-1.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Magic Masala
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/bottle-2.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Classic
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/bottle-3.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Magic Masala
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                          <div className="block2-txt-child-btn p-t-15 text-left">
                            <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                              Add to Buffet
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>	
                </div>
              </div>	
            </div>
            <div className="tab-pane fade" id="pills-Food" role="tabpanel" aria-labelledby="pills-Food-tab">
              <div className="inner-tab-container bg10 p-l-15 p-r-15 p-b-20">
                {/* Tab01 */}
                <div className="tab01 p-b-20 p-t-20">
                  {/* Nav tabs */}
                  <ul className="second-tabs">
                    <li className="tab-item p-b-10">
                      <a href="javascript:void(0)" className="tab-link active">Chips</a>
                    </li>
                    <li className="tab-item p-b-10">
                      <a href="javascript:void(0)" className="tab-link">Cakes</a>
                    </li>
                  </ul>
                </div>
                <div className="liquor-buffet-items">
                  <div className="row">
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/Chips-classic.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Classic
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div> 
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/Chips-Magic-Masala.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Magic Masala
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/Chips-classic.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Classic
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15 col-md-3">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/Chips-Magic-Masala.png" alt="IMG-PRODUCT" />
                          <a href="javascript:void(0)" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                          </a>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14 p-l-5">
                          <div className="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              Lay's Magic Masala
                            </a>
                            <span className="stext-105 cl3">
                              £16.64/Pax
                            </span>
                          </div>
                        </div>
                        <div className="block2-txt-child-btn p-t-15 text-left">
                          <a href="javascript:void(0)" className="move-to-cart-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15">
                            Add to Buffet
                          </a>
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
      {/* Modal1 */}
      <div className="wrap-modal1 js-modal1 p-t-60 p-b-20">
        <div className="overlay-modal1 js-hide-modal1" />
        <div className="container">
          <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
            <button className="how-pos3 hov3 trans-04 js-hide-modal1">
              <img src="images/icons/icon-close.png" alt="CLOSE" />
            </button>
            <div className="row">
              <div className="col-md-6 col-lg-7 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots" />
                    <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                    <div className="slick3 gallery-lb">
                      <div className="item-slick3" data-thumb="images/Chips-classic.jpg">
                        <div className="wrap-pic-w pos-relative">
                          <img src="images/Chips-classic.jpg" alt="IMG-PRODUCT" />
                          <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/Chips-classic.jpg">
                            <i className="fa fa-expand" />
                          </a>
                        </div>
                      </div>
                      <div className="item-slick3" data-thumb="images/Chips-Magic-Masala.jpg">
                        <div className="wrap-pic-w pos-relative">
                          <img src="images/Chips-Magic-Masala.jpg" alt="IMG-PRODUCT" />
                          <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/Chips-Magic-Masala.jpg">
                            <i className="fa fa-expand" />
                          </a>
                        </div>
                      </div>
                      <div className="item-slick3" data-thumb="images/Chips-classic.jpg">
                        <div className="wrap-pic-w pos-relative">
                          <img src="images/Chips-classic.jpg" alt="IMG-PRODUCT" />
                          <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/Chips-classic.jpg">
                            <i className="fa fa-expand" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    Lays, Classic
                  </h4>
                  <span className="mtext-106 cl2">
                    £10.79/Pax
                  </span>
                  {/*  */}
                  <span className="mtext-106 cl2 pull-right">
                    <a href="javascript:void(0)" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                      <i className="zmdi zmdi-favorite" />
                    </a>
                  </span>
                  <p className="stext-102 cl3 p-t-23">
                    Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                  </p>
                  {/*  */}
                  <div className="p-t-33">
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                          <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                            <i className="fs-16 zmdi zmdi-minus" />
                          </div>
                          <input className="mtext-104 cl3 txt-center num-product" type="number" min="1" name="num-product" defaultValue={1} />
                          <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                            <i className="fs-16 zmdi zmdi-plus" />
                          </div>
                        </div>
                        <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                          Add to Buffet
                        </button>
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
    )
  }
}

export default(Buffet);
