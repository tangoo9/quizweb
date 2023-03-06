import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    
    useEffect(() => {
        let timerId;
        if(isPlaying){
            timerId = setTimeout(() => {
                setTimer(prevTimer => prevTimer + 10);
            }, 10);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isPlaying, timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().slice(0, 2).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    const stopTimer = () =>{
        setIsPlaying(false);
        setTimer(0);
    }

    return (
        <>
        <h1>{formatTime(timer)}</h1>
        <button type='button' onClick={() =>setIsPlaying(true)}>타이머시작</button>
        <button type='button' onClick={stopTimer}>타이머 종료</button>
        </>
    )
}

export default Timer