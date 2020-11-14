import { Button, Input, Modal } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import { auth } from '../../../firebaseConfig';
import { UserContext } from '../../../App';

const Header = () => {
    function getModalStyle() {
        const top = 50 ;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '1px solid  #fafafa',
          boxShadow: theme.shadows[5],
          outline:'none',
          padding: theme.spacing(2, 4, 3),
        },
    }));  
     
    

    const classes = useStyles(); 
    const [modalStyle] = useState(getModalStyle);
    const [open,setOpen] =useState(false);
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [openLogin,setOpenLogin] = useState(false);


    useEffect(()=>{
       
       const unsubscribe= auth.onAuthStateChanged((authUser)=>{
            if(authUser){
             console.log(authUser);
             setLoggedInUser(authUser);
            }
            else{
               setLoggedInUser(null); 
            }
        })

        return () =>{
            unsubscribe();
        }
    },[loggedInUser]) 


     const handelSignUp = (e) =>{

         auth.createUserWithEmailAndPassword(email,password)
         .then(authUser =>{
             return authUser.user.updateProfile({
                 displayName:userName
             })
         })
         .catch(err => alert(err.message));

         setOpen(false);
         e.preventDefault()
     }

     const handelLogin = (e)=>{
         auth.signInWithEmailAndPassword(email,password)
         .catch(err => alert(err.message));

         setOpenLogin(false);

      e.preventDefault()
     }

    return (
        <div className="header">
            <img 
            className="brand-img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>
        
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
            <form className="signup-form">
            <center>
            <img 
            className="brand-img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>
            </center>
            <Input
              placeholder="user-name"
              type="text"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
             <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
             <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handelSignUp} variant="contained" color="secondary">Sign Up</Button>
            
            </form>
            
         </div>
        </Modal> 
        {/* //Login Modal */}
        <Modal
            open={openLogin}
            onClose={()=>setOpenLogin(false)}
        >
        <div style={modalStyle} className={classes.paper}>
            <form className="signup-form">
            <center>
            <img 
            className="brand-img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>
            </center>
            
             <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
             <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handelLogin} variant="contained" color="secondary">Sign Up</Button>
            
            </form>
            
         </div>
        </Modal> 
        {
          loggedInUser ? (
            <Button onClick={() => auth.signOut()}>Log Out</Button>   
          ):
          (
            <div className="login-container">
          
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          <Button onClick={() => setOpenLogin(true)}>Login</Button>
            </div>  
            
          )  
        }

       
        </div>
    );
};

export default Header;