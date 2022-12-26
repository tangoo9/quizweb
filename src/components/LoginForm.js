import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
    return (
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
    );
}

export default LoginForm;