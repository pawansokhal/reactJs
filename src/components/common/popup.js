import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
class ModalPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState(() => ({ showModal: false }));
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="modalP">
        {this.props.onlyText ? <div onClick={this.open}>{this.props.onlyText}</div> : (
          <Button
            bsStyle="primary"
            bsSize={"small"}
            onClick={this.props.show}
          >
            {this.props.text}
          </Button>)}

        <Modal id="modelpop" show={this.state.showModal} bsSize={this.props.size ? this.props.size : null} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.cancelButton ? <Button className={this.props.cancelButtonClass} onClick={this.close}>Cancel</Button> : ''}
            {this.props.children}
          </Modal.Body>
          {this.props.hide ? ('') :
            <Modal.Footer>
              {/*  <Button onClick={this.close}>Close</Button> */}
            </Modal.Footer>
          }
        </Modal>
      </div>
    )
  }
}
export default ModalPopup;