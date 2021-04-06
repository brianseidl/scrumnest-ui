import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Used for dialogs that require only radio buttons as selectable values
class OptionDialog extends Component {
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
        <Modal
          show={this.props.dialog.show}
          onHide={() => this.props.onClose()}
        >
          <Modal.Header>
            <Modal.Title>{this.props.dialog.title}</Modal.Title>
          </Modal.Header>
          <Form className="mb-1">
            {this.props.dialog.fields.map((field) => (
              <div
                key={`${field.id}-div`}
                className="custom-control custom-radio form-check"
              >
                <Form.Check
                  name="radio-control"
                  id={`${field.id}-radio`}
                  type={field.type}
                  label={field.label}
                  onChange={(element) =>
                    this.handleRadioSelected(field, element)
                  }
                ></Form.Check>
              </div>
            ))}
          </Form>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.props.onSubmit(this.state.selected)}
            >
              OK
            </Button>
            <Button variant="secondary" onClick={() => this.props.onClose()}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleRadioSelected = (field, element) => {
    this.setState({ selected: field.value });
  };
}

export default OptionDialog;
