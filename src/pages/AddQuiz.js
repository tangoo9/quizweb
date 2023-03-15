import React, { useState, useRef, useCallback } from 'react'
import { addDoc, collection, serverTimestamp  } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';
import { dbService, storageService } from '../firebaseConfig';

import QuizPosts from '../components/QuizPosts';
import styles from "../css/AddQuiz.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Button, Card, Form } from 'react-bootstrap';

import ImageResizer from 'react-image-file-resizer'

import {useUserStore} from '../store'

const AddQuiz = () => {
    const [docs, setDocs ] = useState('');
	const [attachment, setAttachment] = useState('');
	const imageInput = useRef();

	const {user, setUser} = useUserStore();
	

    // console.log(user)
	// console.log("시간", serverTimestamp())
    const onSubmit = async (e) =>{
		e.preventDefault();
		if (!docs || !attachment) {
			alert(!docs ? "퀴즈 정답을 추가 해주세요" : "사진 파일을 추가 해주세요");
			return;
		}
		let AttachmentUrl ="";
		//첨부파일이 없을때
		if(attachment !== ""){
			// 파일경로참조 만들기 user.uid/${이부분은 파일명}
			const fileRef = ref(storageService, `${user.uid}/${v4()}`);
			//storage 참조경로로 파일 업로드
			const response = await uploadString(fileRef, attachment, "data_url");
			//storage의 파일 url로 다운로드
			AttachmentUrl = await getDownloadURL(response.ref)
		}
		const picturePost = {
			answer:docs,
			creatorId: user.uid,
			createdAt: serverTimestamp(),
			picture : AttachmentUrl,
			userNickname : user?.displayName,
		}
		try{
			const docRef = await addDoc(collection(dbService, "picturedb"),  picturePost);
			console.log("Document written with ID: ", docRef.id);
			alert("문제를 성공적으로 추가했어요!!")
		}catch(error){
			console.log(error)
		}
		setDocs("")
		setAttachment("")
	}
	
	const onChange = (e) =>{
		const {target : {value} } = e;
		setDocs(value); 
	}

	// const onFileChange = (e) =>{
	// 	const {target: {files}} = e;
	// 	const theFile = files[0];
	// 	const reader = new FileReader()
	// 	reader.onloadend = (finishedEvent) =>{
	// 		const {currentTarget :{result}} = finishedEvent;
	// 		setAttachment(result)
	// 	}
	// 	reader.readAsDataURL(theFile);
	// }

	const onFileChange = (e) =>{
		const {target: {files}} = e;
		const theFile = files[0];
		const options = {
			quility : 100,
			maxWidth : 640,
			maxHeight : 480,
			ImageType : 'png', //jpeg일때만 quality값 적용됨
		}
		ImageResizer.imageFileResizer(
			theFile,
			options.maxWidth,
			options.maxHeight,
			options.ImageType,
			options.quility,
			0,
			(resizedFile) =>{
				const reader = new FileReader()
				reader.readAsDataURL(resizedFile);
				console.log(resizedFile)
				reader.onloadend = (finishedEvent) =>{
					const {currentTarget :{result}} = finishedEvent;
					setAttachment(result)
				}
			},
			'file'
		)
	}
	
	
	const onRemoveImage =()=>{
		setAttachment("")
	}

    const handleImageUpload = useCallback(() =>{   
        imageInput.current.click();
    },[imageInput])

    return (
        <div className={styles.container}>
			<form onSubmit={onSubmit}>
				<Card style={{ width: '400px' }}>
					{attachment && (
						<>
							<div className={styles.attachmentWrapper}>
								<Card.Img 
									src={attachment} 
									alt="Image"             
									style={{backgroundImage: attachment}} />
							</div>
						</>
					)}
					<Card.Body>
						<Form.Control 
							style={{textAlign:'center'}}
							type="text" 
							value={docs}
							onChange={onChange} 
							maxLength={120}
							placeholder="새로운 퀴즈를 추가해 보세요!" />
						{attachment 
						? 
						(
							<div className={styles.sumitBtnWrapper}>
								<Button className="mx-3 my-3" type="button" variant="danger" onClick={onRemoveImage}>
									<span>선택 취소</span>
									{' '}
									<FontAwesomeIcon icon={faClose}/>
								</Button>
								<Button className="mx-3 my-3"type="submit">
									<span>문제 등록!</span>
								</Button>
							</div>
						)
						:(
							<>
								<Form.Group>
									<Form.Label htmlFor='attach-file'>
										<Button
											onClick={handleImageUpload} 
											className="mt-3 py-2" variant="primary">
												<span>그림 & 사진</span>
												{' '}
												<FontAwesomeIcon icon={faPlus} />
										</Button>
									</Form.Label>
									<Form.Control 
										ref={imageInput}
										type="file"
										accept="image/*"
										onChange={onFileChange}
										style={{display:'none'}}
										/>
								</Form.Group>
							</>
						)
						}
					</Card.Body>
				</Card>
			</form>
			<QuizPosts/>
        </div>
    )
}

export default AddQuiz