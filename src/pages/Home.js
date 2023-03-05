import { collection, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import DocRead from '../components/GetDocs';
import { authService, dbService } from '../firebaseConfig'
import { getInvoices } from "./data.ts";
import Deck from './Card.tsx';

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
			const q = query(collection(dbService, "picturedb"));
			const quizArray = [];
			
			const quizData = onSnapshot(q, (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					quizArray.push(doc.data());
				});
				console.log("배열 테스트 : ", quizArray.join(", "));
				console.log("랜덤값 테스트: ", randomValue(quizArray));
				const selected = randomValue(quizArray)
				setDocData(selected)
			});
		}catch(error){
			console.log("에러", error)
		}
	}

	console.log("도큐먼트", docData)
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
			{/* <DocRead/> */}
			{/* <Deck cards={docData} /> */}
			<div>
				{docData?.text &&(
					<div key={docData.id}>
					{docData.text}
					{docData.picture && <img src={docData.picture} alt="" />}
					</div>
				)
				}
				{/* <nav
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
				</nav> */}
			</div>
		</>
	)
}

export default Home