import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCRsz2DQYLX_LwagDGiiX-wdKdrnhN6Qhk",
  authDomain: "projectmadrasa.firebaseapp.com",
  projectId: "projectmadrasa",
  storageBucket: "projectmadrasa.appspot.com",
  messagingSenderId: "509500005395",
  appId: "1:509500005395:web:1d7ab9f02b9a188895b3e6",
  measurementId: "G-5GKQ5ZXWQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app)