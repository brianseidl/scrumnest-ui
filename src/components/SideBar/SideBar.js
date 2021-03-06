import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { withRouter } from "react-router-dom";
import { showCreateNestDialog } from "../../components/Dialogs/service/DialogService";

class SideBar extends Component {
  state = {
    nests: [],
  };

  customToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <br />
        <div className="profile-view">
          <Dropdown>
            <Dropdown.Toggle as={this.customToggle}>
              <FontAwesomeIcon
                className="selectable-item"
                icon={faUserCircle}
                size="8x"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" className="align-items-center">
              {/* For now, comment the settings drop down until we have a set plan for it going forward */}
              {/* <Dropdown.Item className="align-items-center m-1" eventKey="1">
                <i className={'fa fa-cog mr-3'}></i>Settings
              </Dropdown.Item> */}
              <Dropdown.Item eventKey="2" className="m-1 align-items-center">
                <i className={"fa fa-sign-out"}></i>
                <AmplifySignOut />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Nav className="flex-column pt-2">
          <Nav.Item className="active">
            <Nav.Link onClick={this.handleCreateNest}>
              <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              Create Nest
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="active">
            <Nav.Link href="/nests">
              <div className="selectable-item">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                My Nests
              </div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }

  handleCreateNest = () => {
    showCreateNestDialog().then((response) => {
      if (response && response.createdNest) {
        this.props.history.push(`/nests/${response.nestId}`);
      }
    });
  };
}

export default withRouter(SideBar);
