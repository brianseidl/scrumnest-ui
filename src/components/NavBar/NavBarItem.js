import React from "react";

const NavBarItem = ({ navBarItem }) => {
  return (
    <React.Fragment>
      <i className={navBarItem.icon} style={{ fontSize: "40px" }}></i>
    </React.Fragment>
  );
};

export default NavBarItem;
