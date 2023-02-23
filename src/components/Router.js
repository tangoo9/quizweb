import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LogIn from '../pages/Login'
import Ranking from '../pages/Ranking'

const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}></Route>
					<Route path="/Ranking" element={<Ranking/>}></Route>
					<Route path="/Login" element={<LogIn/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default AppRouter