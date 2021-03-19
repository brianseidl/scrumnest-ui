import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import Home from "./components/Home";

class App extends React.Component {
  /**
   * React render function.
   *
   * Preconditions:
   *   - Status of the component is updated.
   * Postconditions:
   *   - Component is rendered on page with latest data.
   */
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path={"/"} component={Home} />
          {/* TODO: add routes here */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
