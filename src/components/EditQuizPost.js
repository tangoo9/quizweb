import React, { useRef , useCallback, useState} from 'react'
import { dbService, storageService } from '../firebaseConfig'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage'

import { Button, Card, Form, FormControl, FormGroup } from 'react-bootstrap'
import { AiFillDelete , AiFillEdit} from "react-icons/ai";

import styles from '../css/AddQuiz.module.css'
import { useInput } from '../hooks/useInput'
import { useUserStore } from '../store'

const EditQuizPost = ({quizPost}) => {

    const [input ,handleInput, setInput] =useInput(quizPost.answer);
    const [currentImage, setCurrentImage] = useState("");
    const quizImageRef = useRef();
    const currentImageRef = useRef();
    const {user} = useUserStore();


    // 각각 firestore의 doc을 참조, fireStorage를 참조
    const postDocRef = doc(dbService, "picturedb", `${quizPost.id}`)
    const postImageRef = ref(storageService, quizPost.AttachmentUrl)



    const handleDelete = async() =>{
        const ok = window.confirm("정말로 게시물을 삭제하시겠습니까?")
        if(ok){
            try{
                await deleteDoc(postDocRef)
                await deleteObject(postImageRef);
            }catch(error){
                console.log(error)
            }
        }
    }

    const handleEditSubmit = async(e) =>{
        e.preventDefault();
        const ok = window.confirm("정말로 게시물을 수정하시겠습니까?")
        if(ok){
            try{
                if (currentImage) {
                    const attachmentRef = ref(storageService, `${user.uid}/${quizPost.id}`);
                    // console.log(attachmentRef)
                    const response = await uploadString(attachmentRef, currentImage, 'data_url');
                    const attachmentUrl = await getDownloadURL(response.ref);
                    await updateDoc(postDocRef, { answer: input, picture: attachmentUrl });
                } else { 
                    await updateDoc(postDocRef,{answer :input})
                }
                alert("수정 완료!")
            }catch(error){
                console.log(error)
            }
        }
    }

    const handleImageClick = useCallback(() => {
        quizImageRef.current.click();
    },[quizImageRef])

    const handleImageChange = useCallback((e) => {
        const {target: {files}} = e;
		const theFile = files[0];
        console.log(theFile)
        if (theFile.type.includes('image')) {
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget;
            currentImageRef.current.src = result;
            setCurrentImage(result)
        }
        reader.readAsDataURL(theFile);
        alert("사진 변경을 하시려면 수정 버튼을 눌러주세요!")
        }
    },[])

    // useEffect(()=>{
    //     console.log(currentImageRef.current.src, "커런트")
    //     setCurrentImage(currentImageRef.current.src)
    //     console.log("현재 이미지: ", currentImage)
    // },[currentImageRef, currentImage])

    return (
        <>
            <Card key={quizPost?.id} className="my-3 col-md-8">
                <Form>
                    <div className={styles.attachmentWrapper}>
                        <Card.Img  
                            className="cursor-pointer"
                            src={quizPost.picture} 
                            ref={currentImageRef}
                            onClick={handleImageClick}/>
                        <Form.Control 
                            ref={quizImageRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{display:'none'}}
                            />
                    </div>
                    <Card.Body className="pb-1">
                        <Card.Title>
                            <FormControl className="text-center" value={input} onChange={handleInput}/>
                        </Card.Title>
                        <Card.Text className='my-0 d-flex justify-content-center'>
                            <Button className="mx-3 my-3" style={{color:'black', borderColor:'#aaa'}} type="submit" variant="outline-light" onClick={handleEditSubmit}>
                                <span>수정</span>
                                {' '}
                                <AiFillEdit icons='true'/>
                            </Button>
                            <Button className="mx-3 my-3" type="submit" variant="danger" onClick={handleDelete}>
                                <span>삭제</span>
                                {' '}
                                <AiFillDelete icons='true'/>
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Form>
            </Card> 
        </>
    )
}

export default EditQuizPost