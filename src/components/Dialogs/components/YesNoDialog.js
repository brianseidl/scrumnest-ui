import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BaseDialogComponent from "../BaseDialogComponent";

// Used for dialogs that require only radio buttons as selectable values
class YesNoDialog extends BaseDialogComponent {
  state = {
    show: false,
  };

  wrapperDiv = null;

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        <Modal show={this.state.show} onHide={() => this.handleClose(false)}>
          <Modal.Header>
            <Modal.Title>{this.props.dialog.title}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleClose(true)}>
              Yes
            </Button>
            <Button variant="secondary" onClick={() => this.handleClose(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default YesNoDialog;
