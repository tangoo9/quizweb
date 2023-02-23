import { useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function QuizInput() {
    const [quiz, setQuiz] =useState();

    const onChangeText = useCallback((e) =>{
        setQuiz(e.target.value)
    },[])

    return (
        <>
            <Form.Label htmlFor="inputQuiz" >문제를 적어주세요</Form.Label>
            <Form.Control
                type="text"
                id="inputQuiz"
                aria-describedby="passwordHelpBlock"
                placeholder='ex. 바나나의 색상은?'
                onChange={onChangeText}
                value={quiz}
            />
            <div>{quiz}</div>
            <Form.Text id="passwordHelpBlock" muted>설명글...</Form.Text>
            <Form.Label htmlFor="inputQuizAnswer">정답을 적어주세요</Form.Label>
            <Form.Control
                type="password"
                id="inputQuizAnswer"
                aria-describedby="passwordHelpBlock"
                placeholder='ex. 노란색'
            />
            <Form.Label htmlFor="inputWrongAnswer1">오답을 적어주세요</Form.Label>
            <Form.Control
                type="password"
                id="inputWrongAnswer1"
                aria-describedby="passwordHelpBlock"
                placeholder='ex. 빨간색'
            />
            <Form.Label htmlFor="inputWrongAnswer2">오답을 적어주세요</Form.Label>
            <Form.Control
                type="password"
                id="inputWrongAnswer2"
                aria-describedby="passwordHelpBlock"
                placeholder='ex. 초록색'
            />
        </>
    );
}

export default QuizInput;