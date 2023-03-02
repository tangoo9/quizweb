import React from 'react'
import { BrowserRouter, Route, Routes,} from 'react-router-dom'
import { authService } from '../firebaseConfig'
import Page404 from '../pages/404'
import Home from '../pages/Home'
import LogIn from '../pages/Login'
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import Ranking from '../pages/Ranking'
import TopNavbar from './TopNavbar'
import Invoices from '../pages/invoice'
import Invoice from '../pages/invoices'

const AppRouter = ({isLoggedIn ,user}) => {
	console.log('라우터 ', user)

	return (
		<>
			<BrowserRouter>
				{/* {isLoggedIn && <TopNavbar isLoggedIn={isLoggedIn} user={user}/>} */}
				<TopNavbar isLoggedIn={isLoggedIn} user={user}/>
				<Routes>
					<Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}>
						<Route path="/Quiz" element={<Quiz/>}/>
						<Route path="/Ranking" element={<Ranking/>}/>
						{isLoggedIn 
							? 
							<>
								<Route path="/Profile" user={user} element={<Profile/>}/>
							</>
							:
							<>
								<Route path="/Login" element={<LogIn/>} />
							</>
						}
					</Route>
					<Route path="/Invoices" element={<Invoices/>}>
						<Route path=":invoiceId" element={<Invoice />} />
					</Route>

					<Route path="/*" element={<Page404/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default AppRouter