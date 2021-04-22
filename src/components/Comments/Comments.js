import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Comment from './Comment';
import Button from "react-bootstrap/Button";

class Comments extends Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <Form.Label className="form-control-label row">{'Comments'} 
          <div className="px-2">
           <Button onClick={() => this.props.onAddComment()}><i className="fa fa-plus-square-o" aria-hidden="true"></i></Button>
          </div>
        </Form.Label>

        <div className="comments-field row">
          {this.props.comments.map(comment => (
            <Comment comment={comment}></Comment>
          ))}
          {this.props.comments.length === 0 && <div>No comments</div>}
        </div>
      </React.Fragment>
     );
  }
}
 
export default Comments;