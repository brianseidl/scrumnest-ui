import React, { Component } from "react";
import PropTypes from "prop-types";

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

class SprintBar extends Component {
  addSprint = () => {
    API.graphql(
      graphqlOperation(mutations.addSprint, { nestId: this.props.nestId })
    ).then((value) => {
      console.log(value.data);
      let newSprint = value.data.addSprint.sprints;
      window.location.search = `?sprint=${newSprint}`;
    });
  };

  render() {
    console.log(this.props.history);

    let listItems = [];
    // generate the dropdown of sprints
    for (let i = this.props.sprints; i > 0; i--) {
      listItems.push(
        <a class="dropdown-item" href={`${this.props.currentHref}?sprint=${i}`}>
          Sprint {i}
        </a>
      );
    }

    return (
      <React.Fragment>
        <div class="dropdown">
          {this.props.sprint ? (
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sprint {this.props.sprint}
            </button>
          ) : (
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Sprints
            </button>
          )}
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href={this.props.currentHref}>
              All Sprints
            </a>
            <div role="separator" class="dropdown-divider" />
            <button class="dropdown-item" onClick={this.addSprint}>
              New Sprint
            </button>
            <div role="separator" class="dropdown-divider" />
            {listItems}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SprintBar.propTypes = {
  nestId: PropTypes.string.isRequired,
  sprints: PropTypes.number.isRequired,
  sprint: PropTypes.number,
  currentHref: PropTypes.string.isRequired, // Required for links
};

export default SprintBar;
