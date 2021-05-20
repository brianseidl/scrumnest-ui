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
                src="https://www.iln.cloud/file/31651/OriginalLarge"
                height="300"
                width="500"
                alt="A sample scrum board."
              />
              <p>
                <br></br>
                Diagram 1: Physical Scrum Board
              </p>
              <hr />

              {/* <!-- Post Content --> */}
              <p className="lead">
                <b>What is a Nest?</b>
              </p>
              <p>
                A nest is a virtual scrum board. For those readers who do not
                know what a scrum board is, scrum boards in its most simple
                physical form is an actual Board that contains various user
                stories or "tasks" and their statuses during a particular
                sprint.
              </p>
              <p>
                Diagram 1 above is a very simple depiction of a physical scrum
                board detailing the various statuses a user story can have.
              </p>
              <hr />
              <p className="lead">
                <b>How to create a Nest</b>
              </p>
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
                src="https://www.iln.cloud/file/31648/OriginalLarge"
                height="300"
                width="800"
                alt="A new Nest."
              ></img>
              <p>
                <br></br>
                Diagram 2: Scrum Nest - New Nest example
              </p>

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
