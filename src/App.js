import './App.css';
import AppRouter from './components/Router';
import { authService } from './firebaseConfig';
import React, { useEffect, useState } from 'react'; 
import { onAuthStateChanged } from 'firebase/auth';
import {useUserStore} from './store'


function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const {user, setUser} = useUserStore();


	useEffect(()=>{
		onAuthStateChanged(authService, (user)=>{
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
			<AppRouter isLoggedIn={user ? true : false}/>
			<footer className="footer">&copy; PictureQuiz {new Date().getFullYear()}<div>최신업데이트 : 03-14 18:28 </div></footer> 
			{/* <Home/> */}
		</div>
	);
}

export default App;
