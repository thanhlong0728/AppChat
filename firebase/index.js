import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVVUfKWUDZjMlof_qvB_XPUdqHbu2XgQA",
  authDomain: "rn-app-05.firebaseapp.com",
  projectId: "rn-app-05",
  storageBucket: "rn-app-05.appspot.com",
  messagingSenderId: "697033870452",
  appId: "1:697033870452:web:e03d3c0c9cd93131049521"
};

// Initialize Firebase
let app;
if( firebase.apps.length === 0 ) {
  app = firebase.initializeApp(firebaseConfig);
}else{ 
  app = firebase.app()
}

const auth    = app.auth()
const db      = app.firestore();
var database  = app.database();

export { firebase ,  auth , db , database}

 