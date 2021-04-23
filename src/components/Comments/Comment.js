import React, { Component } from "react";
import { Form } from "react-bootstrap";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Form.Label className="form-control-label row comment-label">
            By {this.state.comment.username} at{" "}
            {new Date(this.state.comment.createdAt).toLocaleString()}
            {this.state.comment.enabled && (
              <div className="float-right">
                <i
                  className="fa fa-floppy-o px-2 selectable-item"
                  aria-hidden="true"
                  onClick={() => this.props.saveComment(this.state.comment)}
                ></i>
                <i
                  className="fa fa-trash-o selectable-item"
                  aria-hidden="true"
                  onClick={() => this.props.deleteComment(this.state.comment)}
                ></i>
              </div>
            )}
          </Form.Label>
          <Form.Control
            className="row comment-field"
            as="textarea"
            onChange={this.textValueChange}
            value={this.state.comment.content}
            disabled={this.state.comment.enabled ? false : true}
          ></Form.Control>
        </div>
      </React.Fragment>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comment !== this.props.comment) {
      this.setState({ comment: this.props.comment });
    }
  }

  textValueChange = (event) => {
    this.setState({
      comment: { ...this.state.comment, content: event.target.value },
    });
  };
}

export default Comment;
