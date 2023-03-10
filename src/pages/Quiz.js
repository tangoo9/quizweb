import { collection, getDocs} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { authService, dbService } from '../firebaseConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

import styles from "../css/Quiz.module.css";
import Timer from '../components/Timer';
import { useRef } from 'react';

const correctSound = new Audio(`${process.env.PUBLIC_URL}/sounds/correct.mp3`);
const wrongSound = new Audio(`${process.env.PUBLIC_URL}/sounds/wrong.mp3`);

const Quiz = () => {
	const [initQuiz, setInitQuiz] = useState([]); //퀴즈 데이터 불러오기
	const [quiz, setQuiz] = useState("");  //퀴즈
	const [userAnswer, setUserAnswer] = useState(""); 
	const [result, setResult] = useState(null);
	const [score, setScore] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isGameEnd, setIsGameEnd] = useState(false);
	const [endTime, setEndTime] = useState("")
	const endTimeRef = useRef(0);


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
	// 다음 퀴즈 필터링
	const checkAnswer = () => {
		const filtering = initQuiz.filter(data => data.answer !== quiz.answer)
		setInitQuiz(filtering)
	}

	const nextQuiz = useCallback(() => {
		if (initQuiz.length > 0) {
			// console.log("퀴즈 준비")
			// console.log("생성된것: ", initQuiz)
			setQuiz(randomValue(initQuiz))
		}
	}, [initQuiz]);

	const onTimeStop = (time) =>{
		setEndTime(time)
	}

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
			checkAnswer()
			nextQuiz();
			correctSound.play()
		} else {
			// 오답
			setResult(`땡! 정답은 "${quiz.answer}" 입니다.`);
			checkAnswer()
			nextQuiz();
			wrongSound.play();
		}
		setUserAnswer("");
		if (initQuiz.length <= 1) {
			setIsGameEnd(true);
			setEndTime(endTimeRef.current)
		}
	};

	const StartGame = () =>{
		setIsPlaying(true)	
		setIsGameEnd(false)
		setScore(0)
		setResult("")
		if (!initQuiz.length) {
			getAllQuiz();
		}
	}

	useEffect(() => {
		if (initQuiz.length){
			nextQuiz();
		}else {
			setIsPlaying(false);
			setResult("게임 시작을 눌러주세요!");
		}
	}, [initQuiz, nextQuiz]);

	// 게임이 종료되면 종료시간과 랭킹점수를 업로드 예정
	useEffect(() => {
		if(isGameEnd){
			console.log("게임 종료시간입니다.", endTime)
			console.log("게임 종료", isGameEnd)
		}
	}, [isGameEnd, endTime]);

	// 임시
	const formatTime = (time) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

	return (
		<Container className='my-3 d-flex flex-column justify-content-center'>
			{isPlaying ? 
				(
				<div className={styles.flexCenter}>
					<Card key={quiz?.id} style={{ width: '20rem' }} >
						{/* <Card.Title>{quiz.answer}</Card.Title> */}
						<div className={styles.pictureWrapper}>
							<Card.Img variant="top" src={quiz.picture} className={styles.picture}></Card.Img>
						</div>
						<Card.Body>
							<Form onSubmit={handleSubmit} >
								<Form.Control 
									style={{ textAlign: "center" }} 
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
				(
				<>
					{/* <FontAwesomeIcon icon={faSpinner} spin={true} /> */}
					<Button 
						type='button'  
						variant="outline-light"
						className={`${styles.startButton} my-3`}
						onClick={StartGame}>
							게임 시작
					</Button>
				</>
				)
			}
			<p style={{marginTop : '30px'}}>{result}</p>
			{score === null ? "" : (<p>맞춘문제 총 : {score} 개</p>)}
			<Timer isPlaying={isPlaying} onTimeStop={onTimeStop} endTimeRef={endTimeRef} isGameEnd={isGameEnd}/>
			{/* {isGameEnd && <p>소요시간 :  {formatTime(endTime)}</p>} */}
		</Container>
	)
}

export default Quiz;