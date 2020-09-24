import React from 'react';
import { Link } from 'react-router';
import OwlCarousel from 'react-owl-carousel2';
import { currencySymbol, delcurrencySymbol } from '../../common/common';
/*eslint-disable no-script-url*/
const options = {
  loop: false,
  items: 4,
  margin: 10,
  nav: true,
  rewind: true,
  startPosition: 1,
  autoplay: false,
  dots: false,
  navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
  responsive: {
    0: { items: 1, nav: false },
    600: { items: 3, nav: false },
    1000: { items: 4 }
  }
};
class ComboProducts extends React.Component {

  render() {
    let combos_of_this_product = [];
    if (this.props.productDetails) {
      if (this.props.productDetails.hasOwnProperty('combos_of_this_product')) {
        combos_of_this_product = this.props.productDetails.combos_of_this_product
      } else {
        combos_of_this_product = this.props.productDetails.products_in_combo
      }
    }

    let itemHTML = [];
    combos_of_this_product.map((product) => {
      let id = product.combo_id || product.product_id
      return  itemHTML.push(<div key={Math.random()} className="item">
        <div className="block2">
          <div className="block2-pic hov-img0">
            <Link to={"/combo/"  + product.slug + "/"  + id}>
              <img src={product.combo_thumbnail_image || product.product_thumbnail_image} alt="IMG-PRODUCT" />
            </Link>
            <a href="javascript:void(0)"  data-producttype="combo"  onClick={this.props.showModal} data-type="combo" data-data={JSON.stringify(product)} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
              Quick View
                </a>
          </div>
          <div className="block2-txt flex-w flex-t p-t-14 product-text-bottom">
            <div className="block2-txt-child1 flex-col-l ">
              <Link className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6 product-name" to={"combo/" + id}>{product.combo_name || product.product_name}</Link>
                {
                  (parseFloat(product.original_price_per_unit) > parseFloat(product.sale_price)) ?
                    <span> {delcurrencySymbol(product.original_price_per_unit)}   {currencySymbol(product.sale_price)}</span>
                    : <span> {currencySymbol(product.sale_price)} </span>
                }
              {/* </span> */}
            </div>
            <div className="block2-txt-child2 flex-r p-t-3">
              {/* <a href="javascript:void(0)" onClick={this.props.addItemInWishlist} data-type="combo" data-id={product.combo_id || product.product_id} className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                <img className="icon-heart1 dis-block trans-04" src="/images/icons/icon-heart-01.png" alt="ICON" />
                <img className="icon-heart2 dis-block trans-04 ab-t-l" src="/images/icons/icon-heart-02.png" alt="ICON" />
              </a> */}
            </div>
          </div>
        </div>
      </div>)
    })



    return (
      combos_of_this_product.length > 0 ?
        <section className="sec-relate-product bg10 p-t-45 p-b-105">
          <div className="container">
            <div className="p-b-45">
              <h3 className="ltext-106 cl5 txt-center">
                Combos
        </h3>
            </div>
            {/* Slide2 */}
            <div className="wrap-slick2">
              <div className="slick2">
                <div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                  {combos_of_this_product.length > 0 ? (
                    <OwlCarousel options={options} >
                      {itemHTML}
                    </OwlCarousel>
                  ) : ''
                  }

                </div>
              </div>
            </div>
          </div>
        </section>
        : null
    )
  }
}


export default (ComboProducts);
