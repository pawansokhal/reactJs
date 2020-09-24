import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getWishList, removeWishList, addToCart, fetchCartAndWihslistCount } from '../../actions/products';
import { objectToQueryString } from '../../common/common';
import Timeslot from '../../common/timeslot';
/*eslint-disable no-script-url*/
class GetWishList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      model: false
    }

    this.addItemInCart = this.addItemInCart.bind(this);
    this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
  }
  componentWillMount() {
    const formData = {
      cust_id: localStorage.getItem('cust_id'),
      session_key: localStorage.getItem('session_key')
    }
    this.props.getWishList(objectToQueryString(formData))
  }
  removeItemInWishlist(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: 1
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.removeWishList(objectToQueryString(formData))
    return true
  }

  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: 1
    }
    this.props.removeWishList(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToCart(objectToQueryString(formData))
    return true
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdated) {
      const formData = {
        cust_id: localStorage.getItem('cust_id'),
        session_key: localStorage.getItem('session_key')
      }
      this.props.getWishList(objectToQueryString(formData))
    }
  }
  render() {
    let wishlistData = [];
    if (this.props.wishlistData.hasOwnProperty('data')) {
      wishlistData = this.props.wishlistData.data
    }

    return (

      <div>
        <section className="content-sec">{/*OPEN slider-sec */}
          <div className="container">
            <h2 className="inner-title">Wishlist</h2>
          </div>
        </section>{/*END slider-sec */}
        <section id="eye-catcher" className="eye-catcher-sec content-sec">{/* OPEN slider-sec */}
        <Timeslot/>
        </section>{/*END eye catcher sec */}
        <section id="section1" className="categories-sec wishlist-items-sec content-sec m-t-30 p-b-40">{/*OPEN Inner section2 */}
          <div className="container">
            <div className="row">
              {/* <div className="col-sm-12 breadcrumb-sec">
                <ol className="breadcrumb">
                  <li><a href="javascript:void(0)">Home</a></li>
                  <li className="active">Wishlist</li>
                </ol>
              </div> */}
              <div className="col-md-12 col-sm-12 col-xs-12 categoty-right-sec">
                <div className="row">
                  {wishlistData.map(function (product, index) {
                    return (
                      <div className="col-md-3 col-sm-4 col-xs-6 video-box p-b-30">
                        <div className="product-box">
                          <div className="product-img">
                            <div className="wishlist-icon">
                              <a href="javascript:void(0)">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                            <Link to={"/product/" + product.slug + "/" + product.id}>
                              {/* <img src={product.thumbnail_image} alt="IMG-PRODUCT" /> */}
                                    <img src="images/product-img-2.png" alt="product-img" />
                            </Link>
                          </div>
                          <div className="product-description">
                            <h3 className="product-title"> <Link to={"/product/" + product.slug + "/" + product.id} className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              {product.name}
                            </Link></h3>
                            <h4 className="product-price">   £ {product.sale_price_per_unit}</h4>
                            <ul className="rating"><li><i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star" /> <i className="fa fa-star-half-o" /></li></ul>
                            <div className="move-cart-btn">   <a onClick={this.addItemInCart} data-id={product.id} className="add-to-cart">Move to cart</a></div>
                          </div>
                        </div>
                      </div>)
                  }.bind(this))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>



    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishList: bindActionCreators(getWishList, dispatch),
    removeWishList: bindActionCreators(removeWishList, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    addToCart: bindActionCreators(addToCart, dispatch)

  }
}
function mapStateToProps(state) {
  return {
    wishlistData: state.product.wishlistdata,
    isupdated: state.product.isupdated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetWishList);
