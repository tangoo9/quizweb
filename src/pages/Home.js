import { collection, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { dbService } from '../firebaseConfig'

const Home = () => {
	const [docData, setDocData] = useState([]);
	const getMyDocs = async () =>{
		const randomValue = (array) =>{
			const random = Math.floor(Math.random() * array.length)
			return array[random]
		}
		try{
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
		</>
	)
}

export default Home