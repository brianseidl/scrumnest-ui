import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { PRIORITY, STATUS } from "./StoryConstants";
import Comments from "../../components/Comments/Comments";
import Attachments from "../../components/Attachment/Attachments";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import { showYesNoDialog } from "../../components/Dialogs/service/DialogService";

import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nestId: this.props.match.params.nestId,
      storyId: this.props.match.params.storyId,
      story: {
        title: "",
        status: "",
        comments: [],
        priority: "",
        effort: "",
        createdAt: "",
        description: "",
        attachments: [],
        owner: "",
        dateToBeCompleted: "",
      },
      enableAddComment: true,
      users: [],
    };
  }

  componentDidMount() {
    // get story info on page load
    API.graphql(
      graphqlOperation(queries.story, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
      })
    ).then((value) => {
      let story = value.data.story;

      if (value.data.story) {
        let dateToBeCompleted = "";

        dateToBeCompleted = this.parseDateToBeCompleted(
          value.data.story.dateToBeCompleted
        );
        story = { ...story, dateToBeCompleted: dateToBeCompleted };
      }

      this.setState({ story: story });
    });

    // Get Nest users on page load... is there a better way to implement this than just calling
    // for the entire nest?
    API.graphql(
      graphqlOperation(queries.nest, {
        nestId: this.state.nestId,
      })
    ).then((nest) => {
      this.setState({ users: nest.data.nest.users });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row h-100 align-items-center">
          <div className="col-lg-12">
            <h1 className="display-6 text-black text-center nest-title">
              User Story: {this.state.story.title}
            </h1>
          </div>
        </div>

        <Form>
          <div className="left-container">
            <div className="row align-items-center pt-4">
              <Form.Group controlId="status">
                <Form.Label className="form-control-label">Status:</Form.Label>
                <Form.Control
                  className="m-2"
                  as="select"
                  onChange={this.onChangeFieldState}
                  value={this.state.story.status}
                >
                  {STATUS.values.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="date-created">
                <Form.Label className="form-control-label">
                  Date Created:
                </Form.Label>
                <Form.Control
                  className="m-2"
                  type="input"
                  value={new Date(
                    this.state.story.createdAt
                  ).toLocaleDateString()}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </div>

            {/* To be implemented epic linked with field... for now just a placeholder */}
            <Form.Group
              className="row align-items-center"
              controlId="sprint-linked"
            >
              <Form.Label className="form-control-label">Sprint:</Form.Label>
              <Form.Control
                className="m-2"
                type="input"
                value={this.state.story.sprint}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="form-control-label row">
                Description:
              </Form.Label>
              <Form.Control
                className="description-field-width-height row"
                as="textarea"
                value={this.state.story.description}
                onChange={this.onChangeFieldState}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="attachments">
              <Attachments
                saveFile={this.saveFile.bind(this)}
                deleteFile={this.deleteFile.bind(this)}
                attachments={this.state.story.attachments}
              ></Attachments>
            </Form.Group>

            <Form.Group controlId="comments">
              <Comments
                onAddComment={this.handleAddComment}
                saveComment={this.saveComment}
                deleteComment={this.deleteComment}
                updateComment={this.updateComment}
                comments={this.state.story.comments}
              ></Comments>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="pt-4" controlId="priority">
              <Form.Label className="form-control-label row">
                Priority:
              </Form.Label>
              <Form.Control
                as="select"
                onChange={this.onChangeFieldState}
                value={this.state.story.priority}
              >
                {PRIORITY.values.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="owner">
              <Form.Label className="form-control-label row">
                Assignee:
              </Form.Label>
              <Form.Control
                as="select"
                onChange={this.onChangeFieldState}
                value={this.state.story.owner}
                className="assignee-field"
              >
                {this.state.users.map((user) => {
                  if (user) {
                    return (
                      <option key={`${user.username}-id`}>
                        {user.username}
                      </option>
                    );
                  }
                  return null;
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="effort">
              <Form.Label className="form-control-label row">
                Effort:
              </Form.Label>
              <Form.Control
                type="input"
                className="effort-field"
                onChange={this.onChangeFieldState}
                value={this.state.story.effort}
              ></Form.Control>
              <Form.Label>Days</Form.Label>
            </Form.Group>

            <Form.Group controlId="dateToBeCompleted">
              <Form.Label className="form-control-label row">
                To Be Completed By:
              </Form.Label>
              <Form.Control
                onChange={this.onChangeFieldState}
                type="date"
                value={this.state.story.dateToBeCompleted}
              ></Form.Control>
            </Form.Group>

            {/* This is just placeholder information until we get the gitHub hooks working... comment out for now. TO-DO */}
            {/* <Form.Group controlId="gitHub">
              <Form.Label className="form-control-label row">Code History:</Form.Label>
              <Form.Label className="row" type="input">{"1 Branch"}</Form.Label>
              <Form.Label className="row" type="input">{"3 Commits"}</Form.Label>
              <Form.Label className="row" type="input">{"1 Pull Request [Open]"}</Form.Label>
            </Form.Group> */}
          </div>

          <div className="center py-3">
            <Button
              variant="primary"
              className="mx-4 px-3"
              onClick={this.saveUserStory}
            >
              Finish
            </Button>
            <Button
              variant="secondary"
              className="mx-4 px-3"
              onClick={this.discardUserStory}
            >
              Discard
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }

  /**
   * Generically handles all changes for the form control values
   * @param event
   */
  onChangeFieldState = (event) => {
    const fieldName = event.target.id;
    const value = event.target.value;

    const updatedPropertyObj = {};
    updatedPropertyObj[fieldName] = value;

    this.setState({ story: { ...this.state.story, ...updatedPropertyObj } });
  };

  handleAddComment = (data) => {
    if (!this.state.enableAddComment) {
      alert(
        "You cannot add multiple comments at a time. Please either save or discard the current one."
      );
      return;
    }

    const comments = _.cloneDeep(this.state.story.comments);

    const newCommentObj = {
      username: this.props.baseProps.userInfo.username,
      content: "",
      createdAt: new Date(Date.now()).toLocaleString(),
      enabled: true,
    };

    comments.unshift(newCommentObj);

    this.setState({
      story: { ...this.state.story, comments: comments },
      enableAddComment: false,
    });
  };

  saveFile(fileID, name) {
    API.graphql(
      graphqlOperation(mutations.addStoryAttachment, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
        name: name,
        key: fileID,
      })
    ).then((value) => {
      this.setState({ story: value.data.addStoryAttachment });
      alert("File uploaded successfully.");
    });
  }

  deleteFile(fileID) {
    API.graphql(
      graphqlOperation(mutations.deleteStoryAttachment, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
        key: fileID,
      })
    ).then((value) => {
      this.setState({ story: value.data.deleteStoryAttachment });
      alert("File deleted successfully.");
    });
  }

  updateComment = (comment) => {
    const comments = _.cloneDeep(this.state.story.comments);
    comments[0] = comment;

    this.setState({ story: { ...this.state.story, comments: comments } });
  };

  saveComment = (comment) => {
    API.graphql(
      graphqlOperation(mutations.addComment, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
        comment: comment.content,
      })
    ).then((value) => {
      this.setState({ enableAddComment: true, story: value.data.addComment });
    });
  };

  deleteComment = (comment) => {
    const comments = _.cloneDeep(this.state.story.comments);
    comments.shift();
    this.setState({
      enableAddComment: true,
      story: { ...this.state.story, comments: comments },
    });
  };

  saveUserStory = () => {
    let updateStoryData = this.getUpdateStoryData();

    if (!this.state.enableAddComment) {
      updateStoryData["comment"] = this.state.story.comments[0].content;
    }

    API.graphql(graphqlOperation(mutations.updateStory, updateStoryData)).then(
      (value) => {
        alert("User story was saved.");
        this.props.history.goBack();
      },
      (onrejected) => {
        console.error("Error occurred while saving story: ", onrejected);
        alert(
          "An error has occurred while attempting to save a user story. Please try again."
        );
      }
    );

    // TO-DO add a nicer dialog to say form was submitted.
  };

  getUpdateStoryData() {
    const json = {
      nestId: this.state.nestId,
      storyId: this.state.storyId,
      status: this.state.story.status,
      description: this.state.story.description,
      priority: this.state.story.priority,
      effort: this.state.story.effort,
      owner: this.state.story.owner,
      dateToBeCompleted: this.state.story.dateToBeCompleted,
    };

    return json;
  }

  discardUserStory = () => {
    const message = "Are you sure you want to discard and lose any changes?";

    showYesNoDialog(message).then((response) => {
      if (response) {
        this.props.history.goBack();
      }
    });
  };

  parseDateToBeCompleted(dateToBeCompleted) {
    if (dateToBeCompleted) {
      const timeIndex = dateToBeCompleted.indexOf("T");
      return dateToBeCompleted.substr(0, timeIndex);
    }

    return dateToBeCompleted;
  }
}

export default Story;
