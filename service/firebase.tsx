import { FIREBASECONFIG } from "@/constant/firebase-config";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebase = initializeApp(FIREBASECONFIG);
const firebaseAuth = getAuth(firebase);
const analytics = getAnalytics(firebase);
export { analytics, firebase, firebaseAuth };
