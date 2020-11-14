import { createContext, useContext, useState } from 'react';
import './App.css';
import CreatePost from './components/CreatePost/CreatePost';
import Post from './components/Post/Post';
import Header from './components/Sheard/Header/Header';

export const UserContext = createContext();


function App() {
 const [loggedInUser,setLoggedInUser] =useState({}); 
  return (
    <div className="app">
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
       <Header></Header>
       <CreatePost></CreatePost>
       <Post></Post>
       </UserContext.Provider>
       
    </div>
      
  );
}

export default App;
