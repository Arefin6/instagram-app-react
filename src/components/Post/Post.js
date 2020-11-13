import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import './Post.css';
import PostDetails from './PostDetails';


const Post = () => {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
       db.collection('posts').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc =>({
            id:doc.id,
            post:doc.data()
        
        })))
       }); 
     },[]);
    return (
        <div >
            {
             posts.map(({post, id}) => <PostDetails key={id} post={post} />)   
            }  
        </div>
    );
};

export default Post;