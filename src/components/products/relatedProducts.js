import React from 'react';
import $ from "jquery";
// import Swiper from 'react-id-swiper';
import { Link } from 'react-router';
import {  currencySymbol, delcurrencySymbol } from '../../common/common';
class Example extends React.Component {

  componentDidMount(event) {
    var nextButton = $("#right-btn");
    var backButton = $("#left-btn");
    var con = $("#cont");
    var sliderCont = $("#slider-container");
    
    var sldElm = $(".item-image-wrapper img");
    var i = 0;
    while (i<sldElm.length) {
      sldElm[i].setAttribute("draggable", false);
      i++
    }
    
    var mL = 0, maxX = 200, diff = 0 ;
    
    function slide() {
       mL-=100;
      if( mL < -maxX ){ mL = 0 ;}
      sliderCont.animate({"margin-left" : mL + "%"}, 800);
    }
    
    function slideBack() {
      mL += 100;
      if ( mL > 0 ) { mL = -200 ; }
      sliderCont.animate({"margin-left" : mL + "%"}, 800);
    }
    
    nextButton.click(slide);
    backButton.click(slideBack);
    
    $(document).on("mousedown touchstart", con, function(e) {
      
      var startX = e.pageX || e.originalEvent.touches[0].pageX;
      diff = 0;
    
      $(document).on("mousemove touchmove", function(e) {
        
          var xt = e.pageX || e.originalEvent.touches[0].pageX;
          diff = (xt - startX) * 100 / window.innerWidth;
        if( mL == 0 && diff > 10 ) { 
          event.preventDefault() ;
        } else if (  mL == -maxX && diff < -10 ) {
           event.preventDefault();   
        } else {
          sliderCont.css("margin-left", mL + diff + "%");
        }
      });
    });
    
    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if(  mL == 0 && diff > 4 ) { 
          sliderCont.animate({"margin-left" :  0 + "%"},100);
       } else if (  mL == -maxX  && diff < 4 ){
           sliderCont.animate({"margin-left" : -maxX  + "%"},100);  
       } else {
          if (diff < -10) {
            slide();
          } else if (diff > 10) {
            slideBack();
          } else {
            sliderCont.animate({"margin-left" :  mL + "%"},300);
          }
      }
    });
  }
  render() {
    let related_products =[]
    if (this.props.productDetails) {
      if(this.props.productDetails.hasOwnProperty('related_products')) {
        related_products = this.props.productDetails.related_products
      }
    }
    // let recently_viewed_products = [];
    // if (this.props.productDetails) {
    //   if(this.props.productDetails.hasOwnProperty('recently_viewed_products')) {
    //     recently_viewed_products = this.props.productDetails.recently_viewed_products
    //   }
    // }

    return (
      <div id="cont">
      <div id="slider-container">
        <span  id="right-btn" className="fa fa-arrow-circle-right" aria-hidden="true">
        </span>
        <span id="left-btn" className="fa fa-arrow-circle-left" aria-hidden="true">
        </span>
       { related_products.map(function (product, index) {
         console.log('product', product)
                      return (
        <div className="item-container" key={index}>
          <div className="item-image-wrapper">
            <img src={product.thumbnail_image} alt={product.thumbnail_image}/>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-6 video-box p-b-30" key={index}>
                        <div className="product-box">
                       <div className="product-img">
                       <Link to={"/product/" + product.slug + "/" + product.id} className="img-url">
                                <img src={product.thumbnail_image? product.thumbnail_image : '../images/loader.gif'} alt="IMG-PRODUCT" data-src="../images/loader.gif" />
                              </Link>
                       </div>
                       <div className="product-description">
                       <h3 className="product-title">
                       <Link to={"/product/" + product.slug + "/" + product.id}>
                                  {product.name}
                                </Link>
                       </h3>
                       <h4 className="product-price">{
                                  product ?
                                    (parseFloat(product.original_price_per_unit) > parseFloat(product.sale_price_per_unit)) ?
                                      <span className="stext-105 cl3">  {delcurrencySymbol(product.original_price_per_unit)}   {currencySymbol(product.sale_price_per_unit)}</span>
                                      : <span className="stext-105 cl3">{currencySymbol(product.sale_price_per_unit)} </span>
                                    : null
                                }
                        </h4>
                       {/* <ul className="rating"><li><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star-half-o"></i></li></ul> */}
                       </div>
                       <div className="product-hover-box">
                           <div className="hover-middle">
                          <div className="qty-box">
                          <form >
                                <div className="input-group">
                                  <span className="input-group-btn">
                                  <button type="button" data-producttype="main" data-do="minus"  data-type="minus" data-index={index}   data-itemcount={product ? product.quantity_in_my_cart : 1}  data-id={product ? product.id : null}   className="btn btn-default btn-number"  data-itemtype={product.item_type}>-</button>
                                  </span>
                                  {/* <input max="500" data-id={product ? product.id : null} onFocus={this.handleFocus} data-itemtype={product.item_type} className="form-control text-center" min="1" type="number" name="qty"  value={product.quantity}  onChange={this.updateItemInCart}/> */}
                                  <input data-producttype="main" className="form-control input-number"  data-index={index}   min="1" type="number" name="quantity" value={product.quantity_in_my_cart === "0" ? "1" : product.quantity_in_my_cart ? product.quantity_in_my_cart : "1"} data-id={product ? product.id : null} data-itemtype={product.item_type} />
                                  <span className="input-group-btn">
                                  <button type="button" data-producttype="main" data-do="plus" data-type="plus"  data-index={index}  data-itemcount={product ? product.quantity_in_my_cart : 1}  data-id={product.id}   className="btn btn-default btn-number"  data-itemtype={product.item_type}>+</button>
                                  </span>
                                </div>
                              </form>
                          </div>
                          
                          <a  data-itemcount={product ? product.quantity_in_my_cart : 1} data-id={product.id} href="javascript:void(0)" className="add-to-cart">
                                Add to cart
                           </a>
                           <Link to={"/product/" + product.slug + "/" + product.id} className="view-detail">
                           View Detail
                                </Link>
                         </div> 
                       </div>
                     </div>  
                   </div>
                   </div>)
        })}
      </div>
    </div>
    
    )
  }
}

export default Example;