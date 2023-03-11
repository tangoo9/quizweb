import React, { useEffect, useState, useRef } from 'react'
import { useQuizStore } from '../store';

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const endTimeRef = useRef(0);
    const {isPlaying, setEndTime, isGameEnd,} = useQuizStore();
    
    useEffect(() => {
        let timerId;
        if(isPlaying){
            timerId = setTimeout(() => {
                setTimer(prevTimer => prevTimer + 10);
            }, 10);
        }
        return () => {
            clearTimeout(timerId);
            if (!isPlaying) {
                setTimer(0)
            }
            
            // 게임이 종료되었으면 종료시간을 저장
            if(isGameEnd) {
                endTimeRef.current = timer
                setEndTime(endTimeRef.current);
            }
        };
    }, [isPlaying, timer, isGameEnd, setEndTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }


    return (
        <>
        <h1>{formatTime(timer)}</h1>
        </>
    )
}

export default Timer