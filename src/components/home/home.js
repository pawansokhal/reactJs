import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Products from './products';
import $ from "jquery";
import CatModel from './catmodel';
import { fetchBanners, fetchBrands } from '../../actions/home';
import { addToCart, homePageProduct, updateCart, removeWishList, addToWishList, getProductForQuickView, fetchCartAndWihslistCount } from '../../actions/products';
import { objectToQueryString } from '../../common/common';
import Banners from './slickslider';
// import Video from './video';
import "react-image-gallery/styles/css/image-gallery.css";
// import PopupModal from '../common/popupModal';
// import QuickView from '../products/quickView';
import Timeslot from '../../common/timeslot';

/*eslint-disable no-script-url*/
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            productdetailsquickview: false,
            isOpenLightbox: false,
            model: true,
        }
        this.addItemInCart = this.addItemInCart.bind(this);
        this.addItemInWishlist = this.addItemInWishlist.bind(this);
        this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
        this.updateItemInCart = this.updateItemInCart.bind(this);
        // this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateItemCount = this.updateItemCount.bind(this);
    }


    updateItemCount(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    let itemCount = event.target.dataset.itemcount
    const index = event.target.dataset.index !== undefined ? event.target.dataset.index : findDOMNode(event.target).parentNode.dataset.index;
    const doJob = event.target.dataset.do !== undefined ? event.target.dataset.do : findDOMNode(event.target).parentNode.dataset.do;
    let count =  doJob === "plus" ?  parseInt(itemCount, 10) >= 1 ?  parseInt(itemCount, 10) + 1 : parseInt(itemCount, 10) + 2 : parseInt(itemCount, 10) > 1 ?  parseInt(itemCount, 10) - 1 : 1 ;
    const tempproduct = this.state.products;
    tempproduct[index].quantity_in_my_cart =  count.toString()
    
      if(value) {
        tempproduct[index].quantity_in_my_cart = value 
        count = value
      }
      Object.assign(this.state, { 
        products:tempproduct
      })
      this.setState({
        products: tempproduct,
        quantity: count  
      })
      
    
      return false;
  }

  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type !== undefined ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype !== undefined ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })

    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ?  parseInt(this.state.quantity, 10) : "0"
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToCart(objectToQueryString(formData))
    return true
  }
  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;    
    const type = event.target.dataset.type !== undefined ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype !== undefined ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })
    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ?  parseInt(this.state.quantity, 10) : "0"
    }

    this.props.updateCart(objectToQueryString(formData))
    return true
  }
  
  removeItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: itemID,
      quantity: 1
    }
     this.props.removeWishList(objectToQueryString(formData)).then((response) =>{
      this.setState({disabled:false});
      this.state.products.filter((item, index) =>{
          if(item.id === itemID){
              const newState = this.state.products;
              newState[index].in_my_wishlist = "N";
              this.setState({
                  products: newState
              })
              this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
          }
          return false;
      });      
    })
    .catch((err)=>{
        this.setState({disabled:false});
  });
    return true
  }
  
  addItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id !== undefined ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      item_type: "product",
      item_id: itemID
    }
    this.props.addToWishList(objectToQueryString(formData))
    .then((response) =>{
      this.setState({disabled:false});
      this.state.products.filter((item, index) =>{
          if(item.id.toString() === itemID){
              const newState = this.state.products;
              newState[index].in_my_wishlist = "Y";
              this.setState({
                  products: newState
              })
              this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
          }
          return false;
      });
    })
    .catch((err)=>{
        this.setState({disabled:false});
  });
  }
    componentWillMount() {
      
        this.props.homePageProduct();
        this.props.fetchBanners();
        var allimages = document.getElementsByTagName('img');
        for (var i = 0; i < allimages.length; i++) {
          if (allimages[i].getAttribute('data-src')) {
            allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
          }
        }
    }

    hideModal() {
        this.setState({ model: false })
    }
    componentDidMount() {
    
        setTimeout( function(){$('#myVideo').fadeOut( "slow" );} , 12000);
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.isupdated && this.state.model) {
        //     const formData = {
        //         product_id: this.state.product.id,
        //     }
        //     this.props.getProductForQuickView(objectToQueryString(formData))
        // }
        if (nextProps.productdetailsquickview) {
            if (!Array.isArray(nextProps.productdetailsquickview.data) && nextProps.productdetailsquickview.data !== null &&  nextProps.productdetailsquickview.data !== undefined) {
                Object.assign(this.state,  { originalValue : nextProps.productdetailsquickview.data.quantity_in_my_cart})
                this.setState({
                    productdetailsquickview: nextProps.productdetailsquickview.data,
                    originalValue : nextProps.productdetailsquickview.data.quantity_in_my_cart
                });
                
            }
        }
        if (nextProps.productsList) {
            if (!Array.isArray(nextProps.productdetailsquickview.data) && nextProps.productdetailsquickview.data !== null &&  nextProps.productdetailsquickview.data !== undefined) {
                Object.assign(this.state,  { originalValue : nextProps.productdetailsquickview.data.quantity_in_my_cart})
                this.setState({
                    productdetailsquickview: nextProps.productdetailsquickview.data,
                    originalValue : nextProps.productdetailsquickview.data.quantity_in_my_cart
                });
                
            }
        }
        if(nextProps.productsList.hasOwnProperty('data')){     
            if(nextProps.productsList.data.length > 0 ){
              Object.assign(this.state, {products : nextProps.productsList.data, nodata:nextProps.productsList.data.length > 0 ? false : true })
             } else {
                 this.setState({ products:nextProps.productsList.data, isLoaded:true, nodata:nextProps.productsList.data.length > 0 ? false : true });
             }
        }
       
        if (nextProps.added && nextProps.isupdated) {
            const formData = {
                item_type: "product"
            }
            this.props.homePageProduct();
            this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
        }

    }
    // homelink(){
    //     const itemID = event.target.dataset.pagename !== undefined ? event.target.dataset.pagename : findDOMNode(event.target).parentNode.dataset.pagename;
    //     browserHistory.push({
    //         pathname: '/login',
    //         search: '',
    //         state: { previouspath:'/newin' }
    //        });
    // }
    render() {



        // const currentLocation = this.props.location.pathname;
        let images = [];
        
        return (
            // <main className="main-container">

                <div className="">
                      {/* <Video/> */}
                   
                        <section id="eye-catcher" className="eye-catcher-sec content-sec">{/*OPEN slider-sec */}
                        <div  className="slider-sec1">
                        {this.props.banners ?  <Banners banners={this.props.banners} /> : null}
                     
                       </div>
                       <Timeslot />
                        </section>
                        <section id="section1" className="boxes-sec content-sec p-b-10 m-t-30">{/*OPEN slider-sec */}
                            <div className="container">
                            <div className="row"> 
                                 {/* <a href="javascript:void(0)" onClick={this.homelink}>  */}
                                 <Link to="/orders"> 
                                <div className="col-md-4 col-sm-4 col-xs-4 top-boxes">
                                <div className="box-col order-box-col"><span className="icon-box"><img src="images/order.png" alt="order" /></span>
                                    <p><span>Shop from</span> previous order</p></div>
                                </div> 
                                </Link> 
                                <Link to="/wishlist"> 
                                <div className="col-md-4 col-sm-4 col-xs-4 top-boxes">
                                <div className="box-col favorite-box-col"><span className="icon-box">
                                <img src="images/heart.png" alt="order" /></span>
                                    <p><span>Shop from</span> my favourites</p>
                                </div>
                                </div> 
                                </Link>
                                <Link to="/offers"> 
                                <div className="col-md-4 col-sm-4 col-xs-4 top-boxes">
                                <div className="box-col gift-box-col"><span className="icon-box"><img src="images/gift.png" alt="order" /></span><p><span>View all</span>
                                     OFFERS</p></div>
                                </div>  
                                </Link>
                            </div>
                            </div>
                        </section>
                    
                {/* {this.state.model ?

             
                <Video/>
        : null} */}
         
                    {/* {currentLocation === "/" ? <Banners banners={this.props.banners} /> : null} */}
                    <CatModel categoriesList={this.props.categoriesList} toplevel={true}/>
                    <Products 
                        productsList={this.state.products}
                        // showModal={this.showModal}
                        data={this.state.productdetailsquickview}
                        images={images}
                        csstate={this.state}
                        onImageClick={this.onImageClick}
                        addItemInCart={this.addItemInCart}
                        addItemInWishlist={this.addItemInWishlist}
                        removeItemInWishlist={this.removeItemInWishlist}
                        removeItemInCart={this.removeItemInCart}
                        updateItemCount={this.updateItemCount} 
                        updateItemInCart={this.updateItemInCart}  
                    />
                </div>
                
            // </main>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBanners: bindActionCreators(fetchBanners, dispatch),
        homePageProduct: bindActionCreators(homePageProduct, dispatch),
        addToCart: bindActionCreators(addToCart, dispatch),
        updateCart: bindActionCreators(updateCart, dispatch),
        addToWishList: bindActionCreators(addToWishList, dispatch),
        removeWishList: bindActionCreators(removeWishList, dispatch),
        fetchBrands: bindActionCreators(fetchBrands, dispatch),
        getProductForQuickView: bindActionCreators(getProductForQuickView, dispatch),
        fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    }
}
function mapStateToProps(state) {
    return {
        banners: state.home.banners,
        isupdated: state.product.isupdated,
        added: state.product.added,
        productsList: state.product.homeproducts,
        categoriesList: state.common.categories,
        brandsList: state.home.brands,
        productdetailsquickview: state.product.productdetailsquickview,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// const ProductImages = (props) => {
//     let gallaryImages = []
//     props.images.map(item => {
//         gallaryImages.push({
//             original: item.full_image,
//             thumbnail: item.thumbnail_image,
//         });
//         return true;
//     });

//     return (
//         <div className="col-md-6 detail-left-sec">
//             <ImageGallery
//                 ref={props.refImageGallery}
//                 items={gallaryImages}
//                 infinite={true}
//                 thumbnailPosition="left"
//                 showFullscreenButton={false}
//                 useBrowserFullscreen={false}
//                 showPlayButton={false}
//                 lazyLoad={false}
//                 onClick={props.cbOnImageClick}
//             />
//         </div>
//     )

// }