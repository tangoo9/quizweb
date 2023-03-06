import { collection, getDocs} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { authService, dbService } from '../firebaseConfig'
import styles from "../css/Home.module.css";

const correctSound = new Audio("../sounds/correct.mp3");
const wrongSound = new Audio("../sounds/wrong.mp3");

const Home = ({isLoggedIn}) => {
	const [initQuiz, setInitQuiz] = useState([]); //퀴즈 데이터 불러오기
	const [quiz, setQuiz] = useState("");  //퀴즈
	const [answer, setAnswer] = useState(""); 
	const [result, setResult] = useState("");
	const [score, setScore] = useState(0);
	const [play, setPlay] = useState(false);

	const navigate = useNavigate()
    const onLogOut = ()=>{  
        authService.signOut();
        navigate('/', {replace : true})
    }

	const StartGame = () =>{
		setPlay(true)
	}

	const randomValue = (array) =>{
		const random = Math.floor(Math.random() * array.length)
		return array[random]
	}

	const getInitQuiz = async () =>{
		try {
			const initQuiz = await getDocs(collection(dbService, 'picturedb'));
			const quizArray = initQuiz.docs.map((doc) => doc.data())
			setInitQuiz(quizArray)
			console.log("퀴즈 불러오기 완료")
		}catch (error) {
			console.log('에러', error);
		}
	};


	const nextQuiz = useCallback(() => {
		if (initQuiz.length > 0) {
			console.log("퀴즈 준비")
			console.log("생성된것: ", initQuiz)
			setQuiz(randomValue(initQuiz))
		}
	}, [initQuiz]);

	const handleAnswerChange = useCallback((e) => {
		const {target : {value}} = e
        setAnswer(value)
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (quiz.answer === answer) {
			// 정답
			setResult(`정답입니다!`);
			setScore(score + 1);
			correctSound.play()

			// 다음 퀴즈 필터링
			const filtering = initQuiz.filter(data => data.answer !== quiz.answer)
			setInitQuiz(filtering)
			nextQuiz();
		} else {
			// 오답
			setResult(`땡! 정답은 "${quiz.answer}" 입니다.`);
			wrongSound.play();
		}
		setAnswer("");
	};

	useEffect(() => {
		if (!initQuiz.length) {
			getInitQuiz();
		} else if (initQuiz.length === 1) {
			setInitQuiz([]);
			setPlay(false);
			setScore(0)
			setResult("게임이 종료되었습니다.");
		} else {
			nextQuiz();
		}
	}, [initQuiz, nextQuiz]);

	return (
		<div className={styles.container}>
			{isLoggedIn 
			?  
			<Button 
			type="button"
			onClick={onLogOut}
			>Log Out</Button>
			:
			<LoginForm/>
			}
			{play 
				? (
					<div className={styles.flexCenter}>
					<div className={styles["quiz-grid"]}>
						{quiz?.answer && (
							<div key={quiz.id}>
							{quiz.answer}
							{quiz.picture && (
								<div className={styles.pictureWrapper}>
									<img className={styles.picture} src={quiz.picture} alt="" />
								</div>
							)}
							</div>
						)}
					</div>
						<form onSubmit={handleSubmit}>
							<input 
								className={styles.quizInput}
								type="text" 
								value={answer} 
								onChange={handleAnswerChange}
								/>
						</form>
						{score === 0 ?  "" : (<div>score : {score}</div>)}
				</div>
				)
				:
				<>
					<button className={styles.startButton} type='button' onClick={StartGame}>시작하기</button>
				</>
			}
			<div>{result}</div>
		</div>
	)
}

export default Home