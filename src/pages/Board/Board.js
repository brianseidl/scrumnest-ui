import React, { Component } from "react";

class Board extends Component {
  state = {};
  render() {
    return <h1>Board page loaded!</h1>;
  }

  constructor(props) {
    super(props);
    console.log("props loaded: ", props);
  }
}

export default Board;
