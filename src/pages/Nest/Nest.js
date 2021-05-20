import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UserStoryContainer from "../../components/UserStory/UserStoryContainer";
import { NEST_MODEL } from "./NestConstants";
import { showCreateStoryDialog } from "../../components/Dialogs/service/DialogService";
import SprintBar from "../../components/SprintBar/SprintBar";

import * as qs from "query-string";

import { DragDropContext } from "react-beautiful-dnd";
import { API, graphqlOperation } from "aws-amplify";

// TODO: Remove all of this * crap
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

class Nest extends Component {
  state = {
    nestName: "",
    nestId: "",
    nest: null,
    sprint: null,
    nestData: NEST_MODEL,
    isModalOpen: false,
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">
          Nest: {this.state.nestName}
        </h1>

        <Container fluid>
          <Row>
            <Col md="2">
              <div className="btn-group">
                <button class="btn btn-outline-primary active">Grid</button>
                {this.state.sprint ? (
                  <a
                    class="btn btn-outline-primary"
                    href={`/nests/${this.state.nestId}/stories/?sprint=${this.state.sprint}`}
                  >
                    List
                  </a>
                ) : (
                  <a
                    class="btn btn-outline-primary"
                    href={`/nests/${this.state.nestId}/stories`}
                  >
                    List
                  </a>
                )}
              </div>
            </Col>

            <Col>
              {this.state.nest && (
                <SprintBar
                  sprints={this.state.nest.sprints}
                  sprint={this.state.sprint}
                  nestId={this.state.nestId}
                  currentHref={`/nests/${this.state.nestId}/`}
                />
              )}
            </Col>
          </Row>
        </Container>

        <Container id="board-container" className="container-height">
          <Row>
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
              {this.state.nestData.map((column) => (
                <Col key={column.id} className="board-column-properties">
                  <div id="board-container-title" className="text-center">
                    <h5 className="display-4 text-black">
                      {column.title}&nbsp;
                      {column.showAddButton && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-2 py-1"
                          onClick={this.openModal}
                        >
                          <i className="fa fa-plus" />
                        </button>
                      )}
                    </h5>
                  </div>
                  <UserStoryContainer
                    nestId={this.state.nestId}
                    key={column.id}
                    columnProperties={column}
                    sprint={this.state.sprint}
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
      sprint: parseInt(qs.parse(window.location.search).sprint) || null,
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
      graphqlOperation(subscriptions.nestStories, { nestId: this.state.nestId })
    ).subscribe((value) => {
      if (value.value.data.nestStories)
        this.setNestState(value.value.data.nestStories);
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
      if (!this.state.sprint || this.state.sprint === story.sprint) {
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
          default:
            nestData[0].userStories.push(storyData);
            break;
        }
      }
    });

    this.setState({
      nest: nest,
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
      graphqlOperation(mutations.updateStory, {
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

  openModal = () => {
    showCreateStoryDialog(this.state.nestId, this.state.sprint).then(
      (value) => {
        // Do nothing...
      }
    );
  };
}

export default Nest;
