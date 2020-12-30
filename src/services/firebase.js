import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyAMmLRjAZhCCCsetx0-fSRDfu8ojucL7Y0",
    authDomain: "lamp-297904.firebaseapp.com",
    databaseURL: "https://lamp-297904-default-rtdb.firebaseio.com",
    projectId: "lamp-297904",
    storageBucket: "lamp-297904.appspot.com",
    messagingSenderId: "737920972101",
    appId: "1:737920972101:web:3669f88489dd242267ba2c"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
