import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import "./index.css";

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
