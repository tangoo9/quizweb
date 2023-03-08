import React, { useState } from 'react'
import QuizCard from '../components/QuizCard'
import QuizInput from '../components/QuizInput'
import LoginForm from '../components/LoginForm';
import '../css/Home.css'
import {
	MDBContainer,
	MDBRow,
	MDBCol,
}
from 'mdb-react-ui-kit';

const Home = ({isLoggedIn}) => {
    const [input, setInput] = useState('')

    const onChageInput = (e) =>{
        const {target : {value}} = e
        console.log(value)
        setInput(value)
    }
    return (
        <>
            <MDBContainer className="my-5 gradient-form">
                <MDBRow>
                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">게임 안내가 어쩌구 저쩌구.. 소셜로그인 해보라고 어쩌구.. </h4>
                                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </MDBCol>
                    {isLoggedIn	? null : <LoginForm/>}
                </MDBRow>
            </MDBContainer>
            {/* <QuizCard/> */}
            {/* <input value={input} onChange={onChageInput}></input> */}
			{/* <QuizInput/> */}
        </>
    )
}

export default Home