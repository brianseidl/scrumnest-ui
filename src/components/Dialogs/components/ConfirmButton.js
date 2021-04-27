import React, { Component, createRef } from "react";
import Button from "react-bootstrap/Button";

// DEPRECATED In favor of the YesNoDialog for now...
class ConfirmButton extends Component {
  confirmRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      label: props.label || "Unlabelled",
      question: props.question || "Confirm?",
      confirmed: false,
      className: props.className ? "btn " + props.className : "btn",
    };
    this.state.confirmClassName = this.state.className.replace(
      "btn-danger",
      ""
    );
  }

  render() {
    /*return 
      <React.Fragment>
        <Button
          className={this.state.className}
          onClick={this.addListener}
          hidden={this.state.confirmed === true}
        >
          {this.state.label}
        </Button>
        <span />
        <Button
          id='new'
          className={this.state.className}
          hidden={this.state.confirmed === false}
          onClick={this.handleConfirm}
        >
          Confirm {this.state.label}
        </Button>
      </React.Fragment>
    */

    if (this.state.confirmed !== true) {
      return (
        <Button
          className={this.state.className}
          onClick={() => {
            this.setState({ confirmed: true });
          }}
        >
          {this.state.label}
        </Button>
      );
    } else {
      return (
        <React.Fragment>
          <span className="mr-3">{this.state.question}</span>
          <Button
            className={`btn-success mr-2 ${this.state.confirmClassName}`}
            onClick={(event) => {
              this.props.onClick(event);
              this.setState({ confirmed: false });
            }}
          >
            Yes
          </Button>
          <Button
            type="button"
            className={`btn-danger ${this.state.confirmClassName}`}
            onClick={() => {
              this.setState({ confirmed: false });
            }}
          >
            No
          </Button>
        </React.Fragment>
      );
    }
  }
}

export default ConfirmButton;
