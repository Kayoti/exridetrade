import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
  getRedirectResult,
  type User,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function () {
  const user = ref(null);

  const handleSignInState = (state) => {
    // Placeholder for setting sign-in state
    console.log("Sign-in state set to:", state);
  };

  const handleRemoveToken = () => {
    // Placeholder for removing token
    console.log("Token removed");
  };

  const reloadApplication = (path, ttl) => {
    // Placeholder for app reload logic
    console.log(`App reloaded with path: ${path} and TTL: ${ttl}`);
  };

  const apiPost = async (payload) => {
    // Placeholder for API call logic
    console.log("API called with payload:", payload);
    return {
      data: {
        status: true,
        data: { auth_state: true, token: { plain_text_token: "fake-token" } },
      },
    };
  };

  const createUserWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
    } catch (error) {
      console.error("Error signing in with email:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      handleSignInState(1);
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    }
  };

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        user.value = result.user;
        console.log("Redirect sign-in successful:", result.user);
        handleClientCRMLogin(result.user);
      }
    } catch (error) {
      console.error("Error during redirect sign-in result handling:", error);
    }
  };

  const initUser = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        console.log("User initialized:", firebaseUser);

        if (/* Check sign-in state condition */ false) {
          handleClientCRMLogin(firebaseUser);
          handleSignInState(0);
        } else {
          handleClientCRMInitialization(firebaseUser);
        }
      } else {
        user.value = null;
        console.log("No authenticated user data");

        if (!window.location.href.includes("/auth/")) {
          handleRemoveToken();
          reloadApplication("/auth/login", 1000);
        }
      }
    });
  };

  const handleClientCRMInitialization = async (firebaseUser) => {
    if (window.location.href.includes("/auth/")) {
      return;
    }

    const payload = {
      mode: "validate-session",
      user: firebaseUser,
    };

    try {
      const response = await apiPost(payload);
      if (response.data.status) {
        reloadApplication("/dashboard", 1000);
      } else {
        console.log("Session error");
        if (!window.location.href.includes("/auth/")) {
          handleRemoveToken();
          reloadApplication("/auth/login", 1000);
        }
      }
    } catch (error) {
      console.error("Error during session validation:", error);
    }
  };

  const handleClientCRMLogin = async (firebaseUser) => {
    const payload = {
      mode: "login",
      user: firebaseUser,
    };

    try {
      const response = await apiPost(payload);
      if (response.data.status && response.data.data.auth_state) {
        console.log("Token set:", response.data.data.token.plain_text_token);
      }

      reloadApplication("/dashboard", 1000);
    } catch (error) {
      console.error("Error during CRM login:", error);
    }
  };

  const signOutUser = async () => {
    try {
      const payload = {
        mode: "logout",
        user: user.value,
      };

      const response = await apiPost(payload);

      if (response.data.status) {
        await auth.signOut();
        user.value = null;
        handleRemoveToken();
        reloadApplication("/auth/login", 1000);
      } else {
        console.log("Session error during logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    user,
    createUserWithEmail,
    signInWithEmail,
    signInWithGoogle,
    handleRedirectResult,
    initUser,
    signOutUser,
  };
}
