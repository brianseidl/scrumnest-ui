import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const OwnerCardItem = ({ ownerItem }) => {
  return (
    <React.Fragment>
      {ownerItem && (
        <div className="card-pending h-30">
          <FontAwesomeIcon icon={faUserCircle} className="mr-2 fa-2x" />
          <p className="member-name-text">{ownerItem}</p>
        </div>
      )}
      {!ownerItem && <div className="spacing mb-4"> </div>}
    </React.Fragment>
  );
};

export default OwnerCardItem;
