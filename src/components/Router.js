import React from 'react'
import { HashRouter, Route, Routes,} from 'react-router-dom'
import Page404 from '../pages/404'
import Home from '../pages/Home'
import AddQuiz from '../pages/AddQuiz'
import Quiz from '../pages/Quiz'
import Ranking from '../pages/Ranking'
import TopNavbar from './TopNavbar'
import AppLayout from '../components/AppLayout'



const AppRouter = ({isLoggedIn}) => {

	return (
		<>
		{/* <BrouserRouter basename={process.env.PUBLIC_URL}/> */}
		<HashRouter >
			<TopNavbar isLoggedIn={isLoggedIn} />
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
					<Route path="/Quiz" element={<Quiz />} />
					<Route path="/Ranking" element={<Ranking/>} />
					<Route path="/AddQuiz" element={<AddQuiz/>} />
					<Route path="/*" element={<Page404 />} />
				</Routes>
			</AppLayout>
		</HashRouter>
	</>
	)
}

export default AppRouter