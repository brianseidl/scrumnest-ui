import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../../graphql/queries";

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nestId: this.props.match.params.nestId,
      stories: [],
    };
  }

  componentDidMount() {
    // get story info on page load
    console.log("fuck");
    API.graphql(
      graphqlOperation(queries.stories, {
        nestId: this.state.nestId,
      })
    ).then((value) => {
      this.setState({ stories: value.data.stories });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">Stories</h1>
        <Container id="board-container" className="container-height">
          <table className="table table-striped">
            <thead>
              <tr className="table-primary">
                <th>#</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stories.map((story) => {
                return (
                  <tr>
                    <td>
                      <a
                        href={`/nests/${this.state.nestId}/stories/${story.storyId}`}
                      >
                        {story.storyId}
                      </a>
                    </td>
                    <td>{story.title}</td>
                    <td>{story.owner}</td>
                    <td>{story.status}</td>
                    <td>{new Date(story.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </React.Fragment>
    );
  }
}

export default Stories;
