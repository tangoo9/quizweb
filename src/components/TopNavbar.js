import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const TopNavbar= ({isLoggedIn, user}) => {
    // <Link to="/Quiz">quiz</Link>
    return (
        <>
        <Navbar style={{backgroundColor: 'rgba(222,222,222)' , color:'red'}} >
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Quiz">Quiz</Nav.Link>
                    <Nav.Link as={Link} to="/Ranking">Ranking</Nav.Link>
                        {isLoggedIn &&(
                            <>
                                <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
                                {user.displayName}님 안녕하세요.
                            </>
                        )}
                </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;