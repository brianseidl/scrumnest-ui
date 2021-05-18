import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { showYesNoDialog } from "../../components/Dialogs/service/DialogService";
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
            by {this.state.comment.username}
            {!this.state.comment.enabled && (
              <span>{` at ${new Date(
                this.state.comment.createdAt
              ).toLocaleString()}`}</span>
            )}
            {this.state.comment.enabled && (
              <div className="float-right">
                <i
                  className="fa fa-floppy-o px-2 selectable-item"
                  aria-hidden="true"
                  title="Save"
                  onClick={() => this.props.saveComment(this.state.comment)}
                ></i>
                <i
                  className="fa fa-trash-o selectable-item"
                  aria-hidden="true"
                  title="Discard"
                  onClick={() => this.onDeleteComment(this.state.comment)}
                ></i>
              </div>
            )}
          </Form.Label>
          <Form.Control
            className="row comment-field"
            as="textarea"
            onChange={this.textValueChange}
            onBlur={() => this.props.updateComment(this.state.comment)}
            value={this.state.comment.content}
            disabled={!this.state.comment.enabled}
          ></Form.Control>
        </div>
      </React.Fragment>
    );
  }

  onDeleteComment = (comment) => {
    showYesNoDialog(`Are you sure you want to delete this comment?`).then(
      (response) => {
        if (response) {
          this.props.deleteComment(comment);
        }
      }
    );
  };

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
