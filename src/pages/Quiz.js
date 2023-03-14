import { addDoc, collection, getDocs, serverTimestamp} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';


import {  dbService } from '../firebaseConfig'

import styles from "../css/Quiz.module.css";
import Timer from '../components/Timer';
import { useQuizStore, useUserStore } from '../store';
import BarLoader from 'react-spinners/BarLoader';

const correctSound = new Audio(`${process.env.PUBLIC_URL}/sounds/correct.mp3`);
const wrongSound = new Audio(`${process.env.PUBLIC_URL}/sounds/wrong.mp3`);

const Quiz = () => {
	const [initQuiz, setInitQuiz] = useState([]); //퀴즈 데이터 불러오기
	const [quiz, setQuiz] = useState("");  //퀴즈
	const [userAnswer, setUserAnswer] = useState(""); 
	const [score, setScore] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	// const [result, setResult] = useState(null);
	// const [isPlaying, setIsPlaying] = useState(false);
	// const [isGameEnd, setIsGameEnd] = useState(false);
	// const [endTime, setEndTime] = useState("")
	
	const {user} = useUserStore();
	const {
		isPlaying , setIsPlaying,
		result, setResult,
		endTime, setEndTime,
		isGameEnd, setIsGameEnd,
	} = useQuizStore();



	const getAllQuiz = async () =>{
		try {
			setIsLoading(true)
			const getQuizDocs = await getDocs(collection(dbService, 'picturedb'));
			const quizArray = getQuizDocs.docs.map((doc) => doc.data())
			setInitQuiz(quizArray)
			setIsLoading(false)
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

	// 게임이 종료되면 종료시간과 랭킹점수를 업로드 예정s
	useEffect(() => {
		if(isGameEnd && score !== null){
			sendRanking()
		}
	}, [endTime]);


	const sendRanking = async() =>{
		if(user){
			const rankingData = {
				userNickname : user.displayName, 
				createdAt : serverTimestamp(), 
				score : score, 
				time : endTime
			}
			try{
				await addDoc(collection(dbService,"ranking"), rankingData);
			}catch(error){
				console.log(error)
			}
		}
	}	


	// 임시
	const formatTime = (time) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }


	return (
		<Container className='my-5 d-flex flex-column justify-content-center' >
			<div className={styles.flexCenter}>
				{isLoading ?
					<BarLoader 
						color={"#9ac9f7"}
						loading={isLoading}
						width={200}
						height={8}
						aria-label="Loading Spinner"
					/>
					:
				isPlaying ?
					(
					<>
						<Card key={quiz?.id} className={styles.cardWrapper}>
							{/* <Card.Title>zz</Card.Title> */}
							<div className={styles.pictureWrapper}>
								<Card.Img variant="top" src={quiz.picture} className={styles.picture}/>
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
						<Timer/>
						<p className='mt-2'> 남은문제 : {initQuiz.length} 개</p>
						{score === null ? "" : (<p>맞춘문제 총 : {score} 개</p>)}
					</>
					)
					:
					(
					<>
						{/* <FontAwesomeIcon icon={faSpinner} spin={true} /> */}
						<Button 
							type='button'  
							variant="outline-light"
							className={`${styles.startButton}`}
							onClick={StartGame}>
								게임 시작
						</Button>
					</>
					)
				}
				<p className='mt-2'><b>{result}</b></p>
			</div>
			{isGameEnd && 
				<>
					{score === null ? "" : (<p>맞춘문제 총 : {score} 개</p>)}
					<p>소요시간 :  {formatTime(endTime)}</p>
				</>
			}
		</Container>
	)
}

export default Quiz;