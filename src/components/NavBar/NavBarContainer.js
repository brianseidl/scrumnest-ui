import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Container
        fluid
        className={classNames("navbarContainer", {
          "is-open": this.props.isOpen,
        })}
      >
        <NavBar toggle={this.props.toggle} showDialog={this.props.showDialog} />
      </Container>
    );
  }
}

export default NavBarContainer;
