import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_dPTG91ERhuB8UXjIWic4pJw6PvLoMg8",
    authDomain: "clone-ecbaf.firebaseapp.com",
    projectId: "clone-ecbaf",
    storageBucket: "clone-ecbaf.appspot.com",
    messagingSenderId: "423887726472",
    appId: "1:423887726472:web:6eff1b84cef438c5d6fc3d"
};

firebase.initializeApp(firebaseConfig);
export default firebase.auth();
