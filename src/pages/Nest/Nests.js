import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import { API, graphqlOperation } from "aws-amplify";

import * as queries from "../../graphql/queries";

class Nests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nests: [],
    };
  }

  componentDidMount() {
    // get nest info on page load
    API.graphql(graphqlOperation(queries.nests)).then((value) => {
      this.setState({ nests: value.data.nests });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 text-black text-center nest-title">Nests</h1>
        <Container id="board-container" className="container-height">
          <table className="table table-striped">
            <thead>
              <tr className="table-primary">
                <th>#</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Number of Users</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {this.state.nests.map((nest) => {
                return (
                  <tr id={nest.nestId} key={`${nest.nestId}`}>
                    <td>
                      <a href={`/nests/${nest.nestId}/`}>{nest.nestId}</a>
                    </td>
                    <td>{nest.name}</td>
                    <td>{nest.owner}</td>
                    <td>{nest.users.length}</td>
                    <td>{new Date(nest.createdAt).toLocaleString()}</td>
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

export default Nests;
