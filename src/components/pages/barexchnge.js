import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { fetchBarexchangeCategoriesList, fetchBarexchangeProducts, addFavouritesProducts, removeFavouritesProducts } from '../../actions/barexchange';
import { addToCart,fetchCartAndWihslistCount} from '../../actions/products';
import { objectToQueryString } from '../../common/common';
/*eslint-disable no-script-url*/
class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serverCall: true,
      subcate: [],
    }
    this.socket = new WebSocket('ws://18.218.135.118:8080');
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeItemInFavourite = this.removeItemInFavourite.bind(this);
    this.addItemInFavourite = this.addItemInFavourite.bind(this);
    this.addItemInCart = this.addItemInCart.bind(this);
  }
  addItemInCart(event) {
    event.preventDefault();
    const id = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const priceRefId = event.target.dataset.price_ref_id ? event.target.dataset.price_ref_id : findDOMNode(event.target).parentNode.dataset.price_ref_id;
    this.setState({ id: id });
    const formData = {      
      item_type: "product",
      item_id: id,
      price_ref_id: priceRefId,
      price_type:"barexchange",
      quantity: 1
    }
    this.props.fetchCartAndWihslistCount(objectToQueryString(formData))
    this.props.addToCart(objectToQueryString(formData))
    return true
  }
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const subcate = event.target.dataset.subcate ? event.target.dataset.subcate : findDOMNode(event.target).parentNode.dataset.subcate;
    const catid = event.target.dataset.catid ? event.target.dataset.catid : findDOMNode(event.target).parentNode.dataset.catid;
    const type = event.target.dataset.type ? event.target.dataset.type : findDOMNode(event.target).parentNode.dataset.type;
    if (subcate) {
      this.setState({ subcate: JSON.parse(subcate).subcategories })
    }
    if (catid) {
      const formData = {
        category_id: catid,
      }
      if(type === 'parent') {
        this.setState({ classParent: catid, type: type, classChild:'' })
      } else {
        this.setState({ classChild: catid, type: type })
      }
      
      this.props.fetchBarexchangeProducts(objectToQueryString(formData))
      
    }
    if(name === "search") {
      const formData = {
        keyword: value
      }
      this.props.fetchBarexchangeProducts(objectToQueryString(formData))

    }
    this.setState({ [name]: value })
  }

  componentWillMount() {
    this.props.fetchBarexchangeCategoriesList();
    this.props.fetchBarexchangeProducts()
  }
  componentWillReceiveProps(nextProps) {
    if(!this.state.disabled) {
      if (!Array.isArray(nextProps.barexchangescategories) && this.state.serverCall) {
        this.setState({ 
            barexchangescategories: nextProps.barexchangescategories ?  nextProps.barexchangescategories : [],
           subcate: nextProps.barexchangescategories.data.length > 0 ? nextProps.barexchangescategories.data[0].subcategories : [] 
          })
         this.setState({ 
           classParent: nextProps.barexchangescategories.data.length > 0 ? nextProps.barexchangescategories.data[0]  !== null ? nextProps.barexchangescategories.data[0].id : [] : [], 
           classChild: nextProps.barexchangescategories.data.length > 0 ? nextProps.barexchangescategories.data[0].subcategories.length > 0  ? nextProps.barexchangescategories.data[0].subcategories[0].id : [] : [], 
           serverCall:false 
          })
      }
    }
    let productsList = []
    if (nextProps.barexchangesproducts) {
      if (nextProps.barexchangesproducts.hasOwnProperty('data')) {
        productsList = nextProps.barexchangesproducts.data
      }
      this.setState({ productsList: productsList })
    }
  }
 

  addItemInFavourite(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      product_id: itemID
    }
   
    this.props.addFavouritesProducts(objectToQueryString(formData))
    .then((response) =>{
      this.state.productsList.filter((item, index) =>{
          if(item.product_id === itemID){
              const newState = this.state.productsList;
              newState[index].favourite = "Y";
              this.setState({
                productsList: newState
              })
          }
          return false;
      })
    });
  }

  removeItemInFavourite(event) {
    event.preventDefault();
    const itemID = event.target.dataset.id ? event.target.dataset.id : findDOMNode(event.target).parentNode.dataset.id;
    const formData = {
      product_id: itemID
    }
    this.props.removeFavouritesProducts(objectToQueryString(formData)).then((response) =>{
      this.state.productsList.filter((item, index) =>{
          if(item.product_id === itemID){
              const newState = this.state.productsList;
              newState[index].favourite = "N";
              this.setState({
                productsList: newState
              })
          }
          return false;
      })
    });
  }

  componentDidMount(prevProps, prevState) {
    // Create WebSocket connection.
   
    // Connection opened
    this.socket.addEventListener('open', function (event) {
      // this.socket.send('Hello Server!');
    });
    // Listen for messages
    this.socket.onmessage = function (evt) {
      let temp = this.state.productsList
      var received_msg = evt.data;
      let status = ''
      if(temp) {
      temp.map((item, index) => {
        if (parseFloat(JSON.parse(received_msg).product_id, 10) === parseFloat(item.product_id, 10)) {
           status = parseFloat(JSON.parse(received_msg).new_price) > parseFloat(item.latest_price.new_price, 10) ? true : false
          Object.assign(temp[index].latest_price, { new_price: parseFloat(JSON.parse(received_msg).new_price, 10), price_ref_id: parseFloat(JSON.parse(received_msg).price_ref_id, 10) })
          Object.assign(temp[index], {  status: status })
        }
        return status;
      })
      this.setState({ productsList: temp })
    }
     
    }.bind(this)
  
  }

   
  componentWillUnmount() {
     this.socket.close()
  }

  render() {
    let cateList = [];
    let productsList = [];
    if (this.state.barexchangescategories) {
      if (this.state.barexchangescategories.hasOwnProperty('data')) {
        cateList = this.state.barexchangescategories.data
      }

    }
    let subcate = this.state.subcate
    productsList = this.state.productsList
    return (
      <div className="container p-t-110">
        <div className="m-b-40 all-product-list">
          <ul className="nav nav-tabs first-image-tabs text-center" id="pills-tab" role="tablist">
            {cateList.map((item, index) => {
              return (
                <li className="nav-item" key={Math.random()} data-catid={item.id} onClick={this.handleInputChange} data-type="parent" data-subcate={JSON.stringify(item)}>
                  <a className={this.state.classParent === item.id ?  "nav-link active" :  "nav-link"} id="pills-beer-tab"  data-type="parent" data-catid={item.id} data-subcate={JSON.stringify(item)} data-toggle="pill" href="#pills-beer" role="tab" aria-controls="pills-beer" aria-selected="true">
                    <span className="product-tab-img" data-catid={item.id} data-subcate={JSON.stringify(item)}><img data-type="parent" src={item.thumbnail_image_url}  data-catid={item.id} alt={item.name} data-subcate={JSON.stringify(item)} /></span>
                    {item.name}</a>
                </li>)
            })}

          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-beer" role="tabpanel" aria-labelledby="pills-beer-tab">
              <div className="inner-tab-container p-l-15 p-r-15 p-b-20">
                {/* Tab01 */}
                {subcate.length > 0 ?  
                <div className="tab01 p-b-25 p-t-25">
                  {/* Nav tabs */}

                  <ul className="second-tabs">
                    {subcate.map((item) => {
                      return (
                        <li className="tab-item p-b-10" key={Math.random()}>
                           {/* <a className={this.state.classParent === item.id ?  "nav-link active" :  "nav-link"} id="pills-beer-tab"  data-type="parent" data-catid={item.id} data-subcate={JSON.stringify(item)} data-toggle="pill" href="#pills-beer" role="tab" aria-controls="pills-beer" aria-selected="true"></a> */}
                          <a href="javascript:void(0)" data-catid={item.id} onClick={this.handleInputChange} className= {this.state.classChild === item.id ?  "tab-link active" :  "tab-link"}>{item.name}</a>
                        </li>)
                    })}
                  </ul>
                </div>
                : null}
                <div className="bor8 dis-flex p-l-15 m-t-15 m-b-15 search-field-main">
                  <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search" />
                  </button>
                  <input className="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search" placeholder="Search..." onChange={this.handleInputChange}/>
                </div>
			   <div className="barexchangeTable">	
                <table className="table table-striped liquor-table1">
                  <thead>
                    <tr>
                      <th width={50} scope="col">&nbsp;</th>
                      <th scope="col">Name</th>
                      <th className="text-center" scope="col">Low</th>
                      <th className="text-center" scope="col">High</th>
                      <th width={110} className="text-center" scope="col">Price(£)</th>
                      <th width={60} scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>


                    {productsList ? productsList.map((item, index) => {
                      return (
                        <tr key={Math.random()}>
                          <td className="text-center cl0" ><i  className={item.favourite === "N" ? "fa fa-star-o" : "fa fa-star"}  data-id={item.product_id}  onClick={item.favourite === "N" ? this.addItemInFavourite:this.removeItemInFavourite}/></td>
                          <td className="cl0 name-td" ><h4 className="mobile-heading">Name</h4> <a href="javascript:void(0)" data-id={item.product_id}  > {item.name}</a></td>
                          <td className="text-green text-center"><h4 className="mobile-heading">Low</h4> {item.min_price}</td>
                          <td className="text-red text-center"><h4 className="mobile-heading">High</h4> {item.max_price}</td>
                          <td className={item.status ? "price-text red-bg text-center" : "price-text green-bg text-center"}>
						  <h4 className="mobile-heading">Price(£)</h4>
						  <button className={item.status ? "btn price-text green-bg text-center" : "btn price-text red-bg text-center"} onClick={this.addItemInCart}  data-id={item.product_id}  data-price_ref_id={item.latest_price.price_ref_id}>{ parseFloat(item.latest_price.new_price, 10)}</button><small>20 L-Points</small></td>
                          {item.status ?
                            <td className="text-center text-red"><i className="fa fa-angle-down" /></td>:
                            <td className="text-center text-green"><i className="fa fa-angle-up" /></td> 
                          }
                        </tr>
                      )
                    }) : null}
                  </tbody>
                </table>
			   </div>	
              </div>
            </div>
            <div className="tab-pane fade" id="pills-wine" role="tabpanel" aria-labelledby="pills-wine-tab">...</div>
            <div className="tab-pane fade" id="pills-vodka" role="tabpanel" aria-labelledby="pills-vodka-tab">...</div>
            <div className="tab-pane fade" id="pills-gin" role="tabpanel" aria-labelledby="pills-gin-tab">...</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: bindActionCreators(addToCart, dispatch),
    fetchBarexchangeCategoriesList: bindActionCreators(fetchBarexchangeCategoriesList, dispatch),
    fetchBarexchangeProducts: bindActionCreators(fetchBarexchangeProducts, dispatch),
    addFavouritesProducts: bindActionCreators(addFavouritesProducts, dispatch),
    removeFavouritesProducts: bindActionCreators(removeFavouritesProducts, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    isupdated: state.barexchanges.isupdated,
    added: state.product.isupdated,
    barexchangescategories: state.barexchanges.barexchangescategories,
    barexchangesproducts: state.barexchanges.barexchangesproducts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);