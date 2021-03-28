import React, { Component } from "react";
import OptionDialog from "./OptionDialog";
import { Redirect } from "react-router";

/**
 * Wrapper component around various dialog components
 */
class DialogWrapper extends Component {
  state = {
    show: this.props.dialog.show,
    redirect: false,
    redirectRoute: "",
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectRoute} />;
    }

    switch (this.props.dialog.dialogType) {
      case "optionDialog": {
        return (
          <OptionDialog
            dialog={this.props.dialog}
            onClose={this.handleCloseDialog}
            onSubmit={this.handleSubmitDialog}
          />
        );
      }
      case "inputDialog": {
        // TO-DO: Input Dialog instance here:
        break;
      }
      case "yesNoDialog": {
        // TO-DO: yes no dialog instance here
        break;
      }
      case "checkboxDialog": {
        // TO-DO: checkbox dialog instance here
        break;
      }
      case "createBoardDialog": {
        // TO-DO: createBoardDialog instance here
        break;
      }
      default: {
        return (
          // TO-DO: Need a better unsupported message here...
          <h1>Unsupported dialog type!</h1>
        );
      }
    }
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.resetRedirectState();
      this.resetShowState();
      this.props.onHide();
    }
  }

  handleCloseDialog = () => {
    this.resetShowState();
    this.props.onHide();
  };

  handleSubmitDialog = (value) => {
    if (value.route) {
      this.setState({ redirectRoute: value.route, redirect: true });
    } else {
      this.setState({ show: false });
    }
  };

  resetRedirectState() {
    this.setState({ redirect: false, redirectRoute: "" });
  }

  resetShowState() {
    this.setState({ show: false });
  }
}

export default DialogWrapper;
