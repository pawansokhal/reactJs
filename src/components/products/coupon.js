import React from 'react';
/*eslint-disable no-script-url*/
class RecentlyViewedProducts extends React.Component {

  render() {
    let offersAndCoupons = [];
    if (this.props.offersAndCoupons.hasOwnProperty('data')) {
     offersAndCoupons = this.props.offersAndCoupons.data
    }
    let applyCoupon =  this.props.applyCoupon
    return (
      <div className="row selectBottleModal choose-offer-modal">        
      <div className="container">
        <div className="bg0 p-t-30 p-b-30 p-lr-15-lg how-pos3-parent padding-sm-0">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="p-lr-20 p-t-5 padding-sm-0">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  Choose Your offer
                </h4>
                <form className="choose-bottle-form">
                  <ul>
                    {offersAndCoupons.map(function (product, index) {
                      return(
                      <li key={index} data-coupon_code={product.code} data-couponindex={index} >
                      <img src={product.banner_image_url} alt="bottle" />
                      <div className="checkbox checkbox-info checkbox-circle" onClick={applyCoupon} data-coupon_code={product.code} data-couponindex={index} >
                        <input  type="checkbox" defaultChecked={this.props.selected === product.code ? true : false } name="product_name" data-coupon_code={product.code} data-couponindex={index} />
                        <label htmlFor="checkbox">
                        {product.promo_line}
                        </label>
                      </div>
                    </li>
                      )
                    }.bind(this)) }
                  </ul> 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default (RecentlyViewedProducts);
