import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components'

const MainContent = styled(Col)`
    margin : 80px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    /* background-color: lightblue; */
    text-align: center;
`;



function AppLayout({children}) {
    return (
        <Container>
            <Row>
                <Col ></Col>
                <MainContent xs={8} lg={10}>{children}</MainContent>
                <Col ></Col>
            </Row>
        </Container>
    );
}

export default AppLayout;