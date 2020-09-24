import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom'
import { fetchCategories, fetchCatalogueslist } from '../actions/common';
import Toastr from 'toastr';
import Moment from 'moment';
import { fetchCartAndWihslistCount, getCartData, getProductListSearch, updateCart, clearStateSearch, validatePostcode, timeSlot } from '../actions/products';
import { logout } from '../actions/auth';
import $ from "jquery";
import { objectToQueryString, generateUniqueDeviceId, ucfirst } from './common';
// import Sidebar from './sidebar'
import PopupModal from '../components/common/popupModal';
import Logo from '../images/logo.png';
// import Video from '../components/home/video';
import Zipcode from './zipcode';
import Timeslot from './timeslotHeader';
import ListOfOutSideCompanies from './listofoutsidecompanies';
// import Timeslot from '../containers/images/tesco.png';
/*eslint-disable no-script-url*/

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      istoggle: false,
      cartAndWishlistCount: [],
      serverCall: true,
      parentid: false,
      childid: false,
      search: '',
      firstcall: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEnetr = this.handleEnetr.bind(this);
    this.updateItemInCart = this.updateItemInCart.bind(this);
    this.cartItem = this.cartItem.bind(this);
    this.handleCate = this.handleCate.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setWrapperRefProfile = this.setWrapperRefProfile.bind(this);
    this.setWrapperRefEco = this.setWrapperRefEco.bind(this);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickOutsideProfile = this.handleClickOutsideProfile.bind(this);
    this.handleClickOutsideEco = this.handleClickOutsideEco.bind(this);
    this.postCode = this.postCode.bind(this);
    this.handleSubmitZipcode = this.handleSubmitZipcode.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setTimeSlot = this.setTimeSlot.bind(this);
    this.handleStartDateTimeChanges = this.handleStartDateTimeChanges.bind(this);
    this.timeSlotDropDown = this.timeSlotDropDown.bind(this);
    this.search = this.search.bind(this);
    this.catalog = this.catalog.bind(this);
  }

  setTimeSlot(event) {
    event.preventDefault();
    if (this.state.deliver_by_slot_starting) {
      localStorage.setItem('deliver_by_slot_starting', this.state.deliver_by_slot_starting);
      localStorage.setItem('deliver_date', this.state.deliver_by);
      this.setState({
        deliver_by: this.state.deliver_by,
      });
      setTimeout(function () {
        $('#zipcode').fadeOut(1000);
        this.setState({
          model: false,
        });

      }.bind(this), 1000);
    }
  }
  handleStartDateTimeChanges(event) {
    this.setState({
      deliver_by: Moment(event).format('YYYY-MM-DD'),
      deliver_by_slot_starting: Moment(event).format('HH:mm:ss'),
      // dateTime:event
    });
    const formData = {
      date: Moment(event).format('YYYY-MM-DD')
    }
    this.props.timeSlot(objectToQueryString(formData))
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name; 
  //   this.setState({
  //     [name]: value
  //   });
  // }

  timeSlotDropDown() {
    let timeslot = []
    if (this.props.timeslot !== undefined) {


      if (this.props.timeslot.hasOwnProperty('data')) {
        timeslot = this.props.timeslot.data
      }
      return (
        timeslot.length > 0 ?
          <select className="form-control" name="deliver_by_slot_starting" onChange={this.props.handleInputChange} defaultValue={this.props.deliver_by_slot_starting}>
            <option value="">Select Delivery Time Slot</option>
            {

              timeslot.map(function (time, index) {
                return (
                  // <option key={index} id={index} value={time.start} >{time.start} - {time.end} </option>
                  <option key={index} id={index} value={time.start + "-" + time.end} >{time.start} - {time.end} </option>
                )
              })
            }
          </select>
          : null
      );
    }
  }
  updateItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    const formData = {
      item_type: type,
      item_id: id,
      quantity: "0"
    }
    this.props.updateCart(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.setState({
      serverCall: true
    });
    return true
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // if (name === 'search') {
    //   const formData = {
    //     item_type: "product",
    //     number_of_records_needed: "18",
    //     search_keyword: value
    //   }
    //   this.setState({
    //     [name]: value
    //   });
    //   console.log('target', target)
    //   this.props.getProductListSearch(objectToQueryString(formData))
    // }
    this.setState({
      [name]: value
    });
  }
  handleEnetr(event) {
    event.preventDefault();

  }
  componentWillReceiveProps(nextProps) {
    if (localStorage.getItem('name') === null) {
      if (!Array.isArray(nextProps.profile)) {
        localStorage.setItem('name', nextProps.profile.data.first_name)
      }
    }

    if (!Array.isArray(nextProps.cartAndWishlistCount)) {
      this.setState({
        cartAndWishlistCount: nextProps.cartAndWishlistCount
      });
    }

    if (!Array.isArray(nextProps.categoriesList)) {
      localStorage.setItem('categories', JSON.stringify(nextProps.categoriesList.data));
    }
    if (!Array.isArray(nextProps.catalogues_list)) {
      // console.log('nextProps.catalogues_list', nextProps.catalogues_list)
      localStorage.setItem('catalogues_list', JSON.stringify(nextProps.catalogues_list.data));
    }
    if (nextProps.isupdated && this.state.serverCall) {
      this.props.getCartData()
      this.props.fetchCartAndWihslistCount()
      this.setState({
        serverCall: false
      });
      // $(".header-cart-content").animate({ scrollTop: 0 }, 1);
      return false;
    }
    if (!Array.isArray(nextProps.zipcodes)) {
      if (nextProps.zipcodes.data.postcode_eligible === "N" && this.state.firstcall) {
        Toastr.error('Sorry! We are unable to deliver! ', 'Unable to deliver')
        this.setState({
          firstcall: false
        });
      }
      if (nextProps.zipcodes.data.postcode_eligible === "Y" && this.state.firstcall) {
        localStorage.setItem('postcode', this.state.postcode);

        $('#postcode').css('border', '2px solid green');
        setTimeout(function () {
          $('#zipcode').fadeOut(1000);

        }.bind(this), 1000);
        setTimeout(function () {
          this.setState({
            model: false,
          });

        }.bind(this), 1000);
        this.setState({
          firstcall: false,
        });

      }
      this.setState({
        isValidaPostcode: nextProps.zipcodes.data.postcode_eligible
      });
    }

  }
  tescoli() {
    $("#tesco > li").click(function () {
      $("#tesco > li").removeClass("active");
      $(this).addClass("active");
    });

  }
  addremoveclass() {
    $(".navbar-nav > li").click(function () {
      $(".navbar-nav > li").removeClass("active");
      $(this).addClass("active");
    });

  }

  addremoveclassDropDown() {
    $(".menu_links > li").click(function () {
      $(".menu_links  > li").removeClass("active");
      $(this).addClass("active");
    });

  }
  logoutslideup() {
    $('#menu_links').slideToggle();
  }
  ecomission() {
    $('#ambassador').slideToggle();
  }
  componentDidMount() {



    // $('#menu_links li ').on('click', function () {
    //   $('#menu_links').slideToggle();
    // }.bind(this));

    $('#dLabel').on('click', function () {
      $('#menu_links').slideToggle();
      $('#ambassador').hide();
    }.bind(this));

    $('#ecoambassador').on('click', function () {
      $('#ambassador').slideToggle();
      $('#menu_links').hide();
    }.bind(this));



    $('#cat_link').on('click', function () {
      $('#cat_link_dropdown').slideToggle();
    }.bind(this));

    $('.js-show-modal-search').on('click', function () {
      $('.modal-search-header').addClass('show-modal-search');
      this.setState({
        search: ''
      });
      this.props.clearStateSearch()
    }.bind(this));

    $('.js-hide-modal-search').on('click', function () {
      $('.modal-search-header').removeClass('show-modal-search');
      $('.js-show-modal-search').css('opacity', '1');
      this.setState({
        search: ''
      });
      this.props.clearStateSearch()
    }.bind(this));

    $('.container-search-header').on('click', function (e) {
      e.stopPropagation();
      this.props.clearStateSearch()
      this.setState({
        search: ''
      });

    }.bind(this));
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('mousedown', this.handleClickOutsideProfile);
    document.addEventListener('mousedown', this.handleClickOutsideEco);
  }
  
  componentWillMount() {
    const formData = {
      catalogue_id: localStorage.getItem('catlogid') ? localStorage.getItem('catlogid') : "1",
    }
    this.props.fetchCategories(objectToQueryString(formData))
    this.props.fetchCatalogueslist();
    this.props.fetchCartAndWihslistCount()
    // localStorage.setItem('catlogname', 'Surrey Whales');
    // localStorage.setItem('catlogid', "1");
    localStorage.setItem('catlogname', localStorage.getItem('catlogid') ? localStorage.getItem('catlogid') : 'Surrey Whales');
    localStorage.setItem('catlogid', localStorage.getItem('catlogid') ? localStorage.getItem('catlogid') : "1");
    let device_id = localStorage.getItem('device_id')
    if (device_id === null) {
      localStorage.setItem("device_id", generateUniqueDeviceId());
    }
  }
  cartItem(event) {
    event.preventDefault();
    this.props.getCartData()
  }
  sidebarShow() {
    $('.js-sidebar').addClass('show-sidebar')
  }
  hideCartListSideBar() {
    $('.js-panel-cart').removeClass('show-header-cart');

  }
  handleSubmit(event) {
    this.props.logout()
    this.setState({
      model: false
    });
  }
  handleCate(event) {
    const parentid = event.target.dataset.parentid;
    const childid = event.target.dataset.childid;
    Object.assign(this.state, { parentid: parentid, childId: childid })
    this.setState({
      parentid: parentid, childid: childid, search:''
    });
  }
  handleClickOutsideProfile(event) {
    if (this.wrapperRefProfile && !this.wrapperRefProfile.contains(event.target)) {
      $('#menu_links').hide();
      // $('#ambassador').hide();
    }
  }
  handleClickOutsideEco(event) {
    if (this.wrapperRefEcho && !this.wrapperRefEcho.contains(event.target)) {
      $('#ambassador').hide();
    }
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      $('#cat_link_dropdown').hide();
    }
  }
  setWrapperRefProfile(node) {
    this.wrapperRefProfile = node;
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  setWrapperRefEco(node) {
    this.wrapperRefEcho = node;
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideProfile);
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('mousedown', this.handleClickOutsideEco);
  }
  handleSubmitZipcode(event) {
    event.preventDefault();
    const target = event.target;
    if (this.state.postcode) {
      this.props.validatePostcode(this.state.postcode)


      if (this.props.location.state) {
        if (this.props.location.state.previouspath !== '' && this.props.location.state.previouspath !== undefined) {
          // browserHistory.goBack();
        } else {
          browserHistory.push('/login');
        }
      } else {
        localStorage.setItem("device_id", generateUniqueDeviceId());
        browserHistory.getCurrentLocation()
      }
    } else {
      Toastr.error('Please select your postal code.', 'Postal Code');
      return true;
    }
    this.setState({
      firstcall: true
    });
  }
  postCode(event) {
    localStorage.setItem('postcode', 'skip');
    this.setState({
      postcode: false
    });
  }
  hideModal() {
    this.setState({ model: false })
  }
  showModal(event) {
    const name = event.target.dataset.name !== undefined ? event.target.dataset.name : findDOMNode(event.target).parentNode.dataset.name;
    this.setState({
      model: true,
      modelname: name,
      isValidaPostcode: "N",
      search:''
    });
  }

  search(event) {
    event.preventDefault();
    localStorage.setItem('search', 'true');
    if (event.key === 'Enter') {
      browserHistory.push('/products?search_keyword=' + this.state.search);
    } else {
      browserHistory.push('/products?search_keyword=' + this.state.search);
    }
  }

  catalog(event) {
    // event.preventDefault();
    const id = event.target.dataset.catlogid !== undefined ? event.target.dataset.catlogid : findDOMNode(event.target).parentNode.dataset.catlogid;
    const catlogname = event.target.dataset.catlogname !== undefined ? event.target.dataset.catlogname : findDOMNode(event.target).parentNode.dataset.catlogname;
    const formData = {
      catalogue_id: id,
    }
    localStorage.setItem('catlogname', catlogname);
    localStorage.setItem('catlogid', id);
    Object.assign(this.state, { catlogname: catlogname })
    this.setState({
      model: false
      // catlogname:catlogname
    });
    this.props.fetchCategories(objectToQueryString(formData))
    this.props.fetchCartAndWihslistCount()
    browserHistory.push('/topcate?cat_id=' + id);
  }



  render() {
    let cust_id = localStorage.getItem('cust_id') !== null ? true : false
    let selectedCat = this.props.location.query.cat_id
    // const lastChar = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
    let categories = [];
    let cartdata = [];
    let wishlistItemsTotal = [];

    let cartitems = 0;
    if (this.props.categoriesList.hasOwnProperty('data')) {
      categories = this.props.categoriesList.data.map(item => {
        if ('subcat' in item && item.subcat.length > 0) {
          item.subcat.forEach(element => {
            element.parentId = item.id;
          });
        }
        return item;
      })
    }
    if (this.state.cartAndWishlistCount.hasOwnProperty('data')) {

      cartitems = parseInt(this.state.cartAndWishlistCount.data.cart_items_total, 10)
      wishlistItemsTotal = parseInt(this.state.cartAndWishlistCount.data.wishlist_items_total, 10)
    }

    if (this.props.cartdata.hasOwnProperty('data')) {
      cartdata = this.props.cartdata.data
    }

    let productsList = [];
    if (this.props.productsListSearch.hasOwnProperty('data')) {
      productsList = this.props.productsListSearch.data
    }
    const currentLocation = this.props.location.pathname;
    return (
      <React.Fragment>
        {!localStorage.getItem('postcode') ?
          <Zipcode
            postCode={this.postCode}
            handleInputChange={this.handleInputChange}
            handleSubmitZipcode={this.handleSubmitZipcode}
            isValidaPostcode={this.state.isValidaPostcode}
          /> : null}
        <header id="header" className="section">

          <div className="top-header">
            <div className="container">
              <div className="row">
                <ul className="nav navbar-nav col-md-6 col-sm-6 col-xs-6 top-left-nav">
                  <li className="green"><Link to="/over60">Over 60<span>Order in Person</span></Link></li>
                  <li className="green"><Link to="/freerecycling">Register <span>Free Recycling</span></Link></li>
                  <li className="green"><Link to="/ecoambassador">Apply for<span>Home Hub</span> </Link></li>
                  <li className="green"><Link to="/conciergeservices">Get a<span>Concierge</span> </Link></li>
                </ul>
                <p className="express-delivery col-md-1 col-sm-1 col-xs-1 ">
                  {/* <Link onClick={this.ecomission} to="/ecohmission"> <i class="fa fa-leaf" aria-hidden="true"></i> Plastic Free </Link> */}
                </p>
                <ul className="nav navbar-nav col-md-5 col-sm-5 col-xs-5 text-right top-right-nav pull-right">
                  <li key="1" className="plasticfree-button">
                    <Link to="/categories?cat_id=1510"> <i className="fa fa-leaf" aria-hidden="true"></i>Plastic Free </Link>
                  </li>
                  <li key="2" className="help" ref={this.setWrapperRefEco}>
                    <a href="javascript:void(0)" id="ecoambassador" data-toggle="dropdown1" aria-haspopup="true" aria-expanded="false">
                      Eco-Mission <span className="caret" />
                    </a>
                    <ul id="ambassador" className="dropdown-menu" aria-labelledby="dLabel">
                      <li className="order" ><Link onClick={this.ecomission} to="/mission">The Mission</Link></li>
                      <li className="order"><Link onClick={this.ecomission} to="/ecoambassador">Eco-Ambassador</Link></li>
                      <li className="order"><Link onClick={this.ecomission} to="/juniorecoambassador">Junior Eco-Ambassador</Link></li>
                      <li className="order"><Link onClick={this.ecomission} to="/freerecycling">Free Recycling</Link></li>
                      <li className="order"><Link onClick={this.ecomission} to="/petition">Sign the petition</Link></li>
                      <li className="order"><Link onClick={this.ecomission} to="/plasticfree">#PlasticFree</Link></li>
                    </ul>
                  </li>
                  <li key="3" className={!cust_id ? "login-signup" : "hidden"}>
                    <Link to="/login" className="active">  Login / Register </Link>
                  </li>
                  <li key="4" ref={this.setWrapperRefProfile} className={cust_id ? "user-dropdown dropdown1" : "hidden"}>
                    <a href="javascript:void(0)" id="dLabel" data-toggle="dropdown1" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-user" /> Hi {ucfirst(localStorage.getItem('name'))} <span className="caret" />
                    </a>
                    <ul id="menu_links" className="dropdown-menu" aria-labelledby="dLabel">
                      <li className="order" ><Link onClick={this.logoutslideup} to="/orders">My Orders</Link></li>
                      <li className="order"><Link onClick={this.logoutslideup} to="/profile">My Profile</Link></li>
                      <li className="order"><Link onClick={this.logoutslideup} to="/preferences">My Preferences</Link></li>
                      <li className="order"><Link onClick={this.logoutslideup} to="/comingsoon">My Recycling </Link></li>
                      <li className="logout"><a onClick={this.showModal} data-name="logout" className="btn btn-block btn-default default-btn">Logout</a></li>
                    </ul>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="header-middle-sec">
            <div className="container">
              <div className="row">
                <div className="logo col-md-4 col-sm-4 col-xs-12">
                  <h2> <Link to="/" onClick={this.catalog} data-catlogid="1" data-catlogname="Surrey Whales"><img className="logo" src={Logo} alt="logo" /></Link></h2>
                </div>
                <div className=" col-md-8 col-sm-8 col-xs-12 middle-right-box">
                  {localStorage.getItem('postcode') ?
                    <div className="grey-box post-code">
                      <div className="form-group" id="zipcodebox">
                        <span id="zipcodebox" onClick={this.showModal} data-name="zipcode" className="codebox" type="text" > {localStorage.getItem('postcode') !== "skip" ? localStorage.getItem('postcode') : "Postcode"}</span>
                      </div>
                    </div>
                    : null}

                  <div className={localStorage.getItem('deliver_by_slot_starting') ? "grey-box book-slot" : "grey-box book-slot"}><a href="javascript:void(0)" onClick={this.showModal} data-name="slot" ><i className="fa fa-calendar" />
                    {localStorage.getItem('deliver_by_slot_starting') ?
                      <span>
                        {Moment(localStorage.getItem('deliver_date')).format('DD/MM/YYYY')}<br />
                        {localStorage.getItem('deliver_by_slot_starting')}
                      </span>
                      : "Book A Slot"}
                  </a></div>
                  {wishlistItemsTotal > 0 ?
                    <div className="grey-box cart-box ">
                      {/* <i className="fa fa-shopping-cart" /> <span className="cart-item"> {cartitems > 1 ? cartitems + " Items" : cartitems + " Item"}</span> */}
                      {cust_id ?
                        <Link to="/wishlist" className="activewishlist">
                          <span className="cart-button-box">
                            <i className="fa fa-heart-o" />
                            <span className="cart-item">{wishlistItemsTotal} Wishlist</span>

                          </span>
                        </Link> : null}
                    </div> : null}
                  <div className="grey-box cart-box">
                    {cartitems > 0 ?
                      <Link to="/cart" className="active" >
                        <span className="cart-button-box">
                          <i className="fa fa-shopping-cart" /> <span className="cart-item"> {cartitems > 1 ? cartitems + " Items" : cartitems + " Item"}</span>
                        </span>
                      </Link>
                      : <a href="javascript:void(0)" disabled={true} className="active" >
                        <span className="cart-button-box">
                          <i className="fa fa-shopping-cart" /> <span className="cart-item"> {cartitems > 1 ? cartitems + " Items" : cartitems + " Item"}</span>

                        </span>
                      </a>}
                  </div>
                </div>
              </div>
              {/* header content goes in here */}
            </div>
          </div>
          <div>
            <div className="header-bottom-sec">
              <div className="container">
                <div className="row">
                  {/* Static navbar */}
                  <nav className="navbar" role="navigation">
                    <div className="menu">

                      <div id="navbar" className="navbar-collapse collapse" ref={this.setWrapperRef}>
                        <ul className="nav navbar-nav">
                          <li id="cat_link" className="cat-li dropdown1">
                            <a id="links" onClick={this.addremoveclassDropDown} href="javascript:void(0)" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={localStorage.getItem('catlogid') === "2" ? "/../images/logo-tesco.png" : "/../images/logo-surrey.png"} /> <i className="fa fa-bars" /></a>

                            <ul id="cat_link_dropdown" className="dropdown-menu" aria-labelledby="dLabel">
                              {/* <li >
                                {localStorage.getItem('catlogid') === "1" ?
                                  <Link to="/comingsoonplasticfree?cat_id=16" >
                                    <img src="/../images/eco.png" alt="eco" />
                                  </Link>
                                  : null}

                              </li> */}
                              {categories.length > 0 ?
                                categories.map(function (cate, index) {
                                  // <li key={categories.length + 1} className="submenu" >
                                  //   <Link to={"/categories?cat_id=" + cate.id} >
                                  //     <img src="/../images/eco.png" alt="eco" />
                                  //   </Link>
                                  // </li>
                                  // {console.log('cate.subcat.length: ', cate)}
                                  { return (cate.subcat) ? (

                                    <li key={index} className={cate.subcat.length ? "childcat" : ""} >
                                    {localStorage.getItem('catlogid') === "1" && cate.id === "1510" ?
                                  <Link to="/categories?cat_id=1510" >
                                    <img src="/../images/eco.png" alt="eco" />
                                  </Link>
                                  : 
                                      <Link to={"/categories?cat_id=" + cate.id} >
                                        {cate.name}
                                      </Link>}
                                      <ul className="submenu">
                                        {cate.subcat ?
                                          cate.subcat.map(function (subcat, index) {
                                            return (
                                              // second level
                                              <li className={subcat ? subcat.subsubcat ? "childcat" : "" : null} onClick={this.handleCate} data-childid={subcat.id} data-parentid={cate.id}  key={index}>
                                              {subcat.subsubcat ?  
                                                 <ul className="supersub">
                                                    {subcat.subsubcat.map(function (supersub, index) {
                                                      return (
                                                        // thried level
                                                        <li key={index}>
                                                          <Link onClick={this.handleCate} data-childid={supersub.id} data-parentid={subcat.id} className={selectedCat === subcat.id ? "cat-link-left active" : "cat-link-left"} to={"/products?cat_id=" + supersub.id}>{supersub.name}</Link>
                                                        </li>
                                                      )

                                                    }.bind(this)) }
                                                </ul>
                                                : null}
                                                <Link onClick={this.handleCate} data-childid={subcat.id} data-parentid={cate.id} className={selectedCat === subcat.id ? "cat-link-left active" : "cat-link-left"} to={"/products?cat_id=" + subcat.id}>{subcat.name}</Link>
                                              </li>
                                            )
                                          }.bind(this)) : null}
                                      </ul>
                                    </li>
                                  ) :null}
                                }.bind(this)) : null}
                            </ul>
                          </li>
                          <li className="navli"><Link onClick={this.catalog} data-catlogid={localStorage.getItem('catlogid') === "1" ? "2" : "1"} data-catlogname={localStorage.getItem('catlogid') === "1" ? "Surrey Whales" : "Tesco"}> <img src={localStorage.getItem('catlogid') === "1" ? "/../images/tesco.png" : "/../images/menulogo.png"} alt="menulogo" /></Link></li>
                          <li className="navli"><Link to="/comingsoon"><img src="/../images/waitrosel.png" alt="waitrosel" /></Link></li>
                          <li className="navli"><Link to="/comingsoon"><img src="/../images/laithwaites.png" alt="tesco" /></Link></li>
                          <li className="navli last-nav"><Link to="/categories?cat_id=1510"><img src="/../images/eco.png" alt="eco" /></Link></li>

                          {/* <li className={currentLocation === "/aboutus" ? "active" : null}><Link onClick={this.addremoveclass} to="/aboutus" >About Us</Link></li>
                          <li className={currentLocation === "/mission" ? "active" : null}><Link onClick={this.addremoveclass} to="/mission" >Mission</Link></li>
                          <li className={currentLocation === "/ecoambassador" ? "active" : null}><Link onClick={this.addremoveclass} to="/ecoambassador">Eco Ambassador</Link></li> */}
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <div className="search-form pull-right">
                    <form onSubmit={this.search}>
                      <div className="form-group">
                        <input className="form-control" required name="search" type="search" placeholder="Search" onChange={this.handleInputChange} value={this.state.search} />
                        <button className="btn btn-default submit" ><i onKeyPress={this.search} className="fa fa-search" /></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {this.state.model ?
          <PopupModal title={this.state.modelname === "logout" ? "Are you sure to logout ?" : this.state.popname} size={this.state.modelname === "logout" ? "sm" : null} cancelButton={this.state.modelname === "logout" ? true : null} cbHideModal={this.hideModal} >
            {this.state.modelname === "logout" ? <a onClick={this.handleSubmit} className="pull-right btn btn-default logout-btn">Logout</a> : null}
            {this.state.modelname === "slot" ?
              <Timeslot
                setTimeSlot={this.setTimeSlot}
                handleInputChange={this.handleInputChange}
                handleStartDateTimeChanges={this.handleStartDateTimeChanges}
                timeSlotDropDown={this.timeSlotDropDown}
                hideModal={this.hideModal}
                border={this.state.firstcall} /> : null}
            {this.state.modelname === "zipcode" ?
              <Zipcode
                postCode={this.postCode}
                handleInputChange={this.handleInputChange}
                handleSubmitZipcode={this.handleSubmitZipcode}
                isValidaPostcode={this.state.isValidaPostcode}
                hideModal={this.hideModal}
                border={this.state.firstcall}
              />
              : null}
            {this.state.modelname === "tesco" ?
              <ListOfOutSideCompanies catalogues_list={this.props.catalogues_list} catalog={this.catalog} /> : null}
          </PopupModal> : null}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCatalogueslist: bindActionCreators(fetchCatalogueslist, dispatch),
    logout: bindActionCreators(logout, dispatch),
    fetchCategories: bindActionCreators(fetchCategories, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
    getCartData: bindActionCreators(getCartData, dispatch),
    getProductListSearch: bindActionCreators(getProductListSearch, dispatch),
    updateCart: bindActionCreators(updateCart, dispatch),
    clearStateSearch: bindActionCreators(clearStateSearch, dispatch),
    validatePostcode: bindActionCreators(validatePostcode, dispatch),
    timeSlot: bindActionCreators(timeSlot, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    catalogues_list: state.common.catalogues_list,
    authenticated: state.auth.authenticated,
    isupdated: state.product.isupdated,
    categoriesList: state.common.categories,
    cartAndWishlistCount: state.product.cartcount,
    cartdata: state.product.cartdata,
    productsListSearch: state.product.searchproducts,
    profile: state.auth.profile,
    zipcodes: state.product.zipcodes,
    timeslot: state.product.timeslot,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const CateImage = (props) => {
  const image_url = props.catimage;
  return (
    <div className="news-single">
      <div className="view overlay z-depth-1 text-center">
        <img src={image_url} alt="IMG-PRODUCT" />
      </div>
    </div>

  )
}
