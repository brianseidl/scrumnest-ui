import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Comment extends Component {
  state = {  }
  
  render() { 
    return ( 
      <React.Fragment>
        <div className="container">
          <Form.Label className="form-control-label row comment-label">
            By {this.props.comment.username} at {this.props.comment.createdAt} 
            {
              this.props.comment.enabled &&
                <div className="float-right">
                  <i className="fa fa-floppy-o px-2" aria-hidden="true"></i>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </div>
            }
          </Form.Label>
          <Form.Control className="row comment-field" as="textarea" disabled={this.props.comment.enabled ? false : true}></Form.Control>
        </div>
      </React.Fragment>
     );
  }
}
 
export default Comment;
