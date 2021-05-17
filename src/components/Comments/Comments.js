import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Comment from "./Comment";
import { ulid } from "ulid";
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
              title="Add Comment"
              onClick={() => this.props.onAddComment()}
            ></i>
          </div>
        </Form.Label>

        <div id="comment-container" className="comments-field row">
          {this.props.comments.map((comment) => (
            <Comment
              key={ulid()}
              comment={comment}
              saveComment={this.props.saveComment}
              deleteComment={this.props.deleteComment}
              updateComment={this.props.updateComment}
            ></Comment>
          ))}
          {this.props.comments.length === 0 && <div>No comments</div>}
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;
