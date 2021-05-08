import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyApGIaQLy-uEod6NaoZ17ueSq7eMUPQWUo',
  authDomain: 'keep-mynotes.firebaseapp.com',
  projectId: 'keep-mynotes',
  storageBucket: 'keep-mynotes.appspot.com',
  messagingSenderId: '273954184911',
  appId: '1:273954184911:web:d8625426994bf9840ea1ba',
};
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const googleprovider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export {projectFirestore, timestamp, projectAuth, googleprovider};
