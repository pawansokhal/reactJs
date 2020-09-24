import React from 'react';
import { currencySymbol, delcurrencySymbol } from '../../common/common';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from 'react-router';

const options = {
  loop: true,
  items: 1,
  // margin:10,
  nav: true,
  // rewind: false,
  startPosition: 0,
  autoplay: false,
  dots: false,
  navText: ["<i class='fa fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
  responsive: {
    0: { items: 1, nav: false },
    600: { items: 1, nav: false },
    1000: { items: 1 }
  }
};

/*eslint-disable no-script-url*/
class QuickView extends React.Component {
  render() {
    const productInfo = this.props.data;
    const csstate =  this.props.csstate;
    return (
      !Array.isArray(productInfo) ? 
      <section className="content">
        <div className=" bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                {productInfo ?
                  <ProductImages
                    options={options}
                    images={productInfo.combo_images}
                  //  cbOnImageClick={this.props.onImageClick} 
                  //  refImageGallery={i => this.refImageGallery = i}
                  />
                  : null}
              </div>
            </div>
            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {productInfo ? productInfo.name : null}
                </h4>
                <span className="mtext-106 cl2">
                  {
                        (parseFloat(productInfo.original_price) > parseFloat(productInfo.sale_price)) ?
                          <span> {delcurrencySymbol(productInfo.original_price)}   {currencySymbol(productInfo.sale_price)}</span>
                          : <span> {currencySymbol(productInfo.sale_price)} </span>
                      }
                </span>
                {/*  */}
                <a href="javascript:void(0)" data-producttype="combo" data-type="combo" data-tooltip={productInfo.in_my_wishlist === "N" ? "Add to Wishlist" : "Remove From Wishlist"} className="product-wishlist mtext-106 cl2 pull-right" onClick={productInfo.in_my_wishlist === "Y" ? this.props.removeItemInWishlist : this.props.addItemInWishlist} data-id={productInfo.id}>

                  {productInfo.in_my_wishlist === "Y" ?
                    <img className="icon-heart1 dis-block trans-04" src="./../images/icons/icon-heart-02.png" data-tooltip="Add to Wishlist" alt="dsd" data-id={productInfo.id} />
                    : <img className="icon-heart1 dis-block trans-04" src="./../images/icons/icon-heart-01.png" data-tooltip="Add to Wishlist" alt="sds" data-id={productInfo.id} />}
                </a>
                <p className="stext-102 cl3 p-t-23">
                  {productInfo ? productInfo.info_text : null}
                </p>
                <span className="dis-block">
                     <b>SKU : </b> {productInfo ? productInfo.sku : null}
                     </span>
                    <span className=" dis-block">
                    <b>Brand : </b> <Link to={"/products?brands_id="+productInfo.brand_id} className="stext-109 cl8 hov-cl1 trans-04">{productInfo ? productInfo.brand_name : null} </Link>
                    </span>
                    <span className="dis-block">
                    <b>Category : </b> <Link to={"/products?cat_id="+productInfo.cat_id} className="stext-109 cl8 hov-cl1 trans-04">{productInfo ? productInfo.cat_name : null} </Link>
                    </span>
                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                      <button data-producttype="combo"  data-type="combo"  data-do="minus"  onClick={this.props.updateItemCount}  data-id={productInfo ? productInfo.id : null} data-itemcount={productInfo ? productInfo.quantity_in_my_cart : 0} className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"> -</button>
                        <input data-producttype="combo" className="mtext-104 cl3 txt-center num-product"  min="1" type="number" name="quantity" data-id={productInfo ? productInfo.id : null}   data-itemtype={productInfo.item_type} onChange={this.props.updateItemCount}  value={productInfo.quantity_in_my_cart === "0" ? "1": productInfo.quantity_in_my_cart }/>
                        <button data-producttype="combo"  data-do="plus"  onClick={this.props.updateItemCount} data-id={productInfo ? productInfo.id : null}  data-itemcount={productInfo ? productInfo.quantity_in_my_cart : 0}className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">+</button>
                      </div>
                      <button data-producttype="combo"  data-type="combo" onClick={ parseInt(csstate.quantity_in_my_cart, 10) > 0 ?  this.props.updateItemInCart : this.props.addItemInCart } data-id={productInfo ? productInfo.id : null} className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      : null
      )
  }
}



export default (QuickView);

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
        // ref={props.refImageGallery}
        items={gallaryImages}
        infinite={true}
        thumbnailPosition="left"
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showPlayButton={false}
        lazyLoad={false}
        onClick={props.cbOnImageClick}
      />
    </div>
  )

}
