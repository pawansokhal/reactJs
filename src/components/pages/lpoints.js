import React from 'react';
import $ from "jquery";
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { getLpoint, selectLpointProduct } from '../../actions/pages';
import { getProductList } from '../../actions/products';
import { objectToQueryString, ucfirst, currencySymbol } from '../../common/common';
import Selectbotellpoint from './selectbotellpoint';
import Moment from 'moment';
import PopupModal from '../common/popupModal';
/*eslint-disable no-script-url*/
class Lpoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: false
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectBotal = this.selectBotal.bind(this);
  }
  
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(name=== "product_name") {
      this.setState({ product_id:value })  
    }
    const formData = {
      item_type: "product",
      page_number: 1,
      number_of_records_needed: 10,
      search_keyword: value,
    }
    this.props.getProductList(objectToQueryString(formData))
    this.setState({ [name]:value })
  }
  selectBotal(event) {
    event.preventDefault();
    const id = event.target.dataset.product_id !== undefined ? event.target.dataset.product_id : findDOMNode(event.target).parentNode.dataset.product_id;
    this.setState({ product_id:id, model:false  })
    const formData = {
      item_type: "product",
      product_id: id
    }
    this.props.selectLpointProduct(objectToQueryString(formData))
  }

hideModal() {
  this.setState({ model:false })
}
  componentWillMount() {
    this.props.getLpoint()
  }
 
  showModal(e){    
    this.setState({
      model: true
    });
    const formData = {
      item_type: "product",
      page_number: 1,
      number_of_records_needed: 10,
      search_keyword: this.state.search_keyword,
    }
    this.props.getProductList(objectToQueryString(formData))
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isupdated) {
   
      $("html, body").animate({ scrollTop: 0 }, 1000);
      this.props.getLpoint()
    }
  }

  render() {
    let points = [];
    if (this.props.lpoints.hasOwnProperty('data')) {
      points = this.props.lpoints.data
    }
    return (
      <div>
      <div className="container p-t-110">
        <div className="bread-crumb flex-w p-r-15 p-t-30 p-lr-0-lg">
          <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">
            L-Points
          </span>
        </div>
      </div>
      <div className="container">
        <div className="m-b-40 l-point-table">
          <div className="l-points-head m-t-35 m-b-35">
          {points.favourite_product ===  undefined ? 
            <div className="row">
              <div className="col-md-6 l-points-col-left"><a href="javascript:void(0)" onClick={this.showModal} className="trans-04 js-show-modal6"><small>Choose Your</small> Bottle</a></div>
              <div className="col-md-6 l-points-col-right text-center"><p>{points.loyalty_points} <small> Worth {currencySymbol(points.loyalty_points_worth_money)}</small></p></div>
            </div> :
            <div className="row">
          <div className="col-md-6 l-points-left">
            <a href="javascript:void(0)" onClick={this.showModal}>Change</a>
            <div className="bottle-box">
              <img src="../images/bottle.png" alt="bottle" />
              
              <div className="progress vertical">
              {points.favourite_product ?
                <div data-percentage="3%" style={{width: (parseFloat(points.loyalty_points_worth_money) / parseFloat(points.favourite_product.sale_price_per_unit, 10) * 100 ) + '%'}} className="progress-bar progress-bar-success" role="progressbar"  min={0} aria-valuemax={10} />
                : null}
              </div>
            </div>
			          <div className="title-text m-t-10 text-center"><h4>{points.favourite_product?points.favourite_product.name : null} {currencySymbol(points.favourite_product?points.favourite_product.sale_price_per_unit : null)}</h4></div>
          </div>
          <div className="col-md-6 l-points-col-right text-center"><p>{points.loyalty_points} <small> Worth {currencySymbol(points.loyalty_points_worth_money)}</small></p></div>
        </div>}
          </div>
          <div className="l-points-history">
          {/* <div className="title-text m-t-10"><h4>{points.favourite_product?points.favourite_product.name : null} {currencySymbol(points.favourite_product?points.favourite_product.sale_price_per_unit : null)}</h4></div> */}
            <div className="title-text m-t-10"><h3>Transaction History</h3></div>
            <ul>
            {!Array.isArray(points) ? 
              points.loyalty_points_history.map(function(item, index) {
                return(
                  <li key={index}>
                  <div className="row">
                    <div className="col-md-7 history-left">
                      <small>Points {ucfirst(item.action)}</small>
                      <p>{Moment(item.recorded_at).format('YYYY-MM-DD')} <span> {Moment(item.recorded_at).format('HH:mm A')}</span></p>
                    </div>
                    <div className="col-md-5 history-right text-right"><span className= {item.action === "added" ? "text-green": "text-red"} >{item.action === "added" ? "+" : "-" } {item.loyalty_points}</span></div>
                  </div>
                </li>
                )
               })
              : null
              }
            </ul>
          </div>		
        </div>
      </div>

       {this.state.model && this.props.productsList ?
          <PopupModal title={this.state.popname} size="lg" cbHideModal={this.hideModal} >
            <Selectbotellpoint productsList={this.props.productsList} handleInputChange={this.handleInputChange} selectBotal={this.selectBotal}/>
          </PopupModal> : null}
      
    </div>    

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLpoint: bindActionCreators(getLpoint, dispatch),
    getProductList: bindActionCreators(getProductList, dispatch),
    selectLpointProduct: bindActionCreators(selectLpointProduct, dispatch), 
  }
}
function mapStateToProps(state) {
  return {
    lpoints: state.pages.lpoints,
    isupdated: state.pages.isupdated,
    productsList: state.product.products,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lpoint);