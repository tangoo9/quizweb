import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';

import {
	MDBContainer,
	MDBRow,
	MDBCol,
}
from 'mdb-react-ui-kit';

const Home = ({isLoggedIn}) => {
    

    return (
        <>
            <MDBContainer className="my-3 gradient-form">
                <MDBRow>
                    <MDBCol col='6' className="mb-5">
                        <div className="mainInfo d-flex flex-column  justify-content-center h-100 mb-4">
                            <div className="text-white px-1 py-2 p-md-2 mx-md-4">
                            <h4 className="text-white mb-5" style={{whiteSpace: 'nowrap'}}>
                                    <span className="d-block d-md-inline-block">
                                        PictureQuiz에
                                    </span>
                                    {' '}
                                    <span className="d-block d-md-inline-block">
                                        오신것을 환영합니다!
                                    </span>
                                </h4>
                                <p className="mb-2">사진 속 랜덤 퀴즈를 맞춰 보세요!</p>
                                <p className="mb-0">로그인을 하시면 직접 퀴즈를 출제할 수도 있어요!</p>
                            </div>
                        </div>
                    </MDBCol>
                    {isLoggedIn	? null : <LoginForm/>}
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Home