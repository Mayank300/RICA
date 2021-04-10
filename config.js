import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCsahoVHVOdl9PtS7ljMHFfIz1Qde1rStY",
  authDomain: "rica-6041c.firebaseapp.com",
  databaseURL: "https://rica-6041c.firebaseio.com",
  projectId: "rica-6041c",
  storageBucket: "rica-6041c.appspot.com",
  messagingSenderId: "362791567716",
  appId: "1:362791567716:web:076d98c0059823362bba71"
};


// Initialize Firebase
if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig); }

export default firebase.firestore();
