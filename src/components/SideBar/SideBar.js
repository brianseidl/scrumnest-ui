import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { createBoardData } from "./SideBarConstant";

class SideBar extends Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="profile-view">
          <Button variant="link" style={{ color: "#fff" }} className="mt-4">
            <FontAwesomeIcon icon={faUserCircle} size="8x" />
          </Button>
        </div>

        <Nav className="flex-column pt-2">
          <Nav.Item className="active">
            <Nav.Link onClick={() => this.props.showDialog(createBoardData)}>
              <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              New Boards
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link>
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              My Boards
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
  handleClicked = (route) => {};
}

export default SideBar;
