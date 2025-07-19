
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase config (already provided by you)
const firebaseConfig = {
  apiKey: "AIzaSyDiqyjHbbd5ZfnYR5DW-igbxkoq27smvRo",
  authDomain: "vital001-4307f.firebaseapp.com",
  databaseURL: "https://vital001-4307f-default-rtdb.firebaseio.com",
  projectId: "vital001-4307f",
  storageBucket: "vital001-4307f.firebasestorage.app",
  messagingSenderId: "980386901984",
  appId: "1:980386901984:web:a9630e83932ee218abc585",
  measurementId: "G-H454V3NPZV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account' // 👈 always prompt account chooser
});
