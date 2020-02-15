import React from 'react';
import {currentUser} from '../Container/currentUser';
import Logo from './Logo/Logo'

const Header = ({user, onRouteChange}) => {
	
	return(
			<header>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<button className="f3 link dim black pa3 pointer" onClick={()=>onRouteChange('signin',true)}>Logout</button>
				</div>
				<div style={{display: 'flex', justifyContent: 'flex-start'}}>
					<h2 className="f3">Chatroom</h2>
					<Logo/>
				</div>
				
				<div>
					<currentUser.Consumer>
				      {(user) => (<p className="f3">Hello {user.username}!</p>)}
				    </currentUser.Consumer>
				</div>
				<hr/>
			</header>
		);

}

export default Header;