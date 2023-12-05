// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLBvaiBj2DACR2R1BMlXTylMsJtrL-a7M",
  authDomain: "nikunjo-11084.firebaseapp.com",
  projectId: "nikunjo-11084",
  storageBucket: "nikunjo-11084.appspot.com",
  messagingSenderId: "977652183993",
  appId: "1:977652183993:web:a741c428a9e8f3169d3c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage; 