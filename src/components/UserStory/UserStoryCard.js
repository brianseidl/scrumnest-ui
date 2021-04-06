import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Draggable } from 'react-beautiful-dnd';

class UserStoryCard extends Component {
  
  state = {  }
  
  render() { 
    return ( 
      <Draggable key={this.props.userStory.id} draggableId={this.props.userStory.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card>
              <Card.Body>
                <Card.Title>{this.props.userStory.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Assigned: {this.props.userStory.assignee}</Card.Subtitle>
                <Card.Text>{this.props.userStory.description}</Card.Text>
                <Button variant="primary">View</Button>{' '}
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}
 
export default UserStoryCard;
