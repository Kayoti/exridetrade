import { ref } from "vue";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  getRedirectResult,
  browserSessionPersistence,
  signInWithPopup,
  signOut,
  type Auth,
} from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBSYbmnEC9F5YPa8nf5AYHz1t_Ijtuo8Ag",
  authDomain: "exride.firebaseapp.com",
  projectId: "exride",
  storageBucket: "exride.firebasestorage.app",
  messagingSenderId: "901880743353",
  appId: "1:901880743353:web:670b9374035aee7573a268",
  measurementId: "G-TWYH9CLRK5",
};

// Initialize Firebase app
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Declare `auth` with an explicit type
let auth: Auth | undefined;

try {
  auth = getAuth(firebaseApp);
} catch (error) {
  console.error("Firebase Auth initialization error:", error);
}

const googleProvider = new GoogleAuthProvider();

export default function () {
  const user = ref(null);

  const signInWithGoogle = async () => {
    try {
      if (!auth) throw new Error("Firebase Auth not initialized.");
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google Sign-In:");
      throw error; // Re-throw if necessary
    }
  };

  const initUser = () => {
    if (!auth) {
      console.warn("Auth is not initialized. Cannot monitor auth state.");
      return;
    }
    onAuthStateChanged(auth, (firebaseUser) => {
      //@ts-ignore
      user.value = firebaseUser || null;
    });
  };

  const firebaseLogout = async () => {
    try {
      if (!auth) return;
      await signOut(auth);
      user.value = null;
    } catch (error) {
      console.error("Error during logout:");
    }
  };

  return {
    user,
    signInWithGoogle,
    onAuthStateChanged,
    initUser,
    auth,
    firebaseLogout,
  };
}
