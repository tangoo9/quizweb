import React, { useState } from 'react'
import QuizCard from '../components/QuizCard'
import QuizInput from '../components/QuizInput'

const Quiz = () => {
    const [input, setInput] = useState('')

    const onChageInput = (e) =>{
        const {target : {value}} = e
        console.log(value)
        setInput(value)
    }
    return (
        <>
            <QuizCard/>
            <input value={input} onChange={onChageInput}></input>
			{/* <QuizInput/> */}
        </>
    )
}

export default Quiz