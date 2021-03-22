import React from "react";
import ROUTES, { RenderRoutes } from './routes';
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify, { Auth, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Layout from './components/Layout/Layout';

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
        <RenderRoutes routes={ROUTES} />
      </div>
    );
  }
}

export default withAuthenticator(App);
