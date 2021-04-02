import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Used for dialogs that require only radio buttons as selectable values
class CreateBoardDialog extends Component {
  state = {
    value: {
      route: "/board",
      textFieldValue: "",
    },
  };

  wrapperDiv = null;

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        <Modal
          show={this.props.dialog.show}
          onHide={() => this.props.onClose()}
        >
          <Modal.Header>
            <Modal.Title>{this.props.dialog.title}</Modal.Title>
          </Modal.Header>

          <Form className="createDialogLabel">
            <Form.Group controlId="textForm.ControlInput">
              <Form.Label>Project Title</Form.Label>
            </Form.Group>

            {this.props.dialog.fields.map((field) => (
              <div
                key={`${field.id}-div`}
                className="custom-control2 custom-text form-text"
              >
                <Form.Control
                  size="sm"
                  name="text-control"
                  id={`${field.id}-text`}
                  type={field.type}
                  onChange={(element) => this.handleInputChange(element)}
                />
              </div>
            ))}
          </Form>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.props.onSubmit(this.state.value)}
            >
              Finish
            </Button>
            <Button variant="primary" onClick={() => this.props.onClose()}>
              Discard
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleInputChange(element) {
    this.setState({
      value: { textFieldValue: element.target.value, route: "/board" },
    });
    console.warn(this.state);
  }
}

export default CreateBoardDialog;
