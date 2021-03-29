import React, { Component } from "react";
import NavBarItem from "./NavBarItem";
import { Redirect } from "react-router";
import { navBarItemsModel, dialogData } from './NavBarConstants';

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
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-collapse navbar-padding">
            <div
              id="scrum-nest-title"
              className="navbar-brand navbar-text text-center navbar-center-title"
            >
              Scrum Nest
            </div>
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
        </nav>
      </React.Fragment>
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
      this.props.showDialog(dialogData);
    } else if (navBarItem.route) {
      this.setState({ redirect: true, redirectRoute: navBarItem.route });
    }
  };

}

export default NavBar;
