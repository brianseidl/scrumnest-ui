import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import { trimTextFieldValue } from "../../Utilities/CommonUtils";

import { showYesNoDialog } from "../../components/Dialogs/service/DialogService";

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

class UserStoryCard extends Component {
  state = {};

  DESCRIPTION_LENGTH = 150;

  render() {
    return (
      <Draggable
        key={this.props.userStory.id}
        draggableId={this.props.userStory.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card>
              <Card.Body>
                <Card.Title id='card-title' className="user-story-title-text">
                  {this.props.userStory.title}
                </Card.Title>
                <Card.Subtitle id='card-assignee' className="mb-2 text-muted user-story-subtitle-text">
                  {`Assigned: ${this.props.userStory.owner}`}
                </Card.Subtitle>
                <Card.Text id='card-description' className="user-story-desc-text">
                  {trimTextFieldValue(
                    this.props.userStory.description,
                    this.DESCRIPTION_LENGTH
                  )}
                </Card.Text>
                <a
                  className="btn btn-primary user-story-desc-text"
                  id='view-btn'
                  href={`/nests/${this.props.nestId}/stories/${this.props.userStory.id}`}
                  role="button"
                >
                  View
                </a>{" "}
                <Button
                  id='delete-story-btn'
                  className="user-story-desc-text"
                  variant="danger"
                  onClick={this.deleteStory}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }

  deleteStory = (event) => {
    const message = `Are you sure you want to delete ${this.props.userStory.title}?`;

    showYesNoDialog(message).then((continueDeletion) => {
      if (continueDeletion) {
        API.graphql(
          graphqlOperation(mutations.deleteStory, {
            nestId: this.props.nestId,
            storyId: this.props.userStory.id,
          })
        ).then((value) => {
          // pass?
        });
      }
    });
  };
}

export default UserStoryCard;
