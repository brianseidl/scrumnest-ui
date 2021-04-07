import React, { Component } from "react";
import UserStoryCard from "./UserStoryCard";
import { Droppable } from "react-beautiful-dnd";

class UserStoryContainer extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Droppable droppableId={this.props.columnProperties.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              id="user-story-container"
              ref={provided.innerRef}
            >
              {this.props.columnProperties.userStories.map(
                (userStory, index) => (
                  <div key={userStory.id}>
                    <br />
                    <UserStoryCard userStory={userStory} index={index} />
                  </div>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </React.Fragment>
    );
  }
}

export default UserStoryContainer;
