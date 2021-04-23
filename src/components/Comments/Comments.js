import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Comment from "./Comment";

class Comments extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Form.Label className="form-control-label row">
          {"Comments"}
          <div className="px-2">
            <i
              className="fa fa-plus-square-o selectable-item"
              aria-hidden="true"
              onClick={() => this.props.onAddComment()}
            ></i>
          </div>
        </Form.Label>

        <div className="comments-field row">
          {this.props.comments.map((comment) => (
            <Comment
              comment={comment}
              saveComment={this.props.saveComment}
              deleteComment={this.props.deleteComment}
            ></Comment>
          ))}
          {this.props.comments.length === 0 && <div>No comments</div>}
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;
