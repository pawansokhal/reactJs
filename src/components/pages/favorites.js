import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { listFavouritesProducts, removeFavouritesProducts } from '../../actions/barexchange';
import { addToCart,fetchCartAndWihslistCount} from '../../actions/products';
import { objectToQueryString } from '../../common/common';
/*eslint-disable no-script-url*/
class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
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
    if (subcate) {
      this.setState({ subcate: JSON.parse(subcate).subcategories })
    }
    if (catid) {
      const formData = {
        cat_id: catid
      }
      this.props.addFavouritesProducts(objectToQueryString(formData))
      
    }
    this.setState({ [name]: value })
  }
  componentWillReceiveProps(nextProps) {
    let productsList = []
    if (nextProps.barexchangesfavourate) {
      if (nextProps.barexchangesfavourate.hasOwnProperty('data')) {
        productsList = nextProps.barexchangesfavourate.data
      }
      this.setState({ productsList: productsList })
    }
    if (nextProps.isupdated) {
      this.props.listFavouritesProducts()
    }
  }
  componentWillMount() {
    this.props.listFavouritesProducts()
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
    let productsList = [];
    productsList = this.state.productsList
    return (
      <div className="container p-t-110">
        <div className="m-b-40 all-product-list">
        
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-beer" role="tabpanel" aria-labelledby="pills-beer-tab">
              <div className="inner-tab-container p-l-15 p-r-15 p-b-20">
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
                          <td className="cl0" ><a href="javascript:void(0)" data-id={item.product_id} > {item.name}</a></td>
                          <td className="text-green text-center">{item.min_price}</td>
                          <td className="text-red text-center">{item.max_price}</td>
                          <td className={item.status ? "price-text red-bg text-center" : "price-text green-bg text-center"}><button className={item.status ? "btn price-text green-bg text-center" : "btn price-text red-bg text-center"} onClick={this.addItemInCart}  data-id={item.product_id}  data-price_ref_id={item.latest_price.price_ref_id}>{ parseFloat(item.latest_price.new_price, 10)}</button><small>20 L-Points</small></td>
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
    listFavouritesProducts: bindActionCreators(listFavouritesProducts, dispatch),
    removeFavouritesProducts: bindActionCreators(removeFavouritesProducts, dispatch),
    fetchCartAndWihslistCount: bindActionCreators(fetchCartAndWihslistCount, dispatch),
  }
}
function mapStateToProps(state) {
  return {
    barexchangesfavourate: state.barexchanges.barexchangesfavourate,
    isupdated: state.barexchanges.isupdated,
    added: state.product.isupdated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);