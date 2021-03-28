import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames("navbarContainer", {
          "is-open": this.props.isOpen,
        })}
      >
        <NavBar toggle={this.props.toggle} />
      </Container>
    );
  }
}

export default NavBarContainer;
