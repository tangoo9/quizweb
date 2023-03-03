import { collection, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import DocRead from '../components/GetDocs';
import { authService, dbService } from '../firebaseConfig'
import { getInvoices } from "./data.ts";

const Home = ({isLoggedIn}) => {
	const [docData, setDocData] = useState([]);

	const navigate = useNavigate()
    const onLogOut = ()=>{  
        authService.signOut();
        navigate('/', {replace : true})
    }


	const getMyDocs = async () =>{
		const randomValue = (array) =>{
			const random = Math.floor(Math.random() * array.length)
			return array[random]
		}
		try{
			const q = query(collection(dbService, "nweets"));
			const quizArray = [];
			
			const quizData = onSnapshot(q, (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					quizArray.push(doc.data().text);
				});
				console.log("배열 테스트 : ", quizArray.join(", "));
				console.log("랜덤값 테스트: ", randomValue(quizArray));
			});
			return randomValue(quizArray)
		}catch(error){
			console.log("에러", error)
		}
	}



	useEffect(()=>{
		getMyDocs();
	},[])

	let invoices = getInvoices();


	return (
		<>
			{isLoggedIn 
			?  
			<Button 
			type="button"
			onClick={onLogOut}
			>Log Out</Button>
			:
			<LoginForm/>
			}
			<DocRead/>
			<div>
					{docData.map(v => (
						<div key={v.id}  >
							{v.text}
							{v.AttachmentUrl && <img src={v.AttachmentUrl} alt="" />}
						</div>
					))}
				<nav
					style={{
					borderRight: "solid 1px",
					padding: "1rem",
					}}
				>
					{invoices.map((invoice) => (
					<Link
						style={{
						display: 'block',
						margin: '1rem 0',
						backgroundColor: 'tomato',
						}}
						to={`/invoices/${invoice.number}`}
						key={invoice.number}
					>
						{invoice.name}
					</Link>
					))}
				</nav>
			</div>
		</>
	)
}

export default Home