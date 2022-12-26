import './App.css';
import LoginForm from './components/LoginForm';
import QuizCard from './components/QuizCard';
import QuizInput from './components/QuizInput';
import ResultChart from './components/ResultChart';
import TopNavbar from './components/TopNavbar';

function App() {
	return (
		<div className="App">
			{/* <div className="box vibration"></div> */}
				<TopNavbar/>
				<QuizCard/>
				<LoginForm/>
				<QuizInput/>
				<ResultChart/>
		</div>
	);
}

export default App;
