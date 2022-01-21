import firebase from "firebase";
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyDGOZ5DGtOuW-TgSLn2XVGXy44F9M1DKGc",
  authDomain: "instagram-clone-react-358b5.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-358b5-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-358b5",
  storageBucket: "instagram-clone-react-358b5.appspot.com",
  messagingSenderId: "138079351841",
  appId: "1:138079351841:web:dc570d9a1e4ddacc9cdf60",
  measurementId: "G-7EL7PCT17Z"
  });
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export{db , auth , storage };