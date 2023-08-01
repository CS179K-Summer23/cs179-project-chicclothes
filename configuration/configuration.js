import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // put firebase information here will do it tomorrow
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
