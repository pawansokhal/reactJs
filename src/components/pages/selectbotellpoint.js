import React from 'react';
import { currencySymbol } from '../../common/common';

/*eslint-disable no-script-url*/
class BotalSelect extends React.Component {

  render() {   
    let productsList = [];
    if (this.props.productsList.hasOwnProperty('data')) {
      productsList = this.props.productsList.data
    }
    let handleInputChange = this.props.handleInputChange
    let selectBotal = this.props.selectBotal
    
    return (
      <div className="row selectBottleModal">        
        <div className="container">
          <div className="bg0 p-t-30 p-b-30 p-lr-15-lg how-pos3-parent padding-sm-0">
            {/* <button className="how-pos3 hov3 trans-04">
              <img src="images/icons/icon-close.png" alt="CLOSE" />
            </button> */}
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="p-lr-20 p-t-5 padding-sm-0">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    Choose Your Bottle
                  </h4>
                  <form className="choose-bottle-form">
                    <div className="search">
                      <div className="form-group">
                        <input type="search" className="form-control" placeholder="Search" onChange={handleInputChange}/>
                        {/* <button className="btn btn-default"><i className="zmdi zmdi-search" /></button> */}
                      </div>
                    </div>
                    <ul>
                      
                      {productsList.map(function (product, index) {
                        return(
                        <li key={index} data-product_id={product.id} onClick={selectBotal}>
                        {/* <a href="javascript:void(0)" data-id={product.id} onClick={handleInputChange}> */}
                        <img src={product.thumbnail_image} alt="bottle" />
                        <div className="checkbox checkbox-info checkbox-circle" data-product_id={product.id} >
                          <input  type="checkbox" name="product_name" data-product_id={product.id} />
                          <label htmlFor="checkbox1">
                          {product.name},  {currencySymbol(product.sale_price_per_unit)}
                          </label>
                        </div>
                        {/* </a> */}
                      </li>
                        )
                      }) }
                        
                      
                    </ul> 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (BotalSelect);