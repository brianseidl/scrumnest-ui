import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Attachment extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="py-1">
        <i className="fa fa-file fa-2x attachment-icon" aria-hidden="true" onClick={() => this.props.getFile(this.props.attachment)}></i>
        <Form.Label className='row'>{this.props.attachment.name}</Form.Label>
      </div>
     );
  }
}
 
export default Attachment;
