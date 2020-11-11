import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css';

const PostDetails = ({post}) => {
    return (
        <div className="post">
            <div className="post-header">
            <Avatar
             className="post-avatar"
             alt={post.userName}
             src="/static/images/avatar/1.jpg" />
            <h3>{post.userName}</h3>
            </div> 
            
            <img className="post-img" src={post.imageUrl} alt=""/>
           <h4 className="post-text"><strong style={{marginRight:"10px"}}>{post.userName}</strong>{post.caption} </h4>
        </div>
    );
};

export default PostDetails;