import React, { Component } from "react";
import { cardItems } from "./HomePageConstants";
import Cards from "../../components/Cards/Cards";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="bg-primary py-5 mb-5">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-12">
                <h1 className="display-4 text-white mt-5 mb-2">
                  Welcome to Scrum Nest!
                </h1>
                <p className="lead mb-5 text-white-50">
                  A scrum board service built for students by students.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>What is Scrum Nest?</h2>
              <hr />
              <p>
                Scrum Nest is a scrum board application that supports one of the
                most popular agile methodlogies to date, scrum.
              </p>
              <p>
                Scrum Nest is built to support smaller agile teams that need to
                quickly and efficiently begin working on their project. All you
                have to do is create a Nest, add some team members to your
                project, and you should be all set to go!
              </p>
              <p>
                View some of our quick 5 minute tutorials below to learn some of
                the neat features Scrum Nest offers!
              </p>
            </div>
            <div className="col-md-4 mb-5">
              <h2>Contact Us</h2>
              <hr />
              <address>
                Post issues on our Github Repository:
                <br />
                <a href="https://github.com/brianseidl/scrumnest-ui/issues">
                  github.com/brianseidl/scrumnest-ui/issues
                </a>
                <br />
                <br />
                Email: <a href="mailto:#">support@scrumnest.com</a>
              </address>
              <address></address>
            </div>
          </div>
          <Cards cards={cardItems} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
