import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as qs from "query-string";
import { API, graphqlOperation } from "aws-amplify";

import SprintBar from "../../components/SprintBar/SprintBar";

import * as queries from "../../graphql/queries";

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nest: null,
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
  }

  setNestState(nest) {
    if (this.state.sprint) {
      let stories = [];
      nest.stories.forEach((story, index) => {
        if (story.sprint === this.state.sprint) {
          stories.push(story);
        }
      });
      nest.stories = stories;
    }
    this.setState({ nest: nest });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">Stories</h1>

        <Container fluid>
          <Row>
            <Col md="2">
              <div className="btn-group">
                {this.state.sprint ? (
                  <a
                    class="btn btn-outline-primary"
                    href={`/nests/${this.state.nestId}/?sprint=${this.state.sprint}`}
                  >
                    Grid
                  </a>
                ) : (
                  <a
                    class="btn btn-outline-primary"
                    href={`/nests/${this.state.nestId}/`}
                  >
                    Grid
                  </a>
                )}
                <button class="btn btn-outline-primary active">List</button>
              </div>
            </Col>

            <Col>
              {this.state.nest && (
                <SprintBar
                  sprints={this.state.nest.sprints}
                  sprint={this.state.sprint}
                  nestId={this.state.nestId}
                  currentHref={`/nests/${this.state.nestId}/stories/`}
                />
              )}
            </Col>
          </Row>
        </Container>

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
              {this.state.nest &&
                this.state.nest.stories.map((story) => {
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
