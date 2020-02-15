import React from 'react';
import './Chatbox.css';
import {currentUser} from '../Container/currentUser';

class Chatbox extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			message: ''
		}
	}

	onMessageChange = (event) => {
		
		this.setState({message: event.target.value});
	}

	onSendMessage = (id) => {

		const {message} = this.state;

		if(!message.length){
			return;
		}

		fetch('https://young-hamlet-13499.herokuapp.com/message',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				id:id,
				message:message
			})
		})
		.then(response=>response.json())
		.then(message=>{
			if(message.id){
				
				//add the message to the top of the messages list
				this.props.onFetchMessages();
		
			}
		})

		this.setState({ message: '' });

	}

	render(){

		return(
			<div id="chatbox" className="pa4" >
				
				<textarea className="shadow-5 w-100" onChange={this.onMessageChange} value={this.state.message}></textarea>
				<div className="v-mid tc ph3 ph4-l w-100 "> 
					<currentUser.Consumer>
				      {(user) => (
				      	<button className="f5 ma4 pa3" onClick={()=>this.onSendMessage(user.id)} type="submit">Send</button>
				      )}
				    </currentUser.Consumer>
				</div>
			</div>
		);

	}
}

export default Chatbox;