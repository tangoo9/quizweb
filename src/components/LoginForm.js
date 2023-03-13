import { useState } from 'react';

import { 
    createUserWithEmailAndPassword, 
    FacebookAuthProvider, 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile 
} from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { authService, dbService } from '../firebaseConfig';

import {
	MDBCol,
	MDBInput,
    MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBCheckbox
}
from 'mdb-react-ui-kit';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { useInput } from '../hooks/useInput';



function LoginForm() {

    const [error, setError]= useState('');
    const [email , onChangeEmail] = useInput('')
    const [password , onChangePassword] = useInput('')
    const [userNickname , onChangeUserNickname] = useInput('')

    // 로그인, 회원가입 form
    const [justifyActive, setJustifyActive] = useState('tab1');

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
            const {user} = await signInWithPopup(authService, provider)
            const { displayName, email, photoURL, uid } = user;
            const userData = {displayName, email, photoURL, uid}
            // Users Collection에 user uid값을 문서의 id값이 되도록 생성 ... 
            // doc(db,"docPath",참조변수)
            const userDocRef = doc(dbService, "Users", uid);
            // setDoc : 문서를 업데이트하거나 생성...  
            // setDoc(참조변수, 데이터, 옵션)
            await setDoc(userDocRef, userData);
            navigate('/')
        }catch(error){
            console.log("로그인 에러!! : ", error)
        }
    }


    const onSignUpSubmit = async(e) =>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(authService, email, password);
            await updateProfile(authService.currentUser, {displayName : userNickname})
            alert(`회원가입을 축하합니다! ${userNickname}님!`)
        }catch(err){
            console.log(err);
            alert(err.message)
            setError(err.message)
        }
    }

    const onLoginSubmit = async(e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(authService, email, password);
        }catch(err){
            console.log(err);
            alert(err.message)
            setError(err.message)
        }
    }

    return (
        <>
            <MDBCol col='6' className="mb-5">
                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        로그인
                    </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        회원가입
                    </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={justifyActive === 'tab1'}>
                        <div className="text-center mb-3">
                            <form onSubmit={onLoginSubmit}>
                                <div className='d-flex flex-column' style={{width: '100%'}}>
                                    <MDBInput 
                                        wrapperClass='mb-3 d-flex flex-column-reverse' label='Email' labelClass='me-2 d-inline' onChange={onChangeEmail} type='email'/>
                                    <MDBInput 
                                        wrapperClass='mb-3 d-flex flex-column-reverse' label='Password' onChange={onChangePassword} type='password'/>
                                    <Button  type="submit" className="mb-4 w-100 gradient-custom-2">로그인</Button>
                                    {error && <span style={{color:'red'}}>{error}</span>}
                                </div>
                            </form>
                            <hr></hr>
                            <p>Social Login</p>
                            <div className='d-flex justify-content-around mx-auto' style={{width: '100%'}}>
                                <Button 
                                        type='button' 
                                        onClick={onSocialLogin} 
                                        variant="outline-primary"
                                        name="google">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </Button>
                                <Button 
                                        type='button' 
                                        variant="outline-primary"
                                        onClick={onSocialLogin}
                                        name="facebook">
                                        <FontAwesomeIcon icon={faFacebook} />
                                </Button>
                                <Button 
                                        type='button' 
                                        variant="outline-primary"
                                        onClick={onSocialLogin}
                                        name="github">
                                        <FontAwesomeIcon icon={faGithub} />
                                </Button>            
                            </div>
                        </div>
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === 'tab2'}>
                        <form onSubmit={onSignUpSubmit}>
                            <MDBInput wrapperClass='mb-4 d-flex flex-column-reverse' label='이름(닉네임)' onChange={onChangeUserNickname} type='text'/>
                            <MDBInput wrapperClass='mb-4 d-flex flex-column-reverse' label='Email' onChange={onChangeEmail} type='email'/>
                            <MDBInput wrapperClass='mb-4 d-flex flex-column-reverse' label='비밀번호' onChange={onChangePassword} type='password'/>
                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='회원가입에 동의합니다.' />
                            </div>
                                {error && <span style={{color:'red'}}>{error}</span>}
                            <Button type="submit" className="mb-4 w-100 gradient-custom-2">회원가입</Button>
                        </form>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>
        </>
    );
}

export default LoginForm;