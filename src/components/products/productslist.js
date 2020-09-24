import React from 'react';
import $ from "jquery";
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { addToCart, addToWishList, removeWishList, getProductList, productFilter, getProductForQuickView, updateCart, fetchCartAndWihslistCount } from '../../actions/products';
import { objectToQueryString, makeArrayForBrandsAndCate, currencySymbol, delcurrencySymbol } from '../../common/common';
import PopupModal from '../common/popupModal';
import Pagination from "react-paginate";
import SideBar from "./sidebar";
import QuickView from "./quickView";
import Timeslot from '../../common/timeslot'
// import InfiniteScroll from 'react-infinite-scroller';
/*eslint-disable no-script-url*/
class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 0,
      disabled: false,
      serachresult: true,
      isLoaded: false,
      page_number: (this.props.location.query.page_number) ? this.props.location.query.page_number -1 : 0,
      categories: (this.props.location.query.categories) ? this.props.location.query.categories.split(",") : [],
      number_of_records_needed: (this.props.location.query.number_of_records_needed) ? this.props.location.query.number_of_records_needed : "18",
      children_cat_ids: (this.props.location.query.children_cat_ids) ? this.props.location.query.children_cat_ids.split(",") : [],
      brand_ids: (this.props.location.query.brand_ids) ? this.props.location.query.brand_ids.split(",") : [],
      price_range: (this.props.location.query.price_range) ? this.props.location.query.price_range : '',
      max_price: (this.props.location.query.max_price) ? this.props.location.query.max_price : '',
      min_price: (this.props.location.query.min_price) ? this.props.location.query.min_price : '',
      search_keyword: (this.props.location.query.search_keyword) ? this.props.location.query.search_keyword : '',
      cat_id: (this.props.location.query.cat_id) ? this.props.location.query.cat_id : 0,

      products: [],
      allBrands: [],
      allCategories: [],
      brandnames: [],
      brands: [],
      attributes: [],
      filterSelected: [],
      finalfilterSelected: [],
      isOpenLightbox: false,
      model: false,
      productdetailsquickview: false,
      catId: this.props.location.query.cat_id,
    }
    this.pathname = this.props.location.pathname;
    this.addItemInCart = this.addItemInCart.bind(this);
    this.removeItemInCart = this.removeItemInCart.bind(this);
    this.addItemInWishlist = this.addItemInWishlist.bind(this);
    this.removeItemInWishlist = this.removeItemInWishlist.bind(this);
    this.closeImagePopup = this.closeImagePopup.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.updateItemCount = this.updateItemCount.bind(this);
    this.updateItemInCart = this.updateItemInCart.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.updateItemInCartonEnter = this.updateItemInCartonEnter.bind(this);
    this.updateItemCountOnInput = this.updateItemCountOnInput.bind(this);
    
  }

  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })
    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "1"
    }

    this.props.addToCart(objectToQueryString(formData))
      .then((response) => {
        this.setState({ disabled: false });
        this.state.products.filter((item, index) => {
          if (item.id.toString() === id) {
            const newState = this.state.products;
            newState[index].exists_in_cart = true;
            newState[index].in_my_wishlist = "N";
            this.setState({
              products: newState
            })
          }
          return false;
        });
        this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
      })
      .catch((err) => {
        this.setState({ disabled: false });
      });
    return true
  }
  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const producttype = event.target.dataset.producttype ? event.target.dataset.producttype : findDOMNode(event.target).parentNode.dataset.producttype;
    Object.assign(this.state, { type: type, id: id, producttype: producttype })
    const formData = {
      item_type: type === "combo" ? "combo" : "product",
      item_id: id,
      quantity: parseInt(this.state.quantity, 10) >= 0 ? parseInt(this.state.quantity, 10) : "0"
    }
    
      this.props.updateCart(objectToQueryString(formData))

    return true
  }
  // updateItemCount(event) {
  //   event.preventDefault();
  //   const target = event.target;
  //   const value = target.value;
  //   let itemCount = event.target.dataset.itemcount
  //   const doJob = event.target.dataset.do ? event.target.dataset.do : findDOMNode(event.target).parentNode.dataset.do;
  //   let count = doJob === "plus" ? parseInt(itemCount, 10) >= 1 ? parseInt(itemCount, 10) + 1 : parseInt(itemCount, 10) + 2 : parseInt(itemCount, 10) > 1 ? parseInt(itemCount, 10) - 1 : 1;
  //   let tempproduct = this.state.productdetailsquickview;
  //   tempproduct.quantity_in_my_cart = count.toString()
  //   if (value) {
  //     tempproduct.quantity_in_my_cart = value
  //     count = value
  //   }
  //   Object.assign(this.state, {
  //     productdetailsquickview: tempproduct, quantity: count
  //   })
  //   this.setState({
  //     productdetailsquickview: tempproduct, quantity: count
  //   })
  //   return false;
  // }
  componentWillMount() {
    const formData = {
      cat_id: this.state.cat_id ? this.state.cat_id : this.state.catId,
      categories: this.state.categories ? this.state.categories : this.state.cat_id,
      children_cat_ids: this.state.children_cat_ids,
      max_price: this.state.max_price,
      min_price: this.state.min_price,
      brand_ids: this.state.brand_ids,
      page_number: this.state.page_number,
      number_of_records_needed: "18",
      search_keyword: this.state.search_keyword,
      catalogue_id: localStorage.getItem('catlogid') ?  localStorage.getItem('catlogid'): "1"
    }
    if (this.state.cat_id || this.state.search_keyword || this.state.brand_ids) {
      this.props.productFilter(objectToQueryString(formData))
    }    
    this.props.getProductList(objectToQueryString(formData))
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  closeImagePopup() {
    this.setState({
      isOpenLightbox: false
    })
  }

  hideModal() {
    this.setState({ model: false })
  }
  showModal(e) {
    Object.assign(this.state, { productdetailsquickview: [] })
    this.setState({
      product: JSON.parse(e.target.dataset.data),
      model: true
    });
    const formData = {
      product_id: JSON.parse(e.target.dataset.data).id,
    }
    this.props.getProductForQuickView(objectToQueryString(formData))
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.isupdated && this.state.model) {
    //   const formData = {
    //     product_id: this.state.product.id,
    //   }
    //   this.props.getProductForQuickView(objectToQueryString(formData))
    // }
    if (Object.keys(nextProps.filters).length) {
      let attributedArray = [];
      let finalattributedArray = [];
      let price_range = [nextProps.filters.data[0].price.min_price, nextProps.filters.data[0].price.max_price]
      let allCat = makeArrayForBrandsAndCate(nextProps.filters.data[1].options);
      let brandArray = makeArrayForBrandsAndCate(nextProps.filters.data[2].options)
      let filterTakeOut = ["price", "categories", "brands"]
      nextProps.filters.data.map(function (item, index) {
        if (!filterTakeOut.includes(item.filter_type)) {
          attributedArray.push(nextProps.filters.data[index].options)
        }
        return attributedArray;
      })
      finalattributedArray = Array.prototype.concat.apply([], attributedArray)
      this.setState({ newloadCat: false, price_range: price_range.join('-'), min_price: nextProps.filters.data[0].price.min_price, max_price: nextProps.filters.data[0].price.max_price, allBrands: brandArray, allCategories: allCat, allAttributes: finalattributedArray.length > 0 ? makeArrayForBrandsAndCate(finalattributedArray) : [] });
  
    }
    if (!Array.isArray(nextProps.productdetailsquickview.data) && nextProps.productdetailsquickview.data !== undefined) {
      Object.assign(this.state, { productdetailsquickview: nextProps.productdetailsquickview.data, originalValue: nextProps.productdetailsquickview.data.quantity_in_my_cart })
      this.setState({
        productdetailsquickview: nextProps.productdetailsquickview.data,
        originalValue: nextProps.productdetailsquickview.data.quantity_in_my_cart
      });
    }
    if (nextProps.isupdated && nextProps.added) {
      const formData = {
        cat_id: this.state.cat_id,
        children_cat_ids: this.state.children_cat_ids,
        brand_ids: this.state.brand_ids,
        page_number: this.state.page_number,
        number_of_records_needed: "18",
        search_keyword: this.state.search_keyword,
        catalogue_id: localStorage.getItem('catlogid') ?  localStorage.getItem('catlogid'): "1"
      }

      // this.props.getProductList(objectToQueryString(formData))
      this.props.fetchCartAndWihslistCount(objectToQueryString(formData))


    }
    const thisLocationSearch = (this.props.location.search_keyword) ? this.props.location.search_keyword : '';
    const nextLocationSearch = (nextProps.location.query.search_keyword) ? nextProps.location.query.search_keyword : '';  
    if (thisLocationSearch !== nextLocationSearch && localStorage.getItem('search') === 'true') {
      let formData = {
        search_keyword: nextProps.location.query.search_keyword,
      }
      localStorage.setItem('search', 'fasle');
      this.setState({ products: [], cat_id: nextProps.location.query.cat_id, activePage: 1, serachresult: false, search_keyword:nextProps.location.query.search_keyword });
      this.props.getProductList(objectToQueryString(formData))
    }
    const thisLocationCatId = (this.props.location.query.cat_id) ? this.props.location.query.cat_id : '';
    const nextLocationCatId = (nextProps.location.query.cat_id) ? nextProps.location.query.cat_id : '';
    if (nextLocationCatId !== '' && thisLocationCatId !== '' && parseInt(thisLocationCatId, 10) !== parseInt(nextLocationCatId, 10)) {
      let formData = {
        cat_id: nextProps.location.query.cat_id,
        number_of_records_needed: "18",
      }
      $("html, body").animate({ scrollTop: 0 }, 1);
      this.setState({ products: [], cat_id: nextProps.location.query.cat_id, newloadCat: true, activePage: 1 });
      this.props.productFilter(objectToQueryString(formData))
      this.props.getProductList(objectToQueryString(formData))
    }
    /* if (nextLocationCatId !== '' && thisLocationCatId === '') {
      let formData = {
        cat_id: nextProps.location.query.cat_id,
        number_of_records_needed: "18",
      }
      $("html, body").animate({ scrollTop: 0 }, 1);
      this.setState({ products: [], cat_id: nextProps.location.query.cat_id });
      this.props.productFilter(objectToQueryString(formData))
      this.props.getProductList(objectToQueryString(formData))
    } */
    if (nextProps.productsList.hasOwnProperty('data')) {
      if (nextProps.productsList.data.length > 0) {
        Object.assign(this.state, { products: nextProps.productsList.data, nodata: nextProps.productsList.data.length > 0 ? false : true })
      } else {
        this.setState({ products: nextProps.productsList.data, isLoaded: true, nodata: nextProps.productsList.data.length > 0 ? false : true });
      }
    }

  }
  removeItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    let itemCount = event.target.dataset.itemcount
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: id,
      quantity: parseInt(itemCount, 10) - 1
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.updateCart(objectToQueryString(formData))
    return true
  }

  removeItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    this.setState({ disabled: true });
    const formData = {
      item_type: "product",
      item_id: itemID,
      quantity: 1
    }
    this.props.removeWishList(objectToQueryString(formData)).then((response) => {
      this.setState({ disabled: false });
      this.state.products.filter((item, index) => {
        if (item.id === itemID) {
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
      .catch((err) => {
        this.setState({ disabled: false });
      });
    return true
  }

  addItemInWishlist(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      item_type: "product",
      item_id: itemID
    }
    this.props.addToWishList(objectToQueryString(formData))
      .then((response) => {
        this.setState({ disabled: false });
        this.state.products.filter((item, index) => {
          if (item.id.toString() === itemID) {
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
      .catch((err) => {
        this.setState({ disabled: false });
      });
  }
  handlePageChange(data) {
    
    this.setState({ page_number: data.selected});
    Object.assign(this.state, {page_number: data.selected})
    this.handleSearchSubmit();
    $("html, body").animate({ scrollTop: 0 }, 600);
    // window.addEventListener('click', function() {
    var allimages = document.getElementsByTagName('img');
    for (var i = 0; i < allimages.length; i++) {
      if (allimages[i].getAttribute('data-src')) {
        allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
      }
    }
    // }, false)
  }
  handleSearchChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'search_keyword') {
      // if (value.length >= 2) {
      this.setState({
        search_keyword: value,
      });
      const formData = {
        item_type: "product",
        cat_id: this.state.cat_id,
        children_cat_ids: this.state.children_cat_ids,
        brand_ids: this.state.brand_ids,
        page_number: this.state.page_number,
        number_of_records_needed: "18",
        search_keyword: value,
        catalogue_id: localStorage.getItem('catlogid') ?  localStorage.getItem('catlogid'): "1"
      }
      this.props.getProductList(objectToQueryString(formData))
      // }

    }
  }

  handleInputChange(event) {
    console.log('event', event)

    if (!Array.isArray(event)) {
      let price = event;
      Object.assign(this.state, { min_price: price.min, max_price: price.max })
      this.setState({
        price_range: price.min+'-'+price.max,
        min_price: price.min,
        max_price: price.max 
      });
      // Object.assign(this.state, {  price_range: event.join('-'), min_price: price[0], max_price: price[1]})
    } else {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (target.type !== 'checkbox') {
        this.setState({
          [name]: value
        });

      } else {
        let tempFilter = this.state.filterSelected
        if (target.checked) {
          tempFilter.push({ name: name, value: value });
          this.setState({
            filterSelected: tempFilter
          });
        } else {
          let tempFilterunsSelected = tempFilter.filter((item) => {
            return (value !== item.value)
          });
          Object.assign(this.state, { filterSelected: tempFilterunsSelected })
        }
      }
    }
    this.setState({ page_number: 1, products: [] });
    this.handleSearchSubmit();
  }

  handleSearchSubmit(event) {
    const input = this.state.filterSelected
    const attributes = new Set();
    input.forEach(({ name, value }) => attributes.add(name));
    let lists = [];
    attributes.forEach((filterName) => { lists[filterName] = input.filter(item => item.name === filterName).map(item => parseInt(item.value, 10)); });
    this.setState({ finalfilterSelected: lists });
    let brands = lists.brands;
    let categories = lists.categories;
    const takeOut = ['brands', 'categories'];
    const attrs = Object.keys(lists).filter(item => !takeOut.includes(item)).map(attr => lists[attr]).reduce((acc, cur) => acc.concat(cur), []);
    let filter = {
      children_cat_ids: categories ? categories.join(',') : null,
      brand_ids: brands ? brands.join(',') : null,
      attribute_options_csv: attrs ? attrs.join(',') : null,
      price_range: this.state.price_range,
      min_price: this.state.min_price,
      max_price: this.state.max_price,
      search_keyword: this.state.search_keyword,
      number_of_records_needed: "18",
      page_number: this.state.page_number + 1,
      cat_id: (this.props.location.query.cat_id) ? this.props.location.query.cat_id : this.state.cat_id,
      catalogue_id: localStorage.getItem('catlogid') ?  localStorage.getItem('catlogid'): "1"
    }
    this.setState({ tempfilter: filter, children_cat_ids: categories ? categories.join(',') : [], attribute: attrs ? attrs.join(',') : [] });
    const filterData = objectToQueryString(filter)
    this.props.getProductList(filterData)
    if (this.props.params.id > 0) {
      browserHistory.push('/products?' + this.props.params.id + '?' + filterData);
    } else {
      browserHistory.push('/products?' + filterData);
    }


  }

    componentDidMount() {
    //   var isInViewport = function (elem) {
    //     var bounding = elem.getBoundingClientRect();
    //     return (
    //         bounding.top >= 0 &&
    //         bounding.left >= 0 &&
    //         bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    //     );
    // };
    // $(window).scroll(function () {
     
    //   // if (!isInViewport('footer')) {
    //     $(".aside-left").stop().animate({ "marginTop": ($(window).scrollTop() > 0) ? ($(window).scrollTop() - 30) + "px" : $(window).scrollTop() + "px", "marginLeft": ($(window).scrollLeft()) + "px" }, "slow");
    //   //  }
    // });
    
  }
  // forceUpdateHandler() {
  //   this.forceUpdate();
  // };
 

  // componentDidMount() {
  //   var allimages = document.getElementsByTagName('img');
  //   for (var i = 0; i < allimages.length; i++) {
  //     if (allimages[i].getAttribute('data-src')) {
  //       allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
  //     }
  //   } 
  // }

  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
      pathname: '/login',
      search: '',
      state: { previouspath: this.pathname }
    });
  }

  updateItemCount(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    const value = target.value;
    let itemCount = event.target.dataset.itemcount
    const index = event.target.dataset.index  !== undefined ? event.target.dataset.index : findDOMNode(event.target).parentNode.dataset.index;
    const doJob = event.target.dataset.do !== undefined ? event.target.dataset.do : findDOMNode(event.target).parentNode.dataset.do;
    let count =  doJob === "plus" ?  parseInt(itemCount, 10) >= 1 ?  parseInt(itemCount, 10) + 1 :  parseInt(itemCount, 10) + 2 : parseInt(itemCount, 10) > 1 ?  parseInt(itemCount, 10) - 1 : 1 ;
    console.log('update count by click ', value,itemCount, index, doJob , count)
    const tempproduct = this.state.products;
    tempproduct[index].quantity_in_my_cart =  count.toString()
      if(value) {
        tempproduct[index].quantity_in_my_cart = value 
        count = value
      }
      this.setState({
        products: tempproduct,
        quantity: count ,
        item_type: "product",
        item_id:  tempproduct[index].id,
      })
   
      return false;
  }
  updateItemCountOnInput(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    const value = target.value;
    const index = event.target.dataset.index !== undefined ? event.target.dataset.index : findDOMNode(event.target).parentNode.dataset.index;
    const tempproduct = this.state.products;
    tempproduct[index].quantity_in_my_cart =  value.toString()
    console.log('vvvv',  event.keyCode,  value, index,  tempproduct[index].id,)
      if(value) {
        tempproduct[index].quantity_in_my_cart = value 
      }
      // Object.assign(this.state, { 
      //   products:tempproduct,
      //   item_type: "product",
      //   item_id:  tempproduct[index].id,
      //   quantity: value ,
      // })
      this.setState({
        products: tempproduct,
        quantity: value ,
        item_type: "product",
        item_id:  tempproduct[index].id,
      })
  }
  updateItemInCartonEnter(event) {
    event.preventDefault();
      // if(event.keyCode === 13) {
        console.log('this.state', this.state)
        const formData = {
          item_type: this.state.item_type,
          item_id:  this.state.item_id,
          quantity: this.state.quantity
        }
     
      this.props.updateCart(objectToQueryString(formData))
      // this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    // return true
  }

  render() {
    // let isLoaded = this.state.isLoaded;
    let parentCate = [];
    let showing_in_brands = [];
    let showing_in_attributes = [];
    let showing_in_categories = [];
    let children_cat_ids = (this.props.location.query.children_cat_ids) ? this.props.location.query.children_cat_ids.split(",") : []
    let brand_ids = (this.props.location.query.brand_ids) ? this.props.location.query.brand_ids.split(",") : []
    let attribute_ids = (this.props.location.query.attribute_options_csv) ? this.props.location.query.attribute_options_csv.split(",") : []
    let cat_id = (this.props.location.query.cat_id) ? this.props.location.query.cat_id : 0
    if (this.state.allBrands) {
      brand_ids.map((brands, index) => {
        showing_in_brands.push(this.state.allBrands[brands]);
        return true;
      });
    }
    if (cat_id && localStorage.getItem('categories')) {
      parentCate = makeArrayForBrandsAndCate(JSON.parse(localStorage.getItem('categories')))
      if (parentCate[cat_id]) {
        showing_in_categories.push(parentCate[cat_id])
      } else {
        let categoriesList = JSON.parse(localStorage.getItem('categories'))
        categoriesList.map(item => {
          if ('subcat' in item && item.subcat.length > 0) {
            item.subcat.forEach(element => {
              if (element.id === cat_id) {
                showing_in_categories.push(element.name)
              }
              if ('subsubcat' in element && element.subsubcat.length > 0) {
                element.subsubcat.forEach(element => {
                  if (element.id === cat_id) {
                    showing_in_categories.push(element.name)
                  }
                });
              }
            });
          }
          return showing_in_categories;
        });
      }
    }
    if (this.state.children_cat_ids && this.state.children_cat_ids.length > 0) {
      children_cat_ids.map((category, index) => {
        showing_in_categories.push(this.state.allCategories[category]);
        return true;
      });
    }

    if (this.state.allAttributes) {
      attribute_ids.map((attribute, index) => {
        showing_in_attributes.push(this.state.allAttributes[attribute]);
        return true;
      });
    }
    let search_keyword =  this.props.location.query.search_keyword
    let products = this.state.products;
    return (
      <div>
        <div>
  <section className="about-sec  content-sec">{/*OPEN slider-sec */}
    {/* <div className="container">
      <h2 className="inner-title">Category</h2>
    </div>  */}
  </section>{/*END slider-sec */}
  <section id="eye-catcher" className="eye-catcher-sec content-sec">{/* OPEN slider-sec */}
  {/*<Timeslot />*/}
  </section>
</div>  
        <section id="section1" className="categories-sec content-sec m-t-30 p-b-40">
        <div className="bg10 p-t-120 p-b-140 mob-container">
          <div className="container">
          
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-3">
                <div className="row">
                  {!Array.isArray(this.props.filters) ?
                    <SideBar
                      handleSearchChange={this.handleSearchChange}
                      handleInputChange={this.handleInputChange}
                      cdHandleSubmit={this.handleSearchSubmit}
                      filters={this.props.filters}
                      key={21}
                      states={this.state}
                      cat_id={(this.props.params.id > 0) ? parseInt(this.props.params.id, 10) : 0}
                    />
                    : null}
                </div>
              </div>
              <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12 filter-heading filter-tope-group m-tb-10">
                  {(localStorage.getItem('catlogid') == 2) ? (<h3 className="alert alert-success wish-alert">Wish to shop plastic free? Go to <u>SurreyWhales</u>.</h3>) :''}
                    <h3 className="product-heproductading mtext-104 cl6 m-r-32">
                      {(showing_in_brands.length) ? (
                        (search_keyword) ?
                          <span>Showing results for  "{search_keyword}" {showing_in_brands.join(', ')} {(showing_in_categories.length) ? (['in ', showing_in_categories.join(', ')]) : ''}</span>
                          : <span>Showing products by {showing_in_brands.join(', ')} {(showing_in_categories.length) ? (['in ', showing_in_categories.join(', ')]) : ''}</span>
                      ) : (
                          (search_keyword) ?
                            <span>Showing results for  "{search_keyword}" {showing_in_categories.join(', ')} </span> :
                            showing_in_categories.join(', ')
                        )}
                    </h3>                    
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12 filter-select m-tb-10">
                    {/* <div className="flex-c-m cl6 hov-btn3 m-r-8 m-tb-4">
                      <select className="form-control">
                        <option>Default</option>
                        <option>Popularity</option>
                        <option>Average rating</option>
                        <option>New In</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                
                  {products.length > 0 ?
                    products.map(function (product, index) {
                      return (
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
                          <form onSubmit={this.updateItemInCartonEnter}>
                                <div className="input-group">
                                  <span className="input-group-btn">
                                  <button type="button" data-producttype="main" data-do="minus"  data-type="minus" data-index={index}   data-itemcount={product ? product.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={product ? product.id : null}   className="btn btn-default btn-number"  data-itemtype={product.item_type}>-</button>
                                  </span>
                                  {/* <input max="500" data-id={product ? product.id : null} onFocus={this.handleFocus} data-itemtype={product.item_type} className="form-control text-center" min="1" type="number" name="qty"  value={product.quantity}  onChange={this.updateItemInCart}/> */}
                                  <input data-producttype="main" className="form-control input-number"  data-index={index}   min="1" type="number" name="quantity" value={product.quantity_in_my_cart === "0" ? "1" : product.quantity_in_my_cart ? product.quantity_in_my_cart : "1"} data-id={product ? product.id : null} data-itemtype={product.item_type} onChange={this.updateItemCountOnInput}  />
                                  <span className="input-group-btn">
                                  <button type="button" data-producttype="main" data-do="plus" data-type="plus"  data-index={index}  data-itemcount={product ? product.quantity_in_my_cart : 1} onClick={this.updateItemCount} data-id={product.id}   className="btn btn-default btn-number"  data-itemtype={product.item_type}>+</button>
                                  </span>
                                </div>
                              </form>
                          </div>
                          
                          <a onClick={this.addItemInCart} data-itemcount={product ? product.quantity_in_my_cart : 1} data-id={product.id} href="javascript:void(0)" className="add-to-cart">
                                Add to cart
                           </a>
                           <Link to={"/product/" + product.slug + "/" + product.id} className="view-detail">
                           View Detail
                                </Link>
                         </div> 
                       </div>
                     </div>  
                   </div>
                      
                      )
                    }.bind(this))
                    : this.state.nodata ? <div className="noproduct"></div> : null
                  }
                  <div className="container  forpagination pull-right">
                  <div className="pull-right">
                    {
                      (this.props.productsList.hasOwnProperty('total_pages') && this.props.productsList.total_records > 18) ? (
                        <Pagination
                          pageCount={this.props.productsList.total_pages}
                          nextLabel={"Next"}
                          disableInitialCallback={true}
                          
                          initialPage={parseInt(this.state.page_number, 10)}
                          forcePage={parseInt(this.state.page_number, 10)}
                          breakLabel={<a href="">...</a>}
                          breakClassName={"break-me"}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={2}
                          onPageChange={this.handlePageChange}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                      ) : ('')
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {console.log('this.state.page_number', this.state.page_number)} */}
        {this.state.model ?
          <PopupModal title={this.state.popname} size="lg" cbHideModal={this.hideModal} >
            <QuickView
              data={this.state.productdetailsquickview}
              csstate={this.state}
              addItemInCart={this.addItemInCart}
              addItemInWishlist={this.addItemInWishlist}
              removeItemInWishlist={this.removeItemInWishlist}
              removeItemInCart={this.removeItemInCart}
              updateItemCount={this.updateItemCount}
              updateItemInCart={this.updateItemInCart}
            />
          </PopupModal> : null}
          </section>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: bindActionCreators(addToCart, dispatch),
    updateCart: bindActionCreators(updateCart, dispatch),
    addToWishList: bindActionCreators(addToWishList, dispatch),
    removeWishList: bindActionCreators(removeWishList, dispatch),
    getProductList: bindActionCreators(getProductList, dispatch),
    getProductForQuickView: bindActionCreators(getProductForQuickView, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    productFilter: bindActionCreators(productFilter, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    isupdated: state.product.isupdated,
    added: state.product.added,
    productsList: state.product.products,
    productdetailsquickview: state.product.productdetailsquickview,
    categoriesList: state.common.categories,
    brandsList: state.home.brands,
    filters: state.product.filters
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

