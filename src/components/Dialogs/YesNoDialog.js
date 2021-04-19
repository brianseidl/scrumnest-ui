import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Used for dialogs that require only radio buttons as selectable values
class YesNoDialog extends Component {
  state = {
    selected: {},
  };

  wrapperDiv = null;

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        <Modal show={true} onHide={() => this.props.onClose()}>
          <Modal.Header>
            <Modal.Title>{this.props.dialog.title}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.onClose(true)}>
              Yes
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.props.onClose(false)}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default YesNoDialog;
