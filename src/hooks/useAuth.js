import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) console.log("REDIRECT LOGIN RESULT:", result);
    }).catch((e) => {
      if (e.code !== 'auth/redirect-cancelled-by-user') {
        setError(e.message);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("AUTH STATE CHANGED:", firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e.message);
    }
  };

  const signup = async (email, password, displayName) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (e) {
      console.log("GOOGLE LOGIN ERROR:", e);
      setError(e.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const clearError = () => setError(null);

  return {
    user,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    clearError,
  };
}