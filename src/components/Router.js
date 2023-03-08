import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes,} from 'react-router-dom'
import { authService } from '../firebaseConfig'
import Page404 from '../pages/404'
import Home from '../pages/Home'
import AddQuiz from '../pages/AddQuiz'
import Quiz from '../pages/Quiz'
import Ranking from '../pages/Ranking'
import TopNavbar from './TopNavbar'
import Invoices from '../pages/invoice'
import Invoice from '../pages/invoices'
import AppLayout from '../components/AppLayout'


import QuizTest from '../pages/Quiz copy'

const AppRouter = ({isLoggedIn ,user}) => (
	<>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			{/* {isLoggedIn && <TopNavbar isLoggedIn={isLoggedIn} user={user}/>} */}
			<TopNavbar isLoggedIn={isLoggedIn} user={user} />
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
					<Route path="/Quiz" element={<Quiz />} />
					<Route path="/Quiztest" element={<QuizTest />} />
					<Route path="/Ranking" element={<Ranking />} />
					<Route path="/AddQuiz" element={<AddQuiz user={user} />} />
					<Route path="/Invoices" element={<Invoices />}>
						<Route path=":invoiceId" element={<Invoice />} />
					</Route>
					<Route path="/*" element={<Page404 />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	</>
)

export default AppRouter