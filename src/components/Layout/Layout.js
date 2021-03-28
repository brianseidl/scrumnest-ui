import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import NavBarContainer from "../NavBar/NavBarContainer";
import DialogWrapper from "../Dialogs/DialogWrapper";

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
        <div className="App wrapper">
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <NavBarContainer
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            showDialog={this.handleShowDialog}
          />
        </div>

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
