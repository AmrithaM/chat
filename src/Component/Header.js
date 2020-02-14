import React from 'react';
import {currentUser} from '../Container/currentUser';

const Header = ({user, onRouteChange}) => {
	
	return(
			<header>
				<h2>Chatroom</h2>
				<div>
					<currentUser.Consumer>
				      {(user) => (<p>Hello {user.username}!</p>)}
				    </currentUser.Consumer>
					<button onClick={()=>onRouteChange('signin',true)}>Logout</button>
				</div>
				<hr/>
			</header>
		);

}

export default Header;