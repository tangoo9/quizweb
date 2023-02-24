import './App.css';
import TopNavbar from './components/TopNavbar'
import AppRouter from './components/Router';
import { authService } from './firebaseConfig';


function App() {
	console.log(authService.currentUser)

	
	return (
		<div className="App">
			{/* <div className="box vibration"></div> */}
			<TopNavbar/>
			<AppRouter/>
				{/* <Home/> */}
		</div>
	);
}

export default App;
