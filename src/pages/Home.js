import { collection, getDocs} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { authService, dbService } from '../firebaseConfig'
import styles from "../css/Home.module.css";
import Timer from '../components/Timer';

const correctSound = new Audio(`${process.env.PUBLIC_URL}/sounds/correct.mp3`);
const wrongSound = new Audio(`${process.env.PUBLIC_URL}/sounds/wrong.mp3`);

const Home = ({isLoggedIn}) => {
	const [initQuiz, setInitQuiz] = useState([]); //퀴즈 데이터 불러오기
	const [quiz, setQuiz] = useState("");  //퀴즈
	const [userAnswer, setUserAnswer] = useState(""); 
	const [result, setResult] = useState(null);
	const [score, setScore] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const [endTime, setEndTime] = useState(0);


	const getAllQuiz = async () =>{
		try {
			const initQuiz = await getDocs(collection(dbService, 'picturedb'));
			const quizArray = initQuiz.docs.map((doc) => doc.data())
			setInitQuiz(quizArray)
			// console.log("퀴즈 불러오기 완료")
		}catch (error) {
			console.log('에러', error);
		}
	};
		
	const randomValue = (array) =>{
		const random = Math.floor(Math.random() * array.length)
		return array[random]
	}
	const nextQuiz = useCallback(() => {
		if (initQuiz.length > 0) {
			// console.log("퀴즈 준비")
			// console.log("생성된것: ", initQuiz)
			setQuiz(randomValue(initQuiz))
		}
	}, [initQuiz]);

	const handleAnswerChange = useCallback((e) => {
		const {target : {value}} = e
        setUserAnswer(value)
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (quiz.answer === userAnswer) {
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
		setUserAnswer("");
	};

	const StartGame = () =>{
		setIsPlaying(true)
		setScore(0)
		setResult("")
		if (setIsPlaying && !initQuiz.length) {
			getAllQuiz();
		}
	}

	const onTimeStop = (time) =>{
		setEndTime(time)
	}

	useEffect(() => {
		if (initQuiz.length) {
			nextQuiz();
		}else {
			setIsPlaying(false);
			setResult("게임 시작을 눌러주세요!");
		}
	}, [initQuiz, nextQuiz]);

	return (
		<div className={styles.container}>
			{/* {isLoggedIn	? null : <LoginForm/>} */}
			{isPlaying ? 
				(
				<div className={styles.flexCenter}>
					
					<Card key={quiz.id} style={{ width: '24rem' }} >
						<Card.Title>{quiz.answer}</Card.Title>
						<div className={styles.pictureWrapper}>
							<Card.Img variant="top" src={quiz.picture} className={styles.picture}></Card.Img>
						</div>
						<Card.Body>
							<Form onSubmit={handleSubmit}>
								<Form.Control 
									size="lg" 
									type="text"
									value={userAnswer} 
									onChange={handleAnswerChange}
									/>
							</Form>
						</Card.Body>
					</Card>
					<p> 남은문제 : {initQuiz.length} 개</p>
				</div>
				)
				:
				<>
					<button className={styles.startButton} type='button' onClick={StartGame}>시작하기</button>
				</>
			}
			<p style={{marginTop : '30px'}}>{result}</p>
			{score === 0 ? "" : (<p>맞춘문제 총 : {score} 개</p>)}
			<Timer isPlaying={isPlaying} onTimeStop={onTimeStop}/>
			{/* <p>소요시간 :  {endTime}</p> */}
		</div>
	)
	
}

export default Home