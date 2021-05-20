import React, { Component } from "react";

class LearnTeams extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <!-- Page Content --> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              {/* <!-- Title --> */}
              <h1 className="mt-4">All About Teams!</h1>

              {/* <!-- Author --> */}
              <p className="lead">by Scrum Nest Support</p>
              <hr />
              {/* <!-- Date/Time --> */}
              <p>Posted on May 5, 2021 at 2:00 PM</p>
              <hr />
              {/* <!-- Preview Image --> */}
              <img
                src="/assets/owner-view-team.PNG"
                height="400"
                width="900"
                alt="Team page view from nest owner perspective."
              />
              <p>
                <br></br>
                Diagram 1: Scrum Nest - Teams Page example (Owners perspective)
              </p>

              <hr />

              {/* <!-- Post Content --> */}
              <p className="lead">
                <b>What are Teams?</b>
              </p>
              <p>
                Teams quite literally represent the team of your project. To
                navigate to the Teams page, click on the team icon on the top
                right of the navigation bar.
              </p>
              <p>
                Diagram 1 above is a depiction of the Team's page from a nest
                owners point of view. The owner of the nest will have
                permissions to add and remove teammates. Using the dropdown bar
                at the top, a user can switch between the different nests
                including those they own/created or were added tp as a member.
                Diagram 2 below is a depiction from a members point of view.
                Note that a member can only view their teammates, they do not
                have permissions to add or remove other teammates.
              </p>

              <hr />
              {/* <!-- Preview Image --> */}
              <img
                src="/assets/member-view-team.PNG"
                height="400"
                width="900"
                alt="Team page view from nest member perspective."
              />
              <p>
                <br></br>
                Diagram 2: Scrum Nest - Teams Page example (Members perspective)
              </p>
              <hr />

              <p className="lead">
                <b>How to add members to a Nest?</b>
              </p>
              <p>
                Adding users to a nest is a simple process. Enter their email
                into the add teammate textbox and click the add button.
              </p>
              <p>
                The action that takes place will depend on if the user already
                has a Scrum Nest account. If the user does not, their email will
                display under the "Pending Teammates" section and an email will
                be sent to their email address with a link to sign-up. Upon
                signing up they will automatically be moved to the "Members"
                section displaying their username. Simlarly, if the user already
                had an account they will automatically be added to the nest and
                their username will be displayed under the "Members" section,
                they will also receive an email notifying them that they have
                been added to the nest.
              </p>
              <hr />

              <p className="lead">
                <b>How to remove members from a Nest?</b>
              </p>
              <p>
                The owner of the nest can remove both pending members and
                members at any point by clicking the X button next to the email
                or username and confirming the delete in the dialog pop-up.
              </p>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LearnTeams;
