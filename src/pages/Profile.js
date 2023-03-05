import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import DocRead from '../components/GetDocs';
import { v4 } from 'uuid';
import { dbService, storageService } from '../firebaseConfig';

const now = new Date(); 
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
const day = now.getDate().toString().padStart(2, '0'); 
const hour = now.getHours().toString().padStart(2, '0'); 
const minute = now.getMinutes().toString().padStart(2, '0');
const second = now.getSeconds().toString().padStart(2, '0'); 
const millisecond = now.getMilliseconds().toString().padStart(3, '0'); 

const timeNow = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;

const Profile = ({user}) => {
    const [docs, setDocs ] = useState('');
	const [attachment, setAttachment] = useState('');
    console.log(user)

    const onSubmit = async (e) =>{
		if (docs === "") {
			return;
		}
		e.preventDefault();

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
			text:docs,
			createdAt: timeNow,
			creatorId: user.uid,
			picture : AttachmentUrl,
		}
		try{
			const docRef = await addDoc(collection(dbService, "picturedb"),  picturePost);
			console.log("Document written with ID: ", docRef.id);
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

	const onFileChange = (e) =>{
		const {target: {files}} =e;
		const theFile = files[0];
		const reader = new FileReader()
		reader.onloadend = (finishedEvent) =>{
			const {currentTarget :{result}} = finishedEvent;
			setAttachment(result)
		}
		reader.readAsDataURL(theFile);
	}
	
	const onRemoveImage =()=>{
		setAttachment("")
	}

    return (
        <div >
            <form onSubmit={onSubmit} >
			<div >
				<input 
					type="text" 
					value={docs}
					onChange={onChange} 
					placeholder="문제를 입력하세요." 
					maxLength={120}/>
				<input type="submit" value="추가"/>
			</div>
				<label htmlFor="attach-file">
					<span>사진 or 그림 추가하기</span>
					<span>+</span>
				</label>
				<input
					id="attach-file"
					type="file"
					accept="image/*"
					onChange={onFileChange}
					style={{
					display :'none'
					}}
				/>
        {attachment &&   (
            <div >
                <img src={attachment} alt="none"             
					style={{backgroundImage: attachment}}/>
                <button onClick={onRemoveImage}>
					<span>
						선택 취소
					</span>
					<span>x</span>
				</button>
            </div>
        )}
    </form>
        </div>
    )
}

export default Profile