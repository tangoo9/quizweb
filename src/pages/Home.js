import { collection, getDocs, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import QuizCard from '../components/QuizCard'
import QuizInput from '../components/QuizInput'
import ResultChart from '../components/ResultChart'
import { dbService } from '../firebaseConfig'

const Home = () => {
	const [docData, setDocData] = useState([]);

	const getMyDocs = async () =>{
		try{

			const randomValue = (array) =>{
				const random = Math.floor(Math.random() * array.length)
				return array[random]
			}

			const q = query(collection(dbService, "nweets"));

			const quizData = onSnapshot(q, (querySnapshot) => {
				const quizArray = [];
				querySnapshot.forEach((doc) => {
					quizArray.push(doc.data().text);
				});
				console.log("배열 테스트 : ", quizArray.join(", "));
				console.log("랜덤값 테스트: ", randomValue(quizArray));

			});



		}catch(error){
			console.log("에러", error)
		}
	}
	
	useEffect(()=>{
		getMyDocs();
	},[])

	return (
		<>
			<div>
					{docData.map(v => (
						<div key={v.id}  >
							{v.text}
							{v.AttachmentUrl && <img src={v.AttachmentUrl} alt="" />}
						</div>
					))} 
			</div>
			<QuizCard/>
			<QuizInput/>
		</>
	)
}

export default Home