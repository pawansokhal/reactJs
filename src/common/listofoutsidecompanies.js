import React from 'react';
import { Link } from 'react-router';
import Logo from '../containers/images/logo.png';
import LogoTesco from '../containers/images/tesco.png';
/*eslint-disable no-script-url*/
class RecentlyViewedProducts extends React.Component {

  render() {

       let catalogues_list=[]
    if (this.props.catalogues_list.hasOwnProperty('data')) {
      catalogues_list = this.props.catalogues_list.data
    }

    return (
      <React.Fragment>
        <div className="SupplierSelector">
          {/* <div className="text-center">
            <img className="logo" src={Logo} alt style={{ marginBottom: 36 }} />
          </div> */}
          <h2 className="text-center SupplierSelectorTitle">Select a store to start</h2>
        
          {catalogues_list.length > 0 ?
                                catalogues_list.map(function (catlogid, index) {
                                  return (
                                    <a href="javascript:void(0)" data-catlogname={catlogid.name} data-catlogid={catlogid.id} onClick={this.props.catalog} key={index}>
                                    <div className="Supplier available">
                                      <div data-catlogid={catlogid.id} data-catlogname={catlogid.name}  className="SupplierImage bg-image-cover inline-block va-top">
                                        <img data-catlogname={catlogid.name} src={catlogid.name ==='Tesco' ?LogoTesco: Logo} alt="tesco" />
                                      </div>
                                      <div className="SupplierInfo semi-bold inline-block va-top">
                                        <div className="SupplierName text-black fs-16 lh-20 lsp-02 ht-20">
                                           {/* <div className="inline-block va-top" data-catlogname={catlogid.name} data-catlogid={catlogid.id}>{catlogid.name}</div> */}
                                          {/*<div className="inline-block va-top green-background white fs-12 lh-18 lsp-01" style={{ display: 'none', marginLeft: 6, marginTop: 1, padding: '0px 6px', borderRadius: '9.5px' }}>NEW</div> */}
                                        </div>
                                        {/* <div className="SupplierNextSlot text-gray fs-13 lh-16 lsp-01">Next: Today, 9am-10am</div> */}
                                      </div>
                                      <div className="SupplierShopBtn bold green fs-13 lh-14 ht-14 lsp-03" data-catlogname={catlogid.name} data-catlogid={catlogid.id}>SHOP</div></div>
                                      </a>
                                  )
                                }.bind(this)) : null}
            
              
        </div>
      </React.Fragment >

    )
  }
}


export default (RecentlyViewedProducts);
