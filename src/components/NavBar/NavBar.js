import React, { Component } from "react";
import NavBarItem from "./NavBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button } from "react-bootstrap";
import { navBarItemsModel } from "./NavBarConstants";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  state = {
    navBarItems: navBarItemsModel,
  };

  render() {
    return (
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-2 bg-white rounded"
        expand
      >
        <Button variant="outline-info" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div
            id="scrum-nest-title"
            className="navbar-brand navbar-text pagination-centered text-center navbar-center-title"
          >
            Scrum Nest
          </div>

          <ul className="navbar-nav">
            {this.state.navBarItems.map((navBarItem) => (
              <li
                key={navBarItem.id + "-list"}
                className="nav-item px-3 selectable-item"
              >
                <NavBarItem
                  key={navBarItem.id}
                  navBarItem={navBarItem}
                  onClicked={this.handleClicked}
                />
              </li>
            ))}
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleClicked = (navBarItem) => {
    if (navBarItem.route) {
      this.props.history.push(navBarItem.route);
    }
  };
}

export default withRouter(NavBar);
