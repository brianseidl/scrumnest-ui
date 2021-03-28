import React, { Component } from "react";
import NavBarItem from "./NavBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import { Redirect } from "react-router";

class NavBar extends Component {
  state = {
    navBarItems: [
      {
        id: 1,
        route: "/teams",
        icon: "fa fa-users",
        displayDialogComponent: false,
      },
      {
        id: 2,
        route: null,
        icon: "fa fa-bars",
        displayDialogComponent: true,
      },
      {
        id: 3,
        route: "/",
        icon: "fa fa-home",
        displayDialogComponent: false,
      },
    ],
    redirect: false,
    redirectRoute: "",
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectRoute} />;
    }

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
                className="nav-item px-3 navbar-icons"
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

  componentDidUpdate() {
    if (this.state.redirect) {
      this.resetRedirectState();
    }
  }

  resetRedirectState() {
    this.setState({ redirect: false, redirectRoute: "" });
  }

  handleClicked = (navBarItem) => {
    if (navBarItem.displayDialogComponent) {
      const dialogData = this.getOptionDialogData();
      this.props.showDialog(dialogData);
    } else if (navBarItem.route) {
      this.setState({ redirect: true, redirectRoute: navBarItem.route });
    }
  };

  /**
   * Retrieves static dialog data
   */
  getOptionDialogData() {
    const dialogData = {
      dialogType: "optionDialog",
      closeButton: true,
      title: "Choose an Action",
      fields: [
        {
          type: "radio",
          id: "Edit-Board",
          label: "Edit Board",
          value: {
            route: "/board",
          },
        },
        {
          type: "radio",
          id: "View-Epics",
          label: "View Epics",
          value: {
            route: "/epics",
          },
        },
      ],
    };

    return dialogData;
  }
}

export default NavBar;
