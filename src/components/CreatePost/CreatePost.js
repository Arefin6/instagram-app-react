import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { db, storage } from '../../firebaseConfig';
import firebase from 'firebase';
import './CreatePost.css';


const CreatePost = () => {
    const [caption,setCaption] = useState('');
    const [image,setImage] = useState(null);
    const[progress,setProgress] = useState(0);
    const[loggedInUser,setLoggedInUser] = useContext(UserContext);

    const handleFileChange=(e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload =()=>{
        
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
           'state_changed',
            (snapshot) =>{
               const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*100);
               setProgress(progress); 
            },
            (err) =>{
                console.log(err);
                alert(err.message);
            },
            ()=>{
               storage
               .ref('images')
               .child(image.name)
               .getDownloadURL()
               .then(url =>{
                   //Save to db
                   db.collection('posts').add({
                     timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                     caption:caption,
                     imageUrl:url,
                     userName:loggedInUser.displayName
                   });
                   setProgress(0);
                   setCaption('');
                   setImage(null);
               });

            }
        )

    }
    return (
        <div>
           {
            loggedInUser ?(
                 <div className="create-post-wraper">
                 <progress className="progress" value={progress} max="100" />   
                <input type="text" placeholder="Enter a caption.." onChange={e =>setCaption(e.target.value)} value={caption} />
                <input type="file" onChange={handleFileChange}/>
                <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>   
                 </div>
               
            ):(
              <h3>Log in first</h3>
            )  
           } 
          
        </div>
    );
};

export default CreatePost;