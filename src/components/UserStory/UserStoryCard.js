import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Draggable } from "react-beautiful-dnd";

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
                  Assigned: {this.props.userStory.assignee}
                </Card.Subtitle>
                <Card.Text className="user-story-desc-text">
                  {this.displayDescription(this.props.userStory.description)}
                </Card.Text>
                <Button className="user-story-desc-text" variant="primary">
                  View
                </Button>{" "}
                <Button className="user-story-desc-text" variant="danger">
                  Delete
                </Button>
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
}

export default UserStoryCard;
