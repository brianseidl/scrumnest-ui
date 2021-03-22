import React, { Component } from 'react';
import NavBarItem from './NavBarItem';
import './nav.css';

class NavBar extends Component {
    
	state = { 
		navBarItems: [
			{
				id: 1,
				route: '/teams',
				icon: 'fa fa-users',
				displayDialogComponent: null, 
			},
			{
				id: 2,
				route: null,
				icon: 'fa fa-bars',
				displayDialogComponent: null,
			},
			{
				id: 3,
				route: '/',
				icon: 'fa fa-home',
				displayDialogComponent: null,
			}
		]
	}
    
	render() { 
		return ( 
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="navbar-brand navbar-text pagination-centered text-center">Scrum Nest</div>
					<ul className="navbar-nav">
						{this.state.navBarItems.map(navBarItem => (
							<li key={navBarItem.id + '-list'} className='nav-item px-3'>
								<NavBarItem
									key={navBarItem.id}
									navBarItem={navBarItem}
									onClicked={this.handleClicked}
								/>
							</li>
						))}
					</ul>
				</div>
			</nav>
			
		);
	}

	handleClicked = (route) => {

	}
}


 
export default NavBar;