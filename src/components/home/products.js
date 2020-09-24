import React from "react";
import { Link } from 'react-router';
import OwlCarousel from 'react-owl-carousel2';
import { currencySymbol, delcurrencySymbol } from '../../common/common';
/*eslint-disable no-script-url*/
const options = {
  loop:false,
  items: 4,
  margin:10,
  nav: true,
  rewind: true,
  startPosition:1,
  autoplay: false,
  dots:false,
  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
  responsive: {  
      0:{ items:1, nav:false },
      600:{ items:3, nav:false },
      1000:{ items:4 }
  }
};
class Product extends React.Component {
  render() {
    let productsList = [];
    if (this.props.productsList) {
      productsList = this.props.productsList
    }
    let itemHTML= [];
    return (

      <section id="section4" className="video-testimonial-sec content-sec p-b-20">{/*OPEN Inner section2 */}
        <div className="container">
          <div className="title-box"><h2>Top selling</h2></div>
          <div id="tesimonial-carousel" className=" owl-theme tesimonial-box">
                  {productsList.map(function (product, index) {
           
                    return (
                     
                      <div className="col-sm-3 col-xs-6 video-box p-b-30" key={index}>
                      <div className="product-box">
                        <span className="label label-danger">Sale</span>
                        <div className="product-img">
                        {/* <img src="images/product-img-2.png" alt="product-img" /></div> */}
                        <img src={product.thumbnail_image} alt={product.name}  data-src="../images/loader.gif" /></div>
                        <div className="product-description">
                        <Link to={"/product/"  + product.slug + "/" + product.id} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6 product-name">
                        <h3 className="product-title"> {product.name}</h3>
                              </Link>
                          {/* <h3 className="product-title"> {product.name}</h3> */}
                          <h4 className="product-price"> 
                          { 
                                product? 
                                (parseFloat(product.original_price_per_unit) > parseFloat(product.sale_price_per_unit)) ? 
                                <span className="stext-105 cl3">  {delcurrencySymbol(product.original_price_per_unit)}   {currencySymbol(product.sale_price_per_unit)}</span>
                                : <span className="stext-105 cl3">{currencySymbol(product.sale_price_per_unit)} </span>
                                : null
                              }
                          </h4>
                          
                          {/* <ul className="rating"><li><i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star-half-o" /></li></ul> */}
                        </div>
                        <div className="product-hover-box">
                          <div className="hover-middle">
                            <div className="qty-box">
                              <form>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                  <button data-producttype="main" data-do="minus"  data-type="minus" data-index={index}   data-itemcount={product ? product.quantity_in_my_cart : 1} onClick={this.props.updateItemCount} data-id={product ? product.id : null} className="btn btn-default btn-number">-</button>
                                  </span>
                                  <input data-producttype="main" className="form-control input-number"  data-index={index}   min="1" type="number" name="quantity" value={product.quantity_in_my_cart === "0" ? "1" : product.quantity_in_my_cart ? product.quantity_in_my_cart : "1"} data-id={product ? product.id : null} data-itemtype={product.item_type} onChange={this.props.updateItemCount} />
                                  <span className="input-group-btn">
                                  <button data-producttype="main" data-do="plus" data-type="plus"  data-index={index}  data-itemcount={product ? product.quantity_in_my_cart : 1} onClick={this.props.updateItemCount} data-id={product.id} className="btn btn-default btn-number">+</button>
                                  </span>
                                </div>
                              </form>
                            </div>
                            <a onClick={this.props.addItemInCart} data-id={product.id} href="javascript:void(0)" className="add-to-cart">Add to cart</a>
                            <Link to={"/product/"  + product.slug + "/" + product.id} className="view-detail">
                              View Detail
                            </Link>
                          </div> 
                        </div>
                      </div>
                    </div>
                   
                    )
                  }.bind(this))
                  }
                   
            </div>
           
          </div>
      </section>
    );
  }
}
export default Product;



// class BestSeller extends React.Component {
//   render(){
//       let bestsellers      = [];
//       if(this.props.bestsellers.hasOwnProperty('bestseller')){
//           bestsellers = this.props.bestsellers.bestseller;
//       }
//       return (
//           <section id="bestseller-products" className="pb-5 mt-4">
//               <header className="text-center text-uppercase pb-5">Best Sellers</header>
//               {bestsellers.length > 0 ? (
//                   <OwlCarousel options={options} >
//                       {bestsellers.map((bestseller, index)=>{
//                           return(
//                               <Item item={bestseller} key={index}/>                        
//                           )
//                       })}
//                   </OwlCarousel>
//               ):''}
//           </section>
//       )
//   }   
// }

// BestSeller.propTypes = {
//   bestsellers: PropTypes.any.isRequired,
// }
// export default BestSeller;

// const Item = (props) => {
//   const item = props.item;
//   return(
//       <div className="item">
//           <div className="photo">
//               <Link className="buynow" to={"/product/view/"+item.slug+"/"+item.cuin+"/"+item.variant_id}  >
//                   <img src={item.image_url} className="img-responsive" alt={item.product_name} />
//               </Link>
//           </div>
//           <div className="info text-center">
//               <h3 className="name">
//                   <Link to={"/product/view/"+item.slug+"/"+item.cuin+"/"+item.variant_id} >{item.product_name} </Link>
//               </h3>
//               <div className="action">
//                   <div className="price-old-rate">
//                       {(item.selling_price !== item.mrp) ? (
//                           <div className="old-rate-rate">{currencySymbol()} {ConverPrice(item.mrp)}</div>
//                       ):''}  
//                       <span className="price">{currencySymbol()} {item.selling_price}</span>
                      
//                   </div>
//                   <div className="spn-btn"> 
//                       <span className="buynow">
//                           <Link className="btn btn-default" to={"/product/view/"+item.slug+"/"+item.cuin+"/"+item.variant_id}  >Buy Now</Link>
//                       </span>
//                   </div>
//               </div>
//           </div> 
//       </div>
//   )
// }