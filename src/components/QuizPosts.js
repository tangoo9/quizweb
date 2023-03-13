import React from 'react'
import { collection, onSnapshot, orderBy, query, getDocs, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";
import { useUserStore } from '../store';
import { async } from '@firebase/util';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import EditQuizPost from './EditQuizPost';

const QuizPosts = () => {

	const {user, setUser} = useUserStore();

	const [quizPost, setQuizPost] = useState([]);
	const [postOwner, setPostOwner] = useState();

	useEffect(()=>{
		const q = query(
			collection(dbService, "picturedb"),
			orderBy("createdAt", "desc")
			)
			onSnapshot(q, (snapshot) => {
			const quizPostArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setQuizPost(quizPostArray);
			})
	},[])

	// const myQuizPost = async() =>{
	// 	const getQuizDocs = await getDocs(collection(dbService, 'picturedb'));
	// 	const myQuizDocs = getQuizDocs.docs.filter((doc) => doc.data().creatorId === user.uid)
	// 	console.log(myQuizDocs)
	// }


	// useEffect(()=>{
	// 	myQuizPost()
	// })

{/* <Card style={{ width: '18rem' }}>
	<Card.Img variant="top" src="holder.js/100px180" />
	<Card.Body>
		<Card.Title>Card Title</Card.Title>
		<Card.Text>
		Some quick example text to build on the card title and make up the
		bulk of the card's content.
		</Card.Text>
		<Button variant="primary">Go somewhere</Button>
	</Card.Body>
</Card> */}

{/* <div key={quizPost.id} className="mt-3" style={{ width: "400px" }}>
{quizPost.picture && (
	<img
	style={{ width: "380px", height: "300px", objectFit: "cover" }}
	src={quizPost.picture}
	alt=""
	/>
)}
<p>{quizPost.answer}</p>
</div> */}



    return (
		<>
			<p className='mt-5'>내가 출제한 퀴즈들</p>
			<hr style={{width:'100%'}}/>
			{quizPost.map((quizPost) =>
				quizPost?.creatorId === user?.uid && (
				<EditQuizPost key={quizPost?.id} quizPost={quizPost}/>
				)
			)}
        </>
    )
}

export default QuizPosts