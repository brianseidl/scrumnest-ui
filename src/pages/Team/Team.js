import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { pendingItems, memberItems, yesNoData } from "./TeamPageConstants";
import PendingCards from "../../components/Cards/PendingCards";
import MemberCards from "../../components/Cards/MemberCards";
import YesNoDialog from "../../components/Dialogs/YesNoDialog";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { Auth } from "aws-amplify";

class Team extends Component {
  constructor(props) {
    super(props);
    console.log("props is:", props);
  }

  state = {
    loggedUser: "",
    show: false,
    selectedMember: null,
    members: memberItems,
    pending: pendingItems,
    nests: [],
    selectedNest: null,
    disableFields: false,
  };

  render() {
    return (
      <React.Fragment>
        <header className="bg-primary py-0.5 mb-2">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-12">
                <h1 className="team-title text-white mt-2 mb-2">Team Page</h1>
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
                ></input>

                <button
                  class={`btn-add-teammate btn-primary btn-sm btn-block ${
                    this.state.disableFields ? "disabled-field" : ""
                  }`}
                  type="submit"
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
              <h3>Members</h3>

              {this.state.show && (
                <YesNoDialog
                  dialog={yesNoData}
                  onClose={this.handleCloseYesNoDialog}
                />
              )}

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
    console.log(member);
    this.setState({ show: true, selectedMember: member });
  };

  handleCloseYesNoDialog = (deleteMember) => {
    if (this.state.selectedMember.pending == true)
      this.handleYesNoDialogPendingMember();
    else if (deleteMember) this.handleYesNoDialogTeamMember();
    else
      this.setState({
        show: false,
      });
  };

  handleYesNoDialogPendingMember = () => {
    const tempPendingList = this.state.pending.slice();
    const deletedIndex = tempPendingList.indexOf(this.state.selectedMember);
    tempPendingList.splice(deletedIndex, 1);
    this.setState({
      show: false,
      selectedMember: null,
      pending: tempPendingList,
    });
  };

  handleYesNoDialogTeamMember = () => {
    const tempMemberList = this.state.members.slice();
    const deletedIndex = tempMemberList.indexOf(this.state.selectedMember);
    tempMemberList.splice(deletedIndex, 1);
    this.setState({
      show: false,
      selectedMember: null,
      members: tempMemberList,
    });
  };

  componentDidMount() {
    this.getNestsForUser();
    Auth.currentUserInfo().then((value) => {
      this.state.loggedUser = value.username;
      console.log(value.username);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedNest !== this.state.selectedNest) {
      if (
        // null will be "Choose...""
        this.state.selectedNest.owner == this.state.loggedUser
      )
        this.setState({ disableFields: true });
      else this.setState({ disableFields: false });
    }
  }

  getNestsForUser() {
    API.graphql(graphqlOperation(queries.nests)).then((value) => {
      this.setState({ nests: value.data.nests });
      console.log("Nests are: ", value);
    });
  }

  handleNestSelect = () => {
    // Get selected index and nest name
    var nest = document.getElementById("nestName");
    // If index is 0, set disable to false and return (Choose... option)
    if (nest.selectedIndex === 0) {
      this.setState({ disableFields: false });
      return;
    }
    const nestName = nest.options[nest.selectedIndex].text;

    // Getting the nest from the array
    var getSelectedNest = this.state.nests.filter(function (obj) {
      return obj.name === nestName;
    })[0];

    this.setState({ selectedNest: getSelectedNest });

    // if (this.state.selectedNest.owner == this.state.loggedUser)
    //   this.setState({ disableFields: true });
    // else this.setState({ disableFields: false });

    //     for (var i = 0; i < this.state.nests.length; i++) {
    //   console.log("Current Nest: ", this.state.nests[i].name);
    //   console.log("Selected Nest: ", this.state.selectedNest);

    //   console.log("Nest Owner: ", this.state.nests[i].owner);
    //   console.log("Logged User: ", this.state.loggedUser);

    //   if (this.state.nests[i].name == this.state.selectedNest) {
    //     if (this.state.nests[i].owner == this.state.loggedUser) {
    //       this.setState({ disableFields: true });
    //       console.log("it should update fam");
    //       break;
    //     } else {
    //       this.setState({ disableFields: false });
    //       break;
    //     }
    //   }
    // }
    // const nestName = nest.options[nest.selectedIndex].;
    // this.setState({ selectedNest: nest.options[nest.selectedIndex].text });

    // console.log("Nest test: ", this.state.selectedNest);

    // this.state.selectedNest = nest.options[nest.selectedIndex].text;

    // for (var i = 0; i < this.state.nests.length; i++) {
    //   console.log("Current Nest: ", this.state.nests[i].name);
    //   console.log("Selected Nest: ", this.state.selectedNest);

    //   console.log("Nest Owner: ", this.state.nests[i].owner);
    //   console.log("Logged User: ", this.state.loggedUser);

    //   if (this.state.nests[i].name == this.state.selectedNest) {
    //     if (this.state.nests[i].owner == this.state.loggedUser) {
    //       this.setState({ disableFields: true });
    //       console.log("it should update fam");
    //       break;
    //     } else {
    //       this.setState({ disableFields: false });
    //       break;
    //     }
    //   }
    // }

    // if (this.state.selectedNest == "Choose...")
    //   this.setState({ disableFields: false });
  };
}

export default Team;
