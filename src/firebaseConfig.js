import firebase from 'firebase';
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyCy7-8mpFjYYEEYKb325S-OKsHuxlLmk2E",
    authDomain: "instagram-clone-a4192.firebaseapp.com",
    databaseURL: "https://instagram-clone-a4192.firebaseio.com",
    projectId: "instagram-clone-a4192",
    storageBucket: "instagram-clone-a4192.appspot.com",
    messagingSenderId: "871949780520",
    appId: "1:871949780520:web:4a454556bb49acb837571d"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export {db,auth,storage};
