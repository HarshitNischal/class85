import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAC72EOXtHW9TU9eTfru6-aXtbPxLSJCsE",
    authDomain: "storytellingapp-2b76e.firebaseapp.com",
    projectId: "storytellingapp-2b76e",
    storageBucket: "storytellingapp-2b76e.appspot.com",
    messagingSenderId: "826594397288",
    appId: "1:826594397288:web:13861b258906859a78ffdd"
  };
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }
  else{
      firebase.app()
  }
  export default firebase.database()