import React, { useState } from 'react'
import QuizCard from '../components/QuizCard'
import QuizInput from '../components/QuizInput'
import styles from "../css/Quiz.module.css";

const Quiz = () => {
    const [input, setInput] = useState('')

    const onChageInput = (e) =>{
        const {target : {value}} = e
        console.log(value)
        setInput(value)
    }
    return (
        <div className={styles.container}>
            <QuizCard/>
            <input value={input} onChange={onChageInput}></input>
			{/* <QuizInput/> */}
        </div>
    )
}

export default Quiz