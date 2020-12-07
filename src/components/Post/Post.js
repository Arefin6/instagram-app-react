import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import './Post.css';
import PostDetails from './PostDetails';
import InstagramEmbed from 'react-instagram-embed';
import axios from '../../axios';
import Pusher from 'pusher-js';


const Post = () => {
    const [posts,setPosts] = useState([]);

    const fetchPosts = async () =>{
        await axios.get('/sync').then(res =>{
         setPosts(res.data);
        });
    };

    useEffect(()=>{
        const pusher = new Pusher('b12d47ab6c6f1853fd04', {
            cluster: 'mt1'
          });
      
          const channel = pusher.subscribe('posts');
          channel.bind('inserted', (data) => {
            fetchPosts();
          });
    },[]);

    useEffect(()=>{
          fetchPosts();
     },[]);
    return (
        <div className="post">
           <div className="post-left">
           {
             posts.map((post) => <PostDetails key={post._id} post={post} postId={post._id} />)   
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