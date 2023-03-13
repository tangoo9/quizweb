import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes,} from 'react-router-dom'
import { authService } from '../firebaseConfig'
import Page404 from '../pages/404'
import Home from '../pages/Home'
import AddQuiz from '../pages/AddQuiz'
import Quiz from '../pages/Quiz'
import Ranking from '../pages/Ranking'
import TopNavbar from './TopNavbar'
import AppLayout from '../components/AppLayout'


import ZustandTest from '../pages/ZustandTest'
import {useUserStore} from '../store'


const AppRouter = ({isLoggedIn}) => {
	const {user, setUser} = useUserStore();

	return (
		<>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			{/* {isLoggedIn && <TopNavbar isLoggedIn={isLoggedIn} user={user}/>} */}
			<TopNavbar isLoggedIn={isLoggedIn} user={user} />
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
					<Route path="/Quiz" element={<Quiz />} />
					<Route path="/ZustandTest" element={<ZustandTest />} />
					<Route path="/Ranking" element={<Ranking/>} />
					<Route path="/AddQuiz" element={<AddQuiz/>} />
					<Route path="/*" element={<Page404 />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	</>
	)
}

export default AppRouter