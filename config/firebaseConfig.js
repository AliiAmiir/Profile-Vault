import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0HzF_dDuXeH1VDTFSOo4Ov9Sb_v_5eDo",
    authDomain: "allaboutme-c4dac.firebaseapp.com",
    databaseURL: 'https://allaboutme-c4dac.firebaseio.com',
    projectId: "allaboutme-c4dac",
    storageBucket: "allaboutme-c4dac.appspot.com",
    messagingSenderId: "930963782989",
    appId: "1:930963782989:web:6ee17de0df493f05b84b04",
    measurementId: "G-89776F9V6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
