import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "./components/Layout/Layout";
import "./index.css";

Amplify.configure(awsconfig);

class App extends React.Component {
  async componentDidMount() {
    const { username } = await Auth.currentAuthenticatedUser();

    this.setState({
      username,
    });
  }

  render() {
    return (
      <div>
        {/* TODO: Put signout feature in layout component */}
        <AmplifySignOut />
        <Layout />
      </div>
    );
  }
}

export default withAuthenticator(App);
