import React, { useState } from 'react';
import './Post.css';
import PostDetails from './PostDetails';


const Post = () => {
    const [posts,setPosts] = useState([
        {
         userName:'arefin_6',
         caption:'wow good going dud',
         imageUrl: "https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",   
        },
        {
            userName:'asuSalek',
            caption:'cool its insta',
            imageUrl: "https://images.pexels.com/photos/4158007/pexels-photo-4158007.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"   
        } 
    ])

    return (
        <div >
            {
             posts.map(post => <PostDetails post={post} />)   
            }  
        </div>
    );
};

export default Post;