import React, { Component } from "react";
import NavBarItem from "./NavBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";

class NavBar extends Component {
  state = {
    navBarItems: [
      {
        id: 1,
        route: "/teams",
        icon: "fa fa-users",
        displayDialogComponent: null,
      },
      {
        id: 2,
        route: null,
        icon: "fa fa-bars",
        displayDialogComponent: null,
      },
      {
        id: 3,
        route: "/",
        icon: "fa fa-home",
        displayDialogComponent: null,
      },
    ],
  };

  render() {
    return (
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-5 bg-white rounded"
        expand
      >
        <Button variant="outline-info" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navbar-brand navbar-text pagination-centered text-center">
            Scrum Nest
          </div>

          <ul className="navbar-nav">
            {this.state.navBarItems.map((navBarItem) => (
              <li key={navBarItem.id + "-list"} className="nav-item px-3">
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

  handleClicked = (route) => {};
}

export default NavBar;
