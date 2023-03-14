import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Table from 'react-bootstrap/Table';
import { dbService } from '../firebaseConfig';

function ResultChart() {
    
    const [ranking , setRanking] = useState([])
    
	const getRankingData = async () =>{
		try {
            const getRankingDocs = await getDocs(query(
                collection(dbService, 'ranking'), 
                orderBy('score', 'desc'),
                orderBy('time', 'asc')
            ));
			const rankingArray = getRankingDocs.docs.map((doc) => doc.data())
			console.log("랭킹 로드 완료" , rankingArray)
            setRanking(rankingArray)
		}catch (error) {
			console.log('에러', error);
		}
	};

    useEffect(()=>{
        getRankingData();
    },[])


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>닉네임</th>
                    <th>점수</th>
                    <th>소요 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((ranking, idx) => (
                        <tr key={ranking.createdAt}>
                            <td>{idx + 1}</td>
                            <td>{ranking.userNickname}</td>
                            <td>{ranking.score}</td>
                            <td>{formatTime(ranking.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ResultChart

