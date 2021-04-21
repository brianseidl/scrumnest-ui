import React, { Component } from "react";
import MemberCardItem from "./MemberCardItem";

class MemberCards extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div
          className={`row row-pending scroll ${
            this.props.disabled ? "disabled-field" : ""
          }`}
        >
          {this.props.cards.map((memberItem) => (
            <div key={memberItem.username} className="col-md-4-pending mb-2">
              <MemberCardItem
                memberItem={memberItem}
                onClicked={this.props.handleDialogEvent}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MemberCards;
