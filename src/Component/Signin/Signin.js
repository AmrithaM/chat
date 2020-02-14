import React from 'react';

class Signin extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			signInUsername: '',
			signInPassword: ''
		}
	}

	onUsernameChange = (event) => {

		this.setState({signInUsername: event.target.value})

	}

	onPasswordChange = (event) => {

		this.setState({signInPassword: event.target.value})

	}

	onSubmitSignIn = () => {
		
		const {signInUsername, signInPassword} = this.state;

		if(signInUsername.length && signInPassword.length){
			fetch('https://young-hamlet-13499.herokuapp.com/signin',{
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					username:signInUsername,
					password:signInPassword
				})
			})
			.then(response=>response.json())
			.then(user=>{
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}else{
					//Show Invalid login error message 
					document.getElementById('invalidCredentials').classList.remove("hide");
				}
			})
		}else{
			document.getElementById('emptyFieldsError').classList.remove("hide");	
		}
	}
	
	render(){

		const {onRouteChange} = this.props;

		return(
		<div>
		  	<h3>Sign In</h3>
		    <label htmlFor="username"><b>Username</b></label>
		    <input type="text" placeholder="Enter Username" name="username" onChange={this.onUsernameChange} required/>

		    <label htmlFor="password"><b>Password</b></label>
		    <input type="password" placeholder="Enter Password" name="password" onChange={this.onPasswordChange} required/>

		    <button onClick={this.onSubmitSignIn} type="submit">Login</button>
		    <button onClick={()=>onRouteChange('register',true)} type="button">Register</button>
		    <p id="invalidCredentials" className="error hide">Invalid login credentials</p>
		    <p id="emptyFieldsError" className="error hide">Username/Password cannot be empty</p>
		</div>

	);
	}
}

export default Signin;