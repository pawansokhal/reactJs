import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
class ModalPopup extends Component {
  constructor(props) {
    super(props)
    this.state = { showModal: true };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {  
    return (
      <Modal show={this.state.showModal} className="modal-full" bsSize= {this.props.size? this.props.size : null} onHide={this.props.cbHideModal} >
            <Modal.Header closeButton >
            
            </Modal.Header>
          <Modal.Body>
          {this.props.cancelButton ?  <Modal.Title>{this.props.title}</Modal.Title> : null}
          {this.props.cancelButton ? <Button onClick={this.close}>Cancel</Button> : ''}
            {this.props.children}
            
          </Modal.Body>
        </Modal>
    )
  }
}


export default ModalPopup;