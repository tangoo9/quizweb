import './App.css';
import AppRouter from './components/Router';
import { authService } from './firebaseConfig';
import React, { useEffect, useState } from 'react'; 
import { onAuthStateChanged } from 'firebase/auth';



function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);


	useEffect(()=>{
		const auth = authService;
		onAuthStateChanged(auth, (user)=>{
			if(user){
				setUser(user)
			}else{
				setUser(null)
			}
		})
		// console.log(auth)
		// console.log(authService.currentUser)
		// setInterval(()=>{
		// 	console.log(authService.currentUser)
		// },2000)
	},[])
	return (
		<div className="App">
			{/* <div className="box vibration"></div> */}
			<AppRouter isLoggedIn={user ? true : false} user={user}/>
			<footer className="footer">&copy; PictureQuiz {new Date().getFullYear()}</footer> 
			{/* <Home/> */}
		</div>
	);
}

export default App;
