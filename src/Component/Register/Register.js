import React from 'react';

class Register extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}

	onUsernameChange = (event) => {

		this.setState({username: event.target.value})

	}

	onPasswordChange = (event) => {

		this.setState({password: event.target.value})

	}

	onSubmitRegister = () => {

		const {username, password} = this.state;

		if(username.length && password.length){

			fetch('https://young-hamlet-13499.herokuapp.com/register',{
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					username:username,
					password:password
				})
			})
			.then(response=>response.json())
			.then(user=>{
				if(user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}else{
					//Show Invalid login error message
					document.getElementById('usernameExist').classList.remove("hide");
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
			  	<h3>Register</h3>
			    <label htmlFor="username"><b>Username</b></label>
			    <input type="text" placeholder="Enter Username" name="username" onChange={this.onUsernameChange} required/>

			    <label htmlFor="password"><b>Password</b></label>
			    <input type="password" placeholder="Enter Password" name="password" onChange={this.onPasswordChange} required/>

			    <button onClick={this.onSubmitRegister} type="submit">Register</button>
			    <button onClick={()=>{onRouteChange('signin',true)}} type="button">Go to Login</button>
			    <p id="usernameExist" className="error hide">Username already exists</p>
			    <p id="emptyFieldsError" className="error hide">Username/Password cannot be empty</p>
			</div>

		);
	}
}

export default Register;