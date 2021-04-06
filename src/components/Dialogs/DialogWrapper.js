import React, { Component } from "react";
import OptionDialog from "./OptionDialog";
import CreateBoardDialog from "./CreateBoardDialog";
import { withRouter } from "react-router-dom";

/**
 * Wrapper component around various dialog components
 */
class DialogWrapper extends Component {
  state = {
    show: this.props.dialog.show,
    redirect: false,
  };

  render() {
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
        return (
          <CreateBoardDialog
            dialog={this.props.dialog}
            onClose={this.handleCloseDialog}
            onSubmit={this.handleSubmitDialog}
          />
        );
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
      this.props.history.push({
        pathname: value.route,
        state: value,
      });

      this.setState({ ...this.state, redirect: true });
    } else {
      this.setState({ ...this.state, show: false });
    }
  };

  resetRedirectState() {
    this.setState({ ...this.state, redirect: false });
  }

  resetShowState() {
    this.setState({ ...this.state, show: false });
  }
}

export default withRouter(DialogWrapper);
