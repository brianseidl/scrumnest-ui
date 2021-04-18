import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserStoryContainer from "../../components/UserStory/UserStoryContainer";
import { NEST_MODEL } from "./BoardConstants";
import { DragDropContext } from "react-beautiful-dnd";
import { API, graphqlOperation } from "aws-amplify";
// TODO: Remove all of this * crap
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

class Board extends Component {
  state = {
    nestName: "",
    nestId: "",
    nestData: NEST_MODEL,
    subscription: null,
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">
          Nest: {this.state.nestName}
        </h1>
        <Container id="board-container" className="container-height">
          <Row>
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
              {this.state.nestData.map((column) => (
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
    this.state = {
      ...this.state,
      nestId: this.props.match.params.nestId,
    };
  }

  componentDidMount() {
    // get nest info on page load
    API.graphql(
      graphqlOperation(queries.nest, { nestId: this.state.nestId })
    ).then((value) => {
      this.setNestState(value.data.nest);
    });

    // add subscription here
    this.subscription = API.graphql(
      graphqlOperation(subscriptions.subscribeToNestStatus, {
        nestId: this.state.nestId,
      })
    ).subscribe((value) => {
      this.setNestState(value.value.data.subscribeToNestStatus);
    });
  }

  componentWillUnmount() {
    // unsubscribe to subscription
    this.subscription.unsubscribe();
  }

  /**
   * This function is used to convert the GraphQL nest query response
   * to data that is able to be rendered by the page. Will also set the
   * state with the nest data.
   *
   * @param  nest      the nest object from GraphQL
   *
   * PostCondition: this.state is updated with lastest Nest information.
   */
  setNestState(nest) {
    let nestData = [
      {
        title: "To-Do",
        id: "TODO",
        showAddButton: true,
        userStories: [],
      },
      {
        title: "In Dev",
        id: "DEV",
        userStories: [],
      },
      {
        title: "QA",
        id: "QA",
        userStories: [],
      },
      {
        title: "Completed",
        id: "COMPLETED",
        userStories: [],
      },
    ];

    // Add the user stories
    nest.stories.forEach((story) => {
      let storyData = {
        id: story.storyId,
        title: story.title,
        owner: story.owner,
        description: story.description || "",
      };

      // add that story data to the correct col
      switch (story.status) {
        case "TODO":
          nestData[0].userStories.push(storyData);
          break;
        case "DEV":
          nestData[1].userStories.push(storyData);
          break;
        case "QA":
          nestData[2].userStories.push(storyData);
          break;
        case "COMPLETED":
          nestData[3].userStories.push(storyData);
          break;
      }
    });

    this.setState({
      nestData: nestData,
      nestName: nest.name,
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
        this.state.nestData,
        result.source,
        result.destination
      );
    } else {
      this.reorderStories(
        this.state.nestData,
        result.source,
        result.destination
      );
    }
  };

  movingStoryBetweenStatuses(sourceID, destinationID) {
    return sourceID !== destinationID;
  }

  reorderStories(list, source, destination) {
    const columnIndex = list.findIndex(
      (column) => column.id === source.droppableId
    );

    const tempNestData = this.state.nestData.slice();
    const userStories = tempNestData[columnIndex].userStories;
    const [removed] = userStories.splice(source.index, 1);
    userStories.splice(destination.index, 0, removed);

    this.setState({
      nestData: tempNestData,
    });
  }

  changeStoryStatus(list, source, destination) {
    const sourceColumnIndex = list.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = list.findIndex(
      (column) => column.id === destination.droppableId
    );

    const tempNestData = this.state.nestData.slice();
    const sourceUserStories = tempNestData[sourceColumnIndex].userStories;
    const destinationUserStories =
      tempNestData[destinationColumnIndex].userStories;

    const [removed] = sourceUserStories.splice(source.index, 1);

    destinationUserStories.splice(destination.index, 0, removed);

    this.setState({
      nestData: tempNestData,
    });

    // Mutation to send new state to API
    API.graphql(
      graphqlOperation(mutations.updateStoryStatus, {
        nestId: this.state.nestId,
        storyId: this.state.nestData[destinationColumnIndex].userStories[
          destination.index
        ].id,
        status: this.state.nestData[destinationColumnIndex].id,
      })
    ).then((value) => {
      // pass?
    });
  }
}

export default Board;
