import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../../graphql/queries";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nestId: this.props.match.params.nestId,
      storyId: this.props.match.params.storyId,
      story: {
        title: "",
      },
    };
  }

  componentDidMount() {
    // get story info on page load
    API.graphql(
      graphqlOperation(queries.story, {
        nestId: this.state.nestId,
        storyId: this.state.storyId,
      })
    ).then((value) => {
      this.setState({ story: value.data.story });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">
          Story: {this.state.story.title}
        </h1>
        <Container
          id="board-container"
          className="container-height"
        ></Container>
      </React.Fragment>
    );
  }
}

export default Story;
