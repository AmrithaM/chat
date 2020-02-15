import React from 'react';
import './ChatBubble.css';

class ChatBubble extends React.Component{

	Constructor(props){
		this.super(props);
	}

	likeMessage = (event) => {

		//UI changes
		const parent = event.target.parentNode;
		parent.querySelector("span").classList.remove("hide");
		parent.querySelector("button").classList.add("hide");

		const message_id = event.target.getAttribute("id");

		//Update DB
		fetch('https://young-hamlet-13499.herokuapp.com/message-like',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				uid:this.props.user_id,
				mid:message_id
			})
		});
		// .then(response=>response.json())
		// .then(result=>{
		// 	console.log(result);
		// })
	}

	 getDateTime = (now) => {
        
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        
        if(month.toString().length === 1) {
             month = '0'+month;
        }
        if(day.toString().length === 1) {
             day = '0'+day;
        }   
        if(hour.toString().length === 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length === 1) {
             minute = '0'+minute;
        }
          
        return (year+'-'+month+'-'+day+' '+hour+':'+minute);   
    }

	render(){
		
		const {message_user_id, message_id, user_id, name, message, timestamp, like} = this.props;

		return(

				<div className={message_user_id===user_id?"senderMessage center shadow-5 w-80 pa1 pl3":"shadow-5 center w-80 pa1 pl3"}>

					<h4 className="ttu">{name}:</h4>
					<p>{message}</p>
					<span>{this.getDateTime(new Date(timestamp))}</span>
					<div style={{display: 'flex', justifyContent: 'flex-end'}}>
	
						<span role="img" aria-label="like" className={like?"tc f1":"hide f1 tc"}> 👍 </span>
						<button id={message_id} className={!like?"pa3":" pa3 hide"} onClick={this.likeMessage}>Like</button>
						
					</div>
				</div>
			
		);
	}
}

export default ChatBubble;