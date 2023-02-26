import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebaseConfig';


const TopNavbar= ({isLoggedIn, user}) => {
    const navigate = useNavigate()
    const onLogOut = ()=>{  
        authService.signOut();
        navigate('/', {replace : true})
    }

    return (
        <>
        <Navbar style={{backgroundColor: 'rgba(222,222,222)' ,color:'red'}} >
            <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/Quiz">Quiz</Nav.Link>  
                <Nav.Link href="/Ranking">Ranking</Nav.Link>
                {isLoggedIn 
                ?
                <>
                    <Nav.Link href="/Profile">Profile</Nav.Link>
                    {/* {<>
                        {user.displayName} 님 안녕하세요.
                    </>} */}
                    <Button 
                        type="button"
                        onClick={onLogOut}
                        >Log Out</Button>
                </>
                :
                <Nav.Link href="/Login">Login</Nav.Link>
                }
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;