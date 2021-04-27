import React, { Component } from "react";

class LearnNests extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <!-- Page Content --> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              {/* <!-- Title --> */}
              <h1 className="mt-4">All About Nests!</h1>

              {/* <!-- Author --> */}
              <p className="lead">by Scrum Nest Support</p>
              <hr />
              {/* <!-- Date/Time --> */}
              <p>Posted on April 27, 2021 at 12:00 PM</p>
              <hr />
              {/* <!-- Preview Image --> */}
              <img
                className="img-fluid rounded"
                src="/assets/scrum-board-example.png"
                height="300"
                width="500"
                alt="A sample scrum board."
              />
              <hr />

              {/* <!-- Post Content --> */}
              <p className="lead">What is a Nest?</p>
              <p>
                A nest is a virtual scrum board. For those readers who do not
                know what a scrum board is, scrum boards in its most simple
                physical form is an actual Board that contains various user
                stories or "tasks" and their statuses during a particular
                sprint.
              </p>
              <p>
                The post's top image is a very simple depiction of a physical
                scrum board detailing the various statuses a user story can
                have.
              </p>
              <p className="lead">How to create a Nest</p>
              <p>
                To create a nest is very easy. Simply select the 'Create Nest'
                option that is seen on the sidebar menu on any page from the
                scrum nest site.
              </p>
              <p>
                You will then be prompted with a dialog that appears asking for
                your Nest's name. Input a name and select 'Finish'. You will
                then be redirected to the Nest page that looks like this:
              </p>
              <img
                className="img-fluid rounded"
                src="/assets/new-nest-page.jpg"
                height="300"
                width="800"
                alt="A new Nest"
              ></img>
              <hr />
              <p>
                Nests have the standard categories of 'To-Do', 'In Dev'
                (signifying a user story is currently being developed), 'QA',
                and 'Completed'.
              </p>
              <p>
                Once your nest has been created, you will be able to navigate to
                your nest via the 'My Nests' sidebar menu. Upon selecting the
                menu, you will be navigated to a page that lists every nest you
                have access to. You can simply select one of the nests from the
                list and voila, back to the nest you go!
              </p>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LearnNests;
