/* eslint-disable prettier/prettier */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import configAuth from "../../auth";

// Initialize Firebase
firebase.initializeApp(configAuth.firebaseConfig);

export const authFirebase = firebase.auth();

export const google = new firebase.auth.GoogleAuthProvider();

export const facebook = new firebase.auth.FacebookAuthProvider();

export const apple = new firebase.auth.OAuthProvider("apple.com");
