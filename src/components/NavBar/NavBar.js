import React, { Component } from "react";
import NavBarItem from "./NavBarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { navBarItemsModel, dialogData } from "./NavBarConstants";

class NavBar extends Component {
  state = {
    navBarItems: navBarItemsModel,
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

  componentDidUpdate() {
    if (this.state.redirect) {
      this.resetRedirectState();
    }
  }

  resetRedirectState() {
    this.setState({ ...this.state, redirect: false, redirectRoute: "" });
  }

  handleClicked = (navBarItem) => {
    if (navBarItem.displayDialogComponent) {
      this.props.showDialog(dialogData);
    } 
    else if (navBarItem.route) {
      this.setState({ ...this.state, redirect: true, redirectRoute: navBarItem.route });
    }
  };
}

export default NavBar;
