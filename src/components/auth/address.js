import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
import { bindActionCreators } from 'redux';
import { getAddress,addAddress, deleteAddress } from '../../actions/auth';
import { objectToQueryString } from '../../common/common';
import PopupModal from '../common/popupModal';
import Popup from '../common/popup';
/*eslint-disable no-script-url*/
class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            deletemodel: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.deleteAddr = this.deleteAddr.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    hideModal() {
        this.setState({ model: false })
      }
      showModal(event) {
        const id = event.target.dataset.addressid !== undefined ? event.target.dataset.addressid : findDOMNode(event.target).parentNode.dataset.addressid;
        if(id) {
            Object.assign(this.state, {deletemodel: true,id: id})
            this.setState({
                deletemodel: true,
                id: id
              });
        } else {
            this.setState({
                model: true,
              });
        }
        
      }
    componentWillMount() {

        this.props.getAddress()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isupdated) {
            this.hideModal()
            this.setState({
                model: false,
                deletemodel: false
              });
            
            this.props.getAddress()
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            cust_id: localStorage.getItem('cust_id'),
            session_key: localStorage.getItem('session_key'),
            floor_number: this.state.floor_number,
            door_number: this.state.door_number,
            postcode: this.state.postcode,
            landmark: this.state.landmark,
            
        }
        this.props.addAddress(objectToQueryString(formData))
    }

    deleteAddr(id,  event) {
        const formData = {
              record_id: id
            }
        this.props.deleteAddress(objectToQueryString(formData))
    }
    

    render() {

        let address = [];
        if(this.props.address.hasOwnProperty('data')) {
            address = this.props.address.data
        }
    
        return (
            <div>
                <div className="container p-t-110">
                    <div className="bread-crumb flex-w p-l-0 p-r-15 p-t-30 p-lr-0-lg">
                        <a href="/" className="stext-109 cl8 hov-cl1 trans-04">
                            Home
                            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
                        </a>
                        <span className="stext-109 cl4">
                            My Address
                        </span>
                    </div>
                </div>
                {/* Product Detail */}
                <section className="sec-product-detail bg10 p-t-65 p-b-60">
                    <div className="container">
                        <div className="shipping-address">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mt-4">Addresses</h4>
                                </div>
                                <div className="col-md-6">
                                        <button type="button" onClick={this.showModal} className="stext-106 cl6 size-104 bor4 pointer hov-btn1 trans-04 p-lr-10 pull-right js-show-modal1"><i className="zmdi zmdi-plus" /> Add New Address</button>
                                </div>
                            </div>
                            {
                                address.length ?
                                    address.map(function (addr, index) {
                                        return (
                                            <div className= {index % 2 === 0 ? "address-detail m-t-20 p-lr-15 background_highlight" : "address-detail m-t-20 p-lr-15" } key={index}>
                                                <div className="row">
                                                    <div className="col-md-3 text-center py-4">
                                                        <i className="zmdi zmdi-pin" />
                                                    </div>
                                                    <div className="col-md-8 py-4">
                                                        <p className="px-3"># {addr.door_number} ,{addr.floor_number}<br />{addr.landmark} Chandigarh, Chandigarh , {addr.postcode}, UK</p>
                                                    </div>
                                                    <div className="col-md-1 py-4 text-right edit-box">
                                                       {this.state.deletemodel? 
                                                        <Popup text={'Are you sure you want to delete ?'} size="small" cancelButton={true} cancelButtonClass={''}  cbHideModal={this.hideModal} onlyText={<a href="javascript:void(0)"  onClick={this.showModal} data-delete="address"  className="btn btn-danger btn-block" data-addressid={addr.id}><i  onClick={this.showModal} data-addressid={addr.id} className="zmdi zmdi-delete" /></a>} >
                                                        <button type="button" className="btn btn-default btn-danger pull-right" onClick={this.deleteAddr.bind(this, addr.id)}>Delete</button>
                                                        </Popup>
                                                        : <a href="javascript:void(0)"  onClick={this.showModal} data-delete="address"  className="btn btn-danger btn-block" data-addressid={addr.id}><i  onClick={this.showModal} data-addressid={addr.id} className="zmdi zmdi-delete" /></a>}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }.bind(this)) : null
                            }
                        </div>
                    </div>
                </section>
                {this.state.model ?
            <PopupModal size="lg" title={this.state.popname} cbHideModal={this.hideModal} >
            <div className="container">
              <div className="bg0 p-t-30 p-b-10 p-lr-25 p-lr-15-lg how-pos3-parent">

                <div className="row">
                  <div className="col-md-12 add-address-border">
                    <div className="row">
                      <div className="col-md-12 address-box">
                        <div className="add-box pull-left">
                          <h4 className="m-b-20">Add Address</h4>
                        </div>
                      </div>
                    </div>
                    <form method="post" className="form-horizontal address-modal-popup" onSubmit={this.handleSubmit}>
                      <fieldset>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6 login-input">
							 <div className="field-input-full">
                              <input type="text" id="address1" className="input1 bg-none plh1 form-control input-md" name="floor_number" placeholder="Floor Number" onChange={this.handleInputChange} value={this.props.floor_number} />
                              <div className="focus-input1 trans-06"></div>
							 </div>  
                            </div>
                            <div className="col-md-6 login-input">
							 <div className="field-input-full">
                              <input type="text" id="address2" className="input1 bg-none plh1 form-control input-md" name="door_number" placeholder="Door Number" required onChange={this.handleInputChange} value={this.props.door_number} />
                              <div className="focus-input1 trans-06"></div>
							 </div> 
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-6 login-input">
							 <div className="field-input-full">
                              <input type="text" id="city" className="input1 bg-none plh1 form-control input-md" pattern="^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$" title="Please enter correct post code"  name="postcode" placeholder="Post Code" required onChange={this.handleInputChange} value={this.props.postcode} />
                              <div className="focus-input1 trans-06"></div>
							 </div> 
                              <small className="p-t-8">Format:PO1 3AX</small>
                            </div>
                            <div className="col-md-6 login-input">
							 <div className="field-input-full">
                              <input type="text" id="state" className="input1 bg-none plh1 form-control input-md" name="landmark" placeholder="Landmark" onChange={this.handleInputChange} value={this.props.landmark} />
                              <div className="focus-input1 trans-06"></div>
							 </div> 
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-sm-12 login-input">
                              <button id="submit" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" name="submit" type="submit">Save Address</button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </PopupModal> : null}
            
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        address: state.auth.address,
        isupdated: state.auth.isupdated,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAddress: bindActionCreators(getAddress, dispatch),
        addAddress: bindActionCreators(addAddress, dispatch),
        deleteAddress: bindActionCreators(deleteAddress, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
