import React from "react";

const PendingCardItem = ({ pendingItem, onClicked }) => {
  return (
    <React.Fragment>
      <div className="card-pending h-30">
        <p className="name-text">{pendingItem.name}</p>
        <button
          type="button"
          class="close float-right"
          aria-label="Close"
          display="inline-block"
          onClick={() => onClicked(pendingItem)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default PendingCardItem;
