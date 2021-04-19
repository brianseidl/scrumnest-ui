import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { permissionData } from "../../pages/Team/TeamPageConstants";

const MemberCardItem = ({ memberItem, onClicked }) => {
  return (
    <React.Fragment>
      <div className="card-pending h-30">
        <FontAwesomeIcon icon={faUser} className="mr-2 fa-2x" />
        <p className="member-name-text">{memberItem.name}</p>

        <button
          type="button"
          class="close float-right"
          aria-label="Close"
          display="inline-block"
          onClick={() => onClicked(memberItem)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default MemberCardItem;
