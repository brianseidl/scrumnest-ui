import React, { Component } from "react";
import { render } from "react-dom";

/**
 * Wrapper component around various dialog components
 */

let resolve;
class BaseDialogComponent extends Component {
  static create(dialogData) {
    const containerElement = document.createElement("div");
    document.body.appendChild(containerElement);
    return render(<dialogData.type dialog={dialogData} />, containerElement);
  }

  show() {
    this.setState({ show: true });
    return new Promise((res) => {
      resolve = res;
    });
  }

  handleClose(data) {
    this.setState({ show: false });
    resolve(data);
  }
}

export default BaseDialogComponent;
