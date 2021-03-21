import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

import Home from "./components/Home";

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
        <AmplifySignOut />
        <BrowserRouter>
          <Route exact path={"/"} component={Home} />
          {/* TODO: add routes here */}
        </BrowserRouter>
      </div>
    );
  }
}

export default withAuthenticator(App);
