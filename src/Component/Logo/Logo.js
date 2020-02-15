import React from 'react';
import Tilt from 'react-tilt';

const Logo = () => {

	return(
		<div className='ma4 tc v-mid mt0 shadow-5 flex items-center Tilt'>
			<Tilt className="Tilt dt" options={{ max : 55 }} style={{ height: 50, width: 50 }} >
				<span role="img" aria-label="chat" className="dtc v-mid Tilt-inner tc"> 💬 </span>
			</Tilt>
		</div>
	);
}

export default Logo;


 
