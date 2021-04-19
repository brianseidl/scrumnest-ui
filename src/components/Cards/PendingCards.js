import React, { Component } from "react";
import PendingCardItem from "./PendingCardItem";

class PendingCards extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div
          className={`row row-pending scroll ${
            this.props.disabled ? "disabled-field" : ""
          }`}
        >
          {this.props.cards.map((pendingItem) => (
            <div key={pendingItem.name} className="col-md-4-pending mb-2">
              <PendingCardItem
                pendingItem={pendingItem}
                onClicked={this.props.handleDialogEvent}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PendingCards;
