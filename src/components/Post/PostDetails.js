import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css';
import { db } from '../../firebaseConfig';
import { UserContext } from '../../App';

const PostDetails = ({post,postId}) => {

    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');
    const [loggedInUser,setLoggedInUser] =useContext(UserContext);
    
    useEffect(()=>{
       let unsubscribe;
       if(postId){
          unsubscribe =
          db.collection('posts')
          .doc(postId)
          .collection('comments')
          .onSnapshot((snapshot) =>{
              setComments(snapshot.docs.map(doc => doc.data()));
          }) 
       } 
        return ()=>{
            unsubscribe();
        }  

    },[postId]);

     const  postComment =(event)=>{
        event.preventDefault();   
       db.collection('posts')
       .doc(postId).collection('comments').add({
           body:comment,
           userName:loggedInUser.displayName      
        })
        setComment('');
      
     }

    return (
        <div className="post-details" >
            <div className="post-header">
            <Avatar
             className="post-avatar"
             alt={post.user}
             src="/static/images/avatar/1.jpg" />
            <h3>{post.user}</h3>
            </div> 
           <img className="post-img" src={post.image} alt=""/>
            <h4 className="post-text"><strong style={{marginRight:"10px"}}>{post.userName}</strong>{post.caption} </h4>
             
             
             <div className="post-comments">
              {comments.map(comment => 
                  <p><strong style={{marginRight:'10px'}}>{comment.userName}</strong>{comment.body}</p> 
                 )
                }

           </div>
             
             
           {
              loggedInUser && 
             <form className="comment-box">
              <input 
              type="text"
              className="comment-input"
              placeholder="Add a Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />   
              <button 
              type="submit"
              className="comment-btn"
              disabled={!comment}
              onClick={postComment}
              >
               Post   
              </button>     
            </form> 
       }

        </div>
    );
};

export default PostDetails;