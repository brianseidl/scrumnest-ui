import React from "react";
import logo from "../logo.svg";

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Scrum Nest Home</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default Home;
