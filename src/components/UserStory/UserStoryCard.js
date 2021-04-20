import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";

import ConfirmButton from "../Dialogs/ConfirmButton";

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
                <Card.Title className="user-story-title-text">
                  {this.props.userStory.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted user-story-subtitle-text">
                  Assigned: {this.props.userStory.owner}
                </Card.Subtitle>
                <Card.Text className="user-story-desc-text">
                  {this.displayDescription(this.props.userStory.description)}
                </Card.Text>
                <a
                  className="btn btn-primary user-story-desc-text"
                  href={`/nests/${this.props.nestId}/stories/${this.props.userStory.id}`}
                  role="button"
                >
                  View
                </a>{" "}
                <ConfirmButton
                  label="Delete"
                  question="Confirm delete"
                  className="user-story-desc-text btn-danger"
                  onClick={this.deleteStory}
                />
              </Card.Body>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }

  /**
   * Trims the description if we are over the allotted 150 characters, otherwise just returns the description
   * as presently set.
   * @param {string} description
   * @returns
   */
  displayDescription(description) {
    return description.length > 150
      ? `${description.substr(0, this.DESCRIPTION_LENGTH).trim()}...`
      : description;
  }

  deleteStory = (event) => {
    API.graphql(
      graphqlOperation(mutations.deleteStory, {
        nestId: this.props.nestId,
        storyId: this.props.userStory.id,
      })
    ).then((value) => {
      // pass?
    });
  };
}

export default UserStoryCard;
