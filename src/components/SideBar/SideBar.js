import React, { Component } from 'react';

class SideBar extends Component {
  state = { 
    sidebarItems : [
      {
        id: 'CREATE_NEST',
        value: 'Create Nest'
      },
      {
        id: 'EDIT_NEST',
        value: 'Edit Nest'
      }
    ]
   }
  
  render() { 
    return ( 
      <React.Fragment>
        <h1>Sidebar Parent</h1>

      </React.Fragment>
     );
  }
}
 
export default SideBar;
