import React from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";

const DocRead = ({user, isOwner}) => {

	const [docData, setDocData] = useState([]);

	useEffect(()=>{
		const q = query(
			collection(dbService, "picturedb"),
			orderBy("createdAt", "asc")
			);
			onSnapshot(q, (snapshot) => {
			const docDataArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setDocData(docDataArray);
			});
	},[])

    return (
        <div >	
            {docData.map(docData => (
                <div key={docData.id}  >
                    {docData.text}
                    {docData.picture && <img src={docData.picture} alt="" />}
                </div>
            ))} 
        </div>
    )
}

export default DocRead