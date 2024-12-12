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
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSYbmnEC9F5YPa8nf5AYHz1t_Ijtuo8Ag",
  authDomain: "exride.firebaseapp.com",
  projectId: "exride",
  storageBucket: "exride.firebasestorage.app",
  messagingSenderId: "901880743353",
  appId: "1:901880743353:web:670b9374035aee7573a268",
  measurementId: "G-TWYH9CLRK5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function () {
  const user = ref(null);

  const apiPost = async (payload) => {
    try {
      const response = await fetch(
        "https://exride.easypear.com/sms/firebase_proxy.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to communicate with backend.");
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Set persistence
      await setPersistence(auth, browserSessionPersistence);
      console.log("Session persistence set.");

      // Trigger Google sign-in
      await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in initiated.");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      localStorage.setItem("ressssssy", result);
      if (result?.user) {
        user.value = result.user;
        console.log("Google sign-in successful:", result.user);

        // Exchange token with backend
        const idToken = await result.user.getIdToken();
        localStorage.setItem("yyyyyyyyyyyyy", idToken);
        const response = await apiPost({ token: idToken });
        localStorage.setItem("#########", response);
        if (response?.id_token) {
          console.log("Received token from backend:", response.id_token);
        }
      }
    } catch (error) {
      console.error("Error handling redirect:", error);
    }
  };

  const initUser = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        console.log("User authenticated:", firebaseUser);
        // handleRedirectResult(); // Ensure backend token exchange
      } else {
        user.value = null;
        console.log("No authenticated user.");
      }
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

//  logout()

  return {
    user,
    signInWithGoogle,
    handleRedirectResult,
    initUser,
    auth,
    logout, // Export the logout function
  };
}
