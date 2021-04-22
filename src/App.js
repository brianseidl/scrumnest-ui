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
    Auth.configure({ identityPoolId: 'us-east-1:75b68a6a-1448-4f6e-8439-b068a39cb2ef' })

    this.setState({
      username,
    });
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
