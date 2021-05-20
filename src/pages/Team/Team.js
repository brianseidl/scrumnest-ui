import React, { Component } from "react";
import PendingCards from "../../components/Cards/PendingCards";
import MemberCards from "../../components/Cards/MemberCards";
import { showYesNoDialog } from "../../components/Dialogs/service/DialogService";
import OwnerCards from "../../components/Cards/OwnerCards";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Auth } from "aws-amplify";
import _ from "lodash";

class Team extends Component {
  state = {
    loggedUser: "",
    show: false,
    selectedMember: null,
    owner: "",
    members: [],
    pending: [],
    nests: [],
    selectedNest: null,
    disableFields: false,
    newUserEmail: "",
  };

  render() {
    return (
      <React.Fragment>
        <header className="bg-primary py-0.5 mb-2">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-12">
                <h1 className="team-title text-white mt-2 mb-2">Teams</h1>
              </div>
            </div>
          </div>
        </header>

        <div class="select-nest-row mt-5">
          <div class="col-md-8 mb-2">
            <h4 class="select-nest-header">Select a Nest</h4>
            <select
              class="custom-select d-block w-50"
              id="nestName"
              display="inline-block"
              onClick={this.handleNestSelect}
              required
            >
              <option default> Choose... </option>
              {this.state.nests.map((nest) => (
                <option>{nest.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Select a Board */}
        <div className="container-team">
          {/* Add Teammate */}
          <div class="row mt-5">
            <div class="col">
              <h3> Add Teammate </h3>
              <hr class="team-line" />

              <div class="input-group mb-3 ">
                <div
                  class={`input-group-prepend ${
                    this.state.disableFields ? "disabled-field" : ""
                  }`}
                >
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    E-mail
                  </span>
                </div>

                <input
                  type="text"
                  class={`form-control ${
                    this.state.disableFields ? "disabled-field" : ""
                  }`}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={this.setNewUserEmail}
                  value={this.state.newUserEmail}
                ></input>

                <button
                  class={`btn-add-teammate btn-primary btn-sm btn-block ${
                    this.state.disableFields ? "disabled-field" : ""
                  }`}
                  type="submit"
                  onClick={this.addNewUser}
                >
                  Add
                </button>
              </div>

              <h3 class="mt-4 mb-3"> Pending Teammates </h3>
              <hr class="team-line" />

              <PendingCards
                cards={this.state.pending}
                handleDialogEvent={this.handleShowDialog}
                disabled={this.state.disableFields}
              />
            </div>

            <div className="col">
              <h3>Nest Leader</h3>

              <hr class="team-line" />

              <OwnerCards
                cards={this.state.owner}
                handleDialogEvent={this.handleShowDialog}
                disabled={this.state.disableFields}
              />

              <h3>Members</h3>
              <hr class="team-line" />
              <MemberCards
                cards={this.state.members}
                handleDialogEvent={this.handleShowDialog}
                disabled={this.state.disableFields}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleShowDialog = (member) => {
    this.setState({ selectedMember: member });

    const message = member.username
      ? `Are you sure you want to remove ${member.username}?`
      : "Are you sure you want to remove this user?";

    showYesNoDialog(message).then((deleteMember) => {
      this.handleCloseYesNoDialog(deleteMember);
    });
  };

  handleCloseYesNoDialog = (deleteMember) => {
    if (deleteMember) {
      this.deleteNestUser(this.state.selectedMember);
    }
  };

  componentDidMount() {
    this.getNestsForUser();
    Auth.currentUserInfo().then((value) => {
      this.setState({ loggedUser: value.username });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Updating the CSS based on the users permission for the selected nest
    if (prevState.selectedNest !== this.state.selectedNest) {
      if (
        // null will be "Choose...""
        this.state.selectedNest == null ||
        this.state.selectedNest.owner === this.state.loggedUser
      )
        this.setState({ disableFields: false });
      else this.setState({ disableFields: true });

      // Load the Members List based on the selected nest
      // Get the index of the selected nest
      let index = this.state.nests.indexOf(this.state.selectedNest);

      // Hold the owner, members and pending
      let tempOwner = "";
      let tempMembers = [];
      let tempPending = [];

      // index is -1 is Choose...
      if (index > -1) {
        tempOwner = this.state.nests[index].owner;

        // set members to users with usernames & pending to emails of users without usernames
        for (let i = 0; i < this.state.nests[index].users.length; i++) {
          if (this.state.nests[index].users[i].username !== "")
            tempMembers.push(this.state.nests[index].users[i]);
          else tempPending.push(this.state.nests[index].users[i]);
        }
      }

      // Set owner, members and pending
      this.setState({
        owner: tempOwner,
        members: tempMembers,
        pending: tempPending,
      });
    }
  }

  getNestsForUser() {
    API.graphql(graphqlOperation(queries.nests)).then((value) => {
      this.setState({ nests: value.data.nests });
    });
  }

  handleNestSelect = () => {
    // Get selected index and nest name
    let nest = document.getElementById("nestName");
    const nestName = nest.options[nest.selectedIndex].text;

    // Getting the nest from the array
    let getSelectedNest = this.state.nests.filter(function (obj) {
      return obj.name === nestName;
    })[0];

    this.setState({ selectedNest: getSelectedNest });
  };

  setNewUserEmail = (data) => {
    this.setState({ newUserEmail: data.target.value });
  };

  setDeleteUserEmail = (data) => {
    this.setState({ deleteUserEmail: data.target.value });
  };

  addNewUser = () => {
    if (this.state.selectedNest) {
      const nestID = this.state.selectedNest.nestId;
      const email = this.state.newUserEmail;

      API.graphql(
        graphqlOperation(mutations.addNestUser, {
          nestId: nestID,
          email: email,
        })
      ).then((value) => {
        const nests = _.cloneDeep(this.state.nests);
        const updatedNest = {
          ...this.state.selectedNest,
          users: value.data.addNestUser.users,
        };

        const index = this.state.nests.indexOf(this.state.selectedNest);
        nests[index] = updatedNest;

        this.setState({
          selectedNest: updatedNest,
          nests: nests,
          newUserEmail: "",
        });
      });
    } else {
      alert("Select a Nest");
    }
  };

  deleteNestUser = (member) => {
    if (this.state.selectedNest) {
      const nestID = this.state.selectedNest.nestId;
      const email = member.email;

      API.graphql(
        graphqlOperation(mutations.removeNestUser, {
          nestId: nestID,
          email: email,
        })
      ).then((value) => {
        const nests = _.cloneDeep(this.state.nests);
        const updatedNest = value.data.removeNestUser;

        const index = this.state.nests.indexOf(this.state.selectedNest);
        nests[index] = updatedNest;

        this.setState({
          selectedNest: updatedNest,
          nests: nests,
        });
      });
    } else {
      alert("Select a Nest");
    }
  };
}
export default Team;
