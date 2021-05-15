import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { trimTextFieldValue } from "../../Utilities/CommonUtils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Attachment extends Component {
  ATTACHMENT_NAME_LENGTH = 15;

  render() {
    return (
      <div className="py-1">
        <i
          className="fa fa-file fa-2x attachment-icon"
          aria-hidden="true"
          onClick={() => this.props.getFile(this.props.attachment)}
        ></i>
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{this.props.attachment.name}</Tooltip>}
          >
            <Form.Label className="pr-2">
              {trimTextFieldValue(
                this.props.attachment.name,
                this.ATTACHMENT_NAME_LENGTH
              )}
            </Form.Label>
          </OverlayTrigger>
          <i
            className="fa fa-trash-o selectable-item"
            aria-hidden="true"
            onClick={() => this.props.deleteAttachment(this.props.attachment)}
          ></i>
        </div>
      </div>
    );
  }
}

export default Attachment;
