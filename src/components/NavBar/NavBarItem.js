import React from "react";

const NavBarItem = ({ navBarItem, onClicked }) => {
  return (
    <React.Fragment>
      <i
        className={navBarItem.icon}
        style={{ fontSize: "40px" }}
        onClick={() => onClicked(navBarItem)}
      ></i>
    </React.Fragment>
  );
};

export default NavBarItem;
