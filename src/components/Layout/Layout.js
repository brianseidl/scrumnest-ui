import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
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
  };

  render() {
    return (
      // TODO: Add Sidebar component
      <React.Fragment>
        <div>
          <NavBar showDialog={this.handleShowDialog} />
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
