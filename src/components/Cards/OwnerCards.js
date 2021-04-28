import React, { Component } from "react";
import OwnerCardItem from "./OwnerCardItem";

class OwnerCards extends Component {
  state = {};

  constructor(props) {
    super(props);
    console.log("Props are: ", props);
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={`row row-pending scroll ${
            this.props.disabled ? "disabled-field" : ""
          }`}
        >
          <div className="col-md-4-pending mb-2">
            <OwnerCardItem ownerItem={this.props.cards} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OwnerCards;
