import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const TopNavbar= ({isLoggedIn, user}) => {

    return (
        <>
        <Navbar style={{backgroundColor: 'rgba(222,222,222)' , color:'red'}} >
            <Container>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/Quiz">quiz</Link></Nav.Link>
                    <Nav.Link><Link to="/Ranking">Ranking</Link></Nav.Link>
                        {isLoggedIn &&(
                            <>
                                <Nav.Link><Link to="/Profile">Profile</Link></Nav.Link>
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