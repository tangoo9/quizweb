import { collection, getDocs} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { authService, dbService } from '../firebaseConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSpinner} from '@fortawesome/free-solid-svg-icons';


import styles from "../css/Quiz.module.css";
import Timer from '../components/Timer';
import '../css/quizcopy.css'


import useBearStore from '../store/useQuizStore';

import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput
  }
  from 'mdb-react-ui-kit';

  import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBIcon,
	MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { faFacebook, faFacebookF, faGithub, faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';

const correctSound = new Audio(`${process.env.PUBLIC_URL}/sounds/correct.mp3`);
const wrongSound = new Audio(`${process.env.PUBLIC_URL}/sounds/wrong.mp3`);

const QuizTest = () => {
	// const {initQuiz, quiz, userAnswer, result, score, isPlaying, endTime} = useQuizStore();

	// const [initQuiz, setInitQuiz] = useState([]); //퀴즈 데이터 불러오기
	// const [quiz, setQuiz] = useState("");  //퀴즈
	// const [userAnswer, setUserAnswer] = useState(""); 
	// const [result, setResult] = useState(null);
	// const [score, setScore] = useState(null);
	// const [isPlaying, setIsPlaying] = useState(false);

	// const [endTime, setEndTime] = useState(0);


	// const getAllQuiz = async () =>{
	// 	try {
	// 		const initQuiz = await getDocs(collection(dbService, 'picturedb'));
	// 		const quizArray = initQuiz.docs.map((doc) => doc.data())
	// 		setInitQuiz(quizArray)
	// 		// console.log("퀴즈 불러오기 완료")
	// 	}catch (error) {
	// 		console.log('에러', error);
	// 	}
	// };
		
	// const randomValue = (array) =>{
	// 	const random = Math.floor(Math.random() * array.length)
	// 	return array[random]
	// }
	// // 다음 퀴즈 필터링
	// const checkAnswer = () => {
	// 	const filtering = initQuiz.filter(data => data.answer !== quiz.answer)
	// 	setInitQuiz(filtering)
	// }

	// const nextQuiz = useCallback(() => {
	// 	if (initQuiz.length > 0) {
	// 		// console.log("퀴즈 준비")
	// 		// console.log("생성된것: ", initQuiz)
	// 		setQuiz(randomValue(initQuiz))
	// 	}
	// }, [initQuiz]);

	// const handleAnswerChange = useCallback((e) => {
	// 	const {target : {value}} = e
    //     setUserAnswer(value)
	// }, []);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (quiz.answer === userAnswer) {
	// 		// 정답
	// 		setResult(`정답입니다!`);
	// 		setScore(score + 1);
	// 		checkAnswer()
	// 		nextQuiz();
	// 		correctSound.play()
	// 	} else {
	// 		// 오답
	// 		setResult(`땡! 정답은 "${quiz.answer}" 입니다.`);
	// 		checkAnswer()
	// 		nextQuiz();
	// 		wrongSound.play();
	// 	}
	// 	setUserAnswer("");
	// };

	// const StartGame = () =>{
	// 	setIsPlaying(true)	
	// 	setScore(0)
	// 	setResult("")
	// 	if (setIsPlaying && !initQuiz.length) {
	// 		getAllQuiz();
	// 	}
	// }

	// const onTimeStop = (time) =>{
	// 	setEndTime(time)
	// }

	// useEffect(() => {
	// 	if (initQuiz.length) {
	// 		nextQuiz();
	// 	}else {
	// 		setIsPlaying(false);
	// 		setResult("게임 시작을 눌러주세요!");
	// 	}
	// }, [initQuiz, nextQuiz]);



		// const { bears, increasePopulation, removeAllBears } = useBearStore();
		const bears = useBearStore((state) => state.bears)

		const increasePopulation = useBearStore((state) => state.increasePopulation)
		const removeAllBears = useBearStore((state) => state.removeAllBears)


		const [justifyActive, setJustifyActive] = useState('tab1');;

		const handleJustifyClick = (value) => {
		  if (value === justifyActive) {
			return;
		  }
	  
		  setJustifyActive(value);
		};


	return (
		// <div className={styles.container}>
		// 	{isPlaying ? 
		// 		(
		// 		<div className={styles.flexCenter}>
		// 			<Card key={quiz?.id} style={{ width: '24rem' }} >
		// 				{/* <Card.Title>{quiz.answer}</Card.Title> */}
		// 				<div className={styles.pictureWrapper}>
		// 					<Card.Img variant="top" src={quiz.picture} className={styles.picture}></Card.Img>
		// 				</div>
		// 				<Card.Body>
		// 					<Form onSubmit={handleSubmit} >
		// 						<Form.Control 
		// 							size="lg" 
		// 							type="text"
		// 							value={userAnswer} 
		// 							onChange={handleAnswerChange}
		// 							/>
		// 					</Form>
		// 				</Card.Body>
		// 			</Card>
		// 			<p> 남은문제 : {initQuiz.length} 개</p>
		// 		</div>
		// 		)
		// 		:
		// 		(
		// 		<>
		// 			{/* <FontAwesomeIcon icon={faSpinner} spin={true} /> */}
		// 			<Button 
		// 				type='button'  
		// 				variant="outline-light"
		// 				className={styles.startButton}
		// 				onClick={StartGame}>
		// 					게임 시작
		// 			</Button>
		// 		</>
		// 		)
		// 	}
		// 	<p style={{marginTop : '30px'}}>{result}</p>
		// 	{score === null ? "" : (<p>맞춘문제 총 : {score} 개</p>)}
		// 	<Timer isPlaying={isPlaying} onTimeStop={onTimeStop}/>
		// 	{/* <p>소요시간 :  {endTime}</p> */}
		// </div>
		<>
			<div>ㅎㅎ</div>
			<h1>{bears} around here ...</h1>
			<button onClick={increasePopulation}>one up</button>
			<button onClick={removeAllBears}>remove</button>
			<MDBContainer className="my-5 gradient-form">

			<MDBRow>
			<MDBCol col='6' className="mb-5">
					<div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

					<div className="text-white px-3 py-4 p-md-5 mx-md-4">
						<h4 class="mb-4">We are more than just a company </h4>
						<p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>

					</div>

				</MDBCol>
				<MDBContainer className="p-3 my-5 d-flex flex-column w-50">

<MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
<MDBTabsItem>
	<MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
	Login
	</MDBTabsLink>
</MDBTabsItem>
<MDBTabsItem>
	<MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
	Register
	</MDBTabsLink>
</MDBTabsItem>
</MDBTabs>

<MDBTabsContent>

<MDBTabsPane show={justifyActive === 'tab1'}>

	<div className="text-center mb-3">
	<p>Sign in with:</p>

	<div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
			<FontAwesomeIcon icon={faGoogle} />
		</MDBBtn>
		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
			<FontAwesomeIcon icon={faFacebook} />
		</MDBBtn>
		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
			<FontAwesomeIcon icon={faGithub} />
		</MDBBtn>
	</div>

	<p className="text-center mt-3">or:</p>
	</div>

	<MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
	<MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

	<div className="d-flex justify-content-between mx-4 mb-4">
	<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
	<a href="!#">Forgot password?</a>
	</div>

	<MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
	<p className="text-center">Not a member? <a href="#!">Register</a></p>

</MDBTabsPane>

<MDBTabsPane show={justifyActive === 'tab2'}>

	<div className="text-center mb-3">
	<p>Sign un with:</p>

	<div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
		<MDBIcon fab icon='facebook-f' size="sm"/>
		</MDBBtn>

		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
		<MDBIcon fab icon='twitter' size="sm"/>
		</MDBBtn>

		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
		<MDBIcon fab icon='google' size="sm"/>
		</MDBBtn>

		<MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
		<MDBIcon fab icon='github' size="sm"/>
		</MDBBtn>
	</div>

	<p className="text-center mt-3">or:</p>
	</div>

	<MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
	<MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
	<MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
	<MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

	<div className='d-flex justify-content-center mb-4'>
	<MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
	</div>

	<MDBBtn className="mb-4 w-100 gradient-custom-2">Sign up</MDBBtn>

</MDBTabsPane>

</MDBTabsContent>

</MDBContainer>

			



			</MDBRow>

			</MDBContainer>


		</>
	)
}

export default QuizTest;