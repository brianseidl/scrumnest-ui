import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class Layout extends Component {
  
  state = {  }
  render() { 
    return ( 
      // TODO: Add Sidebar component
      <React.Fragment>
        <div>
          <NavBar />
        </div>
      </React.Fragment>
     );
  }
}
 
export default Layout;