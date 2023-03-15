import React from 'react'
import { collection, onSnapshot, orderBy, query, getDocs, deleteDoc, doc, getFirestore, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";
import { useUserStore } from '../store';
import EditQuizPost from './EditQuizPost';

const QuizPosts = () => {

	const {user, setUser} = useUserStore();

	const [quizPost, setQuizPost] = useState([]);

	useEffect(()=>{
		const q = query(
			collection(dbService, "picturedb"),
			orderBy("createdAt", "desc"),
			)
			onSnapshot(q, (snapshot) => {
			const quizPostArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setQuizPost(quizPostArray);
			})
	},[])

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