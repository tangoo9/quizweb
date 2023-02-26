import React from 'react'
import { BrowserRouter , Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { authService } from '../firebaseConfig'
import Page404 from '../pages/404'
import Home from '../pages/Home'
import LogIn from '../pages/Login'
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import Ranking from '../pages/Ranking'
import TopNavbar from './TopNavbar'

const AppRouter = ({isLoggedIn}) => {


	return (
		<>
			<BrowserRouter>
			<TopNavbar isLoggedIn={isLoggedIn}/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/Quiz" element={<Quiz/>}/>
					<Route path="/Ranking" element={<Ranking/>}/>
					{isLoggedIn 
						? 
						<>
							<Route path="/Profile" element={<Profile/>}/>
						</>
						:
						<>
							<Route path="/Login" element={<LogIn/>} />
						</>
					}
					<Route path="/*" element={<Page404/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default AppRouter