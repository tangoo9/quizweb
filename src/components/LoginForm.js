import { useState } from 'react';

import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebaseConfig';

import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
    MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBIcon,
	MDBCheckbox
}
from 'mdb-react-ui-kit';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/quizcopy.css'



function LoginForm() {
    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };




    const navigate = useNavigate()

    const onSocialLogin = async (e) =>{
        const {target: {name} } = e;
        // console.log(e.target.name);
        let provider;
        try{
            if(name === 'google'){
                provider = new GoogleAuthProvider();
            }else if(name === 'facebook'){
                provider = new FacebookAuthProvider();
            }else if(name === 'github'){
                provider = new GithubAuthProvider();
                
            }
            const data = await signInWithPopup(authService, provider)
            // console.log(data);
            navigate('/')
        }catch(error){
            console.log("로그인 에러!! : ", error)
        }
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
                    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                            <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                            </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                            </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>
                    <MDBTabsContent>

                        <MDBTabsPane show={justifyActive === 'tab1'}>

                        <div className="text-center mb-3">
                        <p>Sign in with:</p>
                        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>

                            <Button 
                                    type='button' 
                                    onClick={onSocialLogin} 
                                    name="google">
                                <FontAwesomeIcon icon={faGoogle} />
                            </Button>
                            <Button 
                                    type='button' 
                                    onClick={onSocialLogin}
                                    name="facebook">l
                                    <FontAwesomeIcon icon={faFacebook} />
                            </Button>
                            <Button 
                                    type='button' 
                                    onClick={onSocialLogin}
                                    name="github">
                                    <FontAwesomeIcon icon={faGithub} />
                            </Button>            
                        {/* <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={onSocialLogin} >
                            <FontAwesomeIcon icon={faGoogle} />
                        </MDBBtn>
                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={onSocialLogin}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </MDBBtn>
                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={onSocialLogin}>
                            <FontAwesomeIcon icon={faGithub} />
                        </MDBBtn> */}
                        </div>

                        <p className="text-center mt-3">or:</p>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

                        <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                        </div>

                        <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="#!">Register</a></p>

                        </MDBTabsPane>

                        <MDBTabsPane show={justifyActive === 'tab2'}>

                        <div className="text-center mb-3">
                        <p>Sign un with:</p>

                        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm"/>
                        </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
                        <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
                        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

                        <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                        </div>

                        <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign up</MDBBtn>

                        </MDBTabsPane>

                    </MDBTabsContent>
                </MDBContainer>
                </MDBRow>
            </MDBContainer>
            {/* <Button type='button' 
                        onClick={onSocialLogin} 
                        name="google">login With Google</Button>
            <Button type='button' 
                        onClick={onSocialLogin}
                        name="facebook">login With FaceBook</Button>
            <Button type='button' 
                        onClick={onSocialLogin}
                        name="github">login With Github</Button>              */}
        </>

    );
}

export default LoginForm;