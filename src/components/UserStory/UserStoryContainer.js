import React, { Component } from 'react';
import UserStoryCard from './UserStoryCard';
import { Droppable } from 'react-beautiful-dnd';

class UserStoryContainer extends Component {
  state = {  }
  
  render() { 
    return (
      <React.Fragment>
        <Droppable droppableId={this.props.columnProperties.id}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div id="board-container-title" className="text-center">
                <h5 className="display-4 text-black">{this.props.columnProperties.title}</h5>
                {this.props.columnProperties.showAddButton && (
                  <i className="fa fa-plus-square-o" style={{ fontSize: "30px", cursor: "pointer" }} aria-hidden="true"></i>
                )}
              </div>
              {this.props.columnProperties.userStories.map((userStory, index) => (
                <div>
                  <br />
                  <UserStoryCard key={userStory.id} userStory={userStory} index={index} />
                </div>
              ))}
            </div>
          )}
      </Droppable>
    </React.Fragment>  
    );
  }
}

export default UserStoryContainer;
