import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import "./index.css";

Amplify.configure(awsconfig);
class App extends Component {
  async componentDidMount() {
    const { username } = await Auth.currentAuthenticatedUser();

    this.setState({
      username,
    });

    Auth.currentUserInfo().then((value) => console.log("user info is:", value));
  }

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default withAuthenticator(App);
