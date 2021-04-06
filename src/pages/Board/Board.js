import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserStoryContainer from "../../components/UserStory/UserStoryContainer";
import { NEST_MODEL } from "./BoardConstants";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  state = {
    nest: NEST_MODEL,
  };

  render() {
    return (
      <Container id="board-container" className="container-height">
        <Row>
          <DragDropContext onDragEnd={this.handleOnDragEnd}>
            {this.state.nest.map((column) => (
              <Col key={column.id}>
                <UserStoryContainer key={column.id} columnProperties={column} />
              </Col>
            ))}
          </DragDropContext>
        </Row>
      </Container>
    );
  }

  // Comment out for now to avoid warnings, will need to implement in future
  // constructor(props) {
  //   super(props);
  // }

  handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (
      this.movingStoryBetweenStatuses(
        result.source.droppableId,
        result.destination.droppableId
      )
    ) {
      this.changeStoryStatus(
        this.state.nest,
        result.source,
        result.destination
      );
    } else {
      this.reorderStories(this.state.nest, result.source, result.destination);
    }
  };

  movingStoryBetweenStatuses(sourceID, destinationID) {
    return sourceID !== destinationID;
  }

  reorderStories(list, source, destination) {
    const columnIndex = list.findIndex(
      (column) => column.id === source.droppableId
    );

    const tempNestData = this.state.nest.slice();
    const userStories = tempNestData[columnIndex].userStories;
    const [removed] = userStories.splice(source.index, 1);
    userStories.splice(destination.index, 0, removed);

    this.setState({
      nest: tempNestData,
    });
  }

  changeStoryStatus(list, source, destination) {
    const sourceColumnIndex = list.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = list.findIndex(
      (column) => column.id === destination.droppableId
    );

    const tempNestData = this.state.nest.slice();
    const sourceUserStories = tempNestData[sourceColumnIndex].userStories;
    const destinationUserStories =
      tempNestData[destinationColumnIndex].userStories;

    const [removed] = sourceUserStories.splice(source.index, 1);

    destinationUserStories.splice(destination.index, 0, removed);

    this.setState({
      nest: tempNestData,
    });
  }
}

export default Board;
