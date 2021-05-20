import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import "./index.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
//import $ from 'jquery';
//import Popper from 'popper.js';

Amplify.configure(awsconfig);
class App extends Component {
  state = {
    userInfo: null,
  };

  async componentDidMount() {
    const userInfo = await Auth.currentUserInfo();

    this.setState({
      userInfo,
    });
  }

  render() {
    return (
      <div>
        <Layout userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default withAuthenticator(App);
