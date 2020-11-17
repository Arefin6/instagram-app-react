import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import './Post.css';
import PostDetails from './PostDetails';
import InstagramEmbed from 'react-instagram-embed';


const Post = () => {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
       db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
          setPosts(snapshot.docs.map(doc =>({
            id:doc.id,
            post:doc.data()
        
        })))
       }); 
     },[]);
    return (
        <div className="post">
           <div className="post-left">
           {
             posts.map(({post, id}) => <PostDetails key={id} post={post} postId={id} />)   
            }  
            </div>
            <div className="post-right">
            <InstagramEmbed
                url='https://www.instagram.com/p/CFkRjmpgkkD/'
                clientAccessToken='1416681638538198|8452262a0b958fa00f9fb81a1e9a2c4d'
                maxWidth={520}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
            </div> 
           
        </div>
    );
};

export default Post;