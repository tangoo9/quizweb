import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function QuizCard() {
    return (
        <Card style={{ width: '24rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>문제 카드</Card.Title>
            <Card.Text>
                문제 카드에 대한 설명
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            <Button variant="primary">Go somewhere</Button>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
    );
}

export default QuizCard;