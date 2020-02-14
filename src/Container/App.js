import React from 'react';
import './App.css';
import {currentUser} from './currentUser'
import Header from '../Component/Header';
import Chatbox from '../Component/Chatbox';
import Messages from '../Component/Messages';
import Scroll from '../Component/Scroll';
import Signin from '../Component/Signin/Signin';
import Register from '../Component/Register/Register';

class App extends React.Component{

	constructor(){
		super();
		this.state = {
			route : 'signin',
			user: {
				id: '',
				username: ''
			},
			messages: {},
			likes: {}
		}
	}

	isRoute = (route) => {
		return this.state.route === route ? true : false;
	}

	onRouteChange = (route, flag) =>{
		this.setState({route: route});
		if(!flag){this.fetchMessages();}
	}

	loadUser = (data) => {
		this.setState({user:{
			id: data.id,
			username: data.username
		}});
	}

	fetchLikes = () => {

		const id = (this.state.user.id === "" ? JSON.parse(localStorage.getItem("user")).id : this.state.user.id);
		const url = 'https://young-hamlet-13499.herokuapp.com/messages-liked/'+id;
		
		fetch(url,{
			method: 'get',
			headers: {'Content-Type':'application/json'}
		})
		.then(response=>response.json())
		.then(likes=>{
			this.setState({likes: likes});
		})

		
	}

	fetchMessages = () => {
			
			fetch('https://young-hamlet-13499.herokuapp.com/messages',{
				method: 'get',
			})
			.then(response=>response.json())
			.then(messages=>{
				this.setState({messages: messages});
			})
			this.fetchLikes();
	}

	componentWillUnmount() {
	    window.removeEventListener(
	      "beforeunload",
	      this.saveStateToLocalStorage.bind(this)
	    );

	    // saves if component has a chance to unmount
	    this.saveStateToLocalStorage();
	}

	componentDidMount(){

		this.hydrateStateWithLocalStorage();

		if (localStorage.hasOwnProperty("user")){
				this.fetchMessages();
		}

	    // add event listener to save state to localStorage
	    // when user leaves/refreshes the page
	    window.addEventListener(
	      "beforeunload",
	      this.saveStateToLocalStorage.bind(this)
	    );

	}

	saveStateToLocalStorage() {
	  // for every item in React state
	  for (let key in this.state) {
	    // save to localStorage
	    localStorage.setItem(key, JSON.stringify(this.state[key]));
	  }
	}


	hydrateStateWithLocalStorage() {
	    // for all items in state
	    for (let key in this.state) {
	      // if the key exists in localStorage
	      if (localStorage.hasOwnProperty(key)) {
	        // get the key's value from localStorage
	        let value = localStorage.getItem(key);

	        // parse the localStorage string and setState
	        try {
	          value = JSON.parse(value);
	          this.setState({ [key]: value });
	        } catch (e) {
	          // handle empty string
	          this.setState({ [key]: value });
	        }
	      }
	    }
	  }


  	render(){

  		const {route, user, messages, likes} = this.state;

	    return(<>
	    	{route === 'home' 
	    		? 

	    		<currentUser.Provider value={user}>
			      	<Header onRouteChange={this.onRouteChange} />
			      	<Chatbox onFetchMessages={this.fetchMessages}/>
			      	<Scroll>
			      		<Messages messages={messages} likes={likes}/>
			      	</Scroll>
			    </currentUser.Provider> 

		      	:<>
		      	{route === 'signin'
		      	? 
		      		<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
		      	:
		      		<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
		      	}</>
		      		
		    }</>
	    );
  	}

}

export default App;