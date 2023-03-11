import React from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";

const DocRead = ({user, isOwner}) => {

	const [docData, setDocData] = useState([]);

	useEffect(()=>{
		const q = query(
			collection(dbService, "picturedb"),
			orderBy("answer", "asc")
			)
			onSnapshot(q, (snapshot) => {
			const docDataArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setDocData(docDataArray);
			});
	},[])

    return (
        <>
		{docData.map(docData => (
				<div key={docData.id} className="mt-3" style={{width:'500px'}}>
					{docData.picture && <img style={{width:'400px', height:'300px', objectFit:'cover'}} src={docData.picture} alt="" />}
					<p>{docData.answer}</p>
				</div>
			))}	
        </>
    )
}

export default DocRead