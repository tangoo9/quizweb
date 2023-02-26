import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebaseConfig';


function LoginForm() {

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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디를 입력하세요. (e-mail)</Form.Label>
                    <Form.Control type="email" placeholder="email ID" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호를 입력하세요.</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        영문,특수문자 포함
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    로그인
                </Button>
            </Form>
            <Button type='button' 
                        onClick={onSocialLogin} 
                        name="google">login With Google</Button>
            <Button type='button' 
                        onClick={onSocialLogin}
                        name="facebook">login With FaceBook</Button>
            <Button type='button' 
                        onClick={onSocialLogin}
                        name="github">login With Github</Button>
                        
        </>

    );
}

export default LoginForm;