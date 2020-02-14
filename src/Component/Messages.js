import React from 'react';
import ChatBubble from './ChatBubble';
import {currentUser} from '../Container/currentUser';

class Messages extends React.Component{	

	render(){

		const {messages, likes} = this.props;

		const likeArray = Object.keys(likes).map(function(key) {
		  return likes[key].message_id;
		});

		if(messages.length){

			const messageArray = messages.map((message, index) => {

				return (
					<currentUser.Consumer>
      					
      					{(user) => (
      						<ChatBubble 
								key={message.id} 
								message_id={message.id}
								message_user_id={message.user_id}
								user_id={user.id}
								name={message.username} 
								message={message.message}
								timestamp={message.timestamp}
								like={likeArray.includes(message.id)?true:false}
							/>
      					)}
    
						
					</currentUser.Consumer>
				);
			})

			return(
				<div id="messageContainer">
					{messageArray}	
				</div>
			);

		}
		else{
			return(<></>);
		}

	}
}

export default Messages;