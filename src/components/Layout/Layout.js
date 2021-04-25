import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import ROUTES, { RenderRoutes } from "../../routes";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import NavBar from "../NavBar/NavBar";

class Layout extends Component {
  state = {
    userInfo: this.props.userInfo,
    isOpen: true,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Container
            fluid
            className={classNames("navbarContainer", {
              "is-open": this.state.isOpen,
            })}
          >
            <NavBar toggle={this.toggle} />
            <RenderRoutes routes={ROUTES} userInfo={this.props.userInfo} />
          </Container>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
