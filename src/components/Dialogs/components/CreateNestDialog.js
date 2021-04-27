import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BaseDialogComponent from "../BaseDialogComponent";

import * as mutations from "../../../graphql/mutations";

import { API, graphqlOperation } from "aws-amplify";

class CreateNestDialog extends BaseDialogComponent {
  state = {
    show: true,
    value: "",
  };

  wrapperDiv = null;

  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.wrapperRef}>
        <Modal show={this.state.show} onHide={() => this.handleClose(null)}>
          <Modal.Header>
            <Modal.Title>{this.props.dialog.title}</Modal.Title>
          </Modal.Header>

          <Form className="createDialogLabel">
            <Form.Group controlId="textForm.ControlInput">
              <Form.Label className="form-control-label row">
                Nest Name
              </Form.Label>
              {this.props.dialog.fields.map((field) => (
                <div key={`${field.id}-div`}>
                  <Form.Control
                    className="row full-width-field"
                    size="sm"
                    name="text-control"
                    id={`${field.id}-text`}
                    type={field.type}
                    onChange={(element) => this.handleInputChange(element)}
                  />
                </div>
              ))}
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Finish
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.handleClose({ createdNest: false })}
            >
              Discard
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleSubmit = () => {
    if (!this.state.value) {
      alert("Please enter in a name for your Nest.");
      return;
    }

    API.graphql(
      graphqlOperation(mutations.createNest, {
        name: this.state.value,
      })
    ).then((response) => {
      const returnData = {
        createdNest: true,
        nestId: response.data.createNest.nestId,
      };
      this.handleClose(returnData);
    });
  };

  handleInputChange(element) {
    this.setState({
      value: element.target.value,
    });
  }
}

export default CreateNestDialog;
