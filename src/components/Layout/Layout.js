import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import DialogWrapper from "../Dialogs/DialogWrapper";
import ROUTES, { RenderRoutes } from "../../routes";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
import classNames from "classnames";
import NavBar from "../NavBar/NavBar";

class Layout extends Component {
  state = {
    // Data for dialog components will be in this general structure... could be subject to change
    dialog: {
      show: false,
      dialogType: "",
      closeButton: true,
      title: "",
      fields: [],
    },
    isOpen: true,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <SideBar
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            showDialog={this.handleShowDialog}
          />
          <Container
            fluid
            className={classNames("navbarContainer", {
              "is-open": this.state.isOpen,
            })}
          >
            <NavBar toggle={this.toggle} showDialog={this.handleShowDialog} />
            <RenderRoutes routes={ROUTES} />
          </Container>
        </div>
        <Footer />

        {this.state.dialog.show && (
          <DialogWrapper
            dialog={this.state.dialog}
            onHide={this.handleHideDialog}
          />
        )}
      </React.Fragment>
    );
  }

  handleHideDialog = () => {
    const resetDialogState = this.resetDialogState();
    this.setState({ dialog: resetDialogState });
  };

  handleShowDialog = (dialogData) => {
    this.setState({ dialog: { ...dialogData, show: true } });
  };

  resetDialogState() {
    const dialogState = {
      show: false,
      dialogType: "",
      closeButton: true,
      title: "",
      fields: [],
    };

    return dialogState;
  }
}

export default Layout;
