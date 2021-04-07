import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserStoryContainer from "../../components/UserStory/UserStoryContainer";
import { NEST_MODEL } from "./BoardConstants";
import { DragDropContext } from "react-beautiful-dnd";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

class Board extends Component {
  state = {
    nestName: "",
    nestId: "",
    nest: NEST_MODEL,
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">
          Welcome to the {this.state.nestName} Nest!
        </h1>
        <Container id="board-container" className="container-height">
          <Row>
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
              {this.state.nest.map((column) => (
                <Col key={column.id} className="board-column-properties">
                  <div id="board-container-title" className="text-center">
                    <h5 className="display-4 text-black">{column.title}</h5>
                    {column.showAddButton && (
                      <i
                        className="fa fa-plus-square-o"
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  <UserStoryContainer
                    key={column.id}
                    columnProperties={column}
                  />
                </Col>
              ))}
            </DragDropContext>
          </Row>
        </Container>
      </React.Fragment>
    );
  }

  constructor(props) {
    super(props);
    // Temporarily, we can only get nest data from the props.location property (signifying we routed to the board) may change in the future
    if (!!props.location) {
      this.state = {
        ...this.state,
        nestId: props.location.state.nestId,
        nestName: props.location.state.name,
      };
    }
  }

  componentDidMount() {
    this.getNestData();
  }

  getNestData() {
    API.graphql(
      graphqlOperation(queries.nest, { nestId: this.state.nestId })
    ).then((value) => {
      // console.log('NEST DATA IS: ', value);
      // TO-DO: Logic in here to set the neccessary state for the nest
    });
  }

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
