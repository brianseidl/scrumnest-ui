import React, { Component } from "react";

class LearnUserStories extends Component {
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
              <p>Posted on May 6, 2021 at 3:00 PM</p>
              <hr />
              {/* <!-- Preview Image --> */}
              <img
                className="img-fluid rounded"
                src="https://www.iln.cloud/file/31655/OriginalLarge"
                height="300"
                width="1000"
                alt="Nest page with user stories."
              />
              <p>
                <br></br>
                Diagram 1: Scrum Nest - Nest Page with User Stories Grid View
              </p>
              <hr />

              {/* <!-- Post Content --> */}
              <p className="lead">
                <b>What is a User Story?</b>
              </p>
              <p>
                A user story is a unit of work in an agile framework, such as
                scrum. It expressed an end goal task from a software user's
                perspective. In general on the scrum board we can look at user
                stories as a list of tasks to be completed to overall reach the
                final product.
              </p>
              <p>
                Diagram 1 above is a simple depiction of user stories on a nest.
                User stories can be dragged up and down to change order in a
                specific column, or dragged left and right between the different
                columns to update it's "status".
              </p>

              <hr />

              <p className="lead">
                <b>How to create a User Story?</b>
              </p>
              <p>
                To create a user story, select the "+" button next to the
                "To-Do" title of the first column.
              </p>
              <p>
                You will then be prompted with a dialog that appears asking for
                your User Story's title. Which in general should be a simple
                statement describing the task to be done. Once the title is
                inputted, hit the 'Submit' button.
              </p>

              <hr />

              <p className="lead">
                <b> Filter User Stories by Sprint </b>
              </p>
              <p>
                User Stories can be filtered by Sprint. In scrum, a sprint is a
                time duration in which specific tasks have to be completed,
                normally numbered as Sprint 1, 2, 3, etc.
              </p>
              <p>
                Using the "All Sprints" dropdown above the Nest table, a user
                can filter the display to show all user stories (default) or
                user stories for a specific sprint. By selecting the "New
                Sprint" option in the dropdown, a new sprint will be created
                defaulted to the following number of the latest sprint.
              </p>

              <hr />

              <p className="lead">
                <b>How to view and edit a User Story?</b>
              </p>
              <p>
                To view and edit details of a specific user story click on the
                blue "View" button on the user story card. This will redirect
                the user to the details page of that story. On this page as
                shown in the image below, the title of the story is displayed
                along with several fields that can be edited.
                <br></br> <br></br>
                This includes:
                <br></br>
                <ul>
                  <li>
                    Status - update the status of the user story (TODO, DEV, QA,
                    Completed)
                  </li>
                  <li>
                    Sprint Linked With - the sprint associated to the user story
                  </li>
                  <li>
                    Details - a more detailed description of the user story/task
                    or requirements
                  </li>
                  <li>
                    Attachments - users can upload and attach files to the user
                    story
                  </li>
                  <li>Comments - add comments to the user story</li>
                  <li>
                    Priority - set the priority of how important the user story
                    is (none/low/medium/high/urgent)
                  </li>
                  <li>
                    Assignee - edit the assignee, the person who added the user
                    story to the nest
                  </li>
                  <li>
                    Effort - the amount of days working it should take to
                    complete the task
                  </li>
                  <li>To be completed by - deadline of the user story</li>
                </ul>
                Hit the 'Finish' button at the bottom to save the changes made
                to the user story.
              </p>
              <img
                src="https://www.iln.cloud/file/31657/OriginalLarge"
                height="550"
                width="900"
                alt="Edit user story view."
              ></img>
              <p>
                <br></br>
                Diagram 2: Scrum Nest - Edit User Story View
              </p>

              <hr />
              <p className="lead">
                <b>How to delete a User Story?</b>
              </p>
              <p>
                To delete a user story, click on the red "Delete" button on the
                user story card. A confirmation dialog will appear, hit the
                'Yes' button to confirm.
              </p>

              <hr />
              <p className="lead">
                <b>List View</b>
              </p>
              <p>
                To view the user stories of a nest as a list instead of a grid.
                Click on the "List" option next to grid on the top left of the
                Nest table. The view will as shown in Diagram 3 below.
              </p>

              <img
                src="https://www.iln.cloud/file/31656/OriginalLarge"
                height="291"
                width="900"
                alt="User story list view."
              ></img>
              <p>
                <br></br>
                Diagram 3: Scrum Nest - Nest Page with User Stories List View
              </p>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LearnUserStories;
