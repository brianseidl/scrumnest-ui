import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import NavBarContainer from "../NavBar/NavBarContainer";

class Layout extends Component {
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  state = {};

  render() {
    return (
      <div className="App wrapper">
        <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <NavBarContainer toggle={this.toggle} isOpen={this.state.isOpen} />
      </div>
    );
  }
}

export default Layout;
