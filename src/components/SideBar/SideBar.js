import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { createBoardData } from "./SideBarConstant";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

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
            <Nav.Link onClick={() => this.props.showDialog(createBoardData)}>
              <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              New Boards
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="active nav-link">
            <Dropdown>
              <Dropdown.Toggle as={this.customToggle}>
                <div className="selectable-item">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  My Boards
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu align="right">
                {this.state.nests.map((nest, index) => (
                  <Dropdown.Item key={index} eventKey={index}>
                    <div>
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="mr-3"
                      />
                      {nest.name}
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </div>
    );
  }

  componentDidMount() {
    this.getNestsForUser();
  }

  getNestsForUser() {
    API.graphql(graphqlOperation(queries.nests)).then((value) => {
      if (value.data.nests) {
        const nests = value.data.nests.map((nest) => this.parseNest(nest));
        this.setState({ nests: nests });
      }
    });
  }

  handleClicked = (route) => {};

  parseNest(nest) {
    return { name: nest.name, nestId: nest.nestId };
  }
}

export default SideBar;
