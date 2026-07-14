import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";


const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("[AUTH] Subscribing to onAuthStateChanged");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("[AUTH] onAuthStateChanged fired, user:", firebaseUser ? firebaseUser.uid : null);
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
            console.log("[AUTH] User info loaded from Firestore");
          } else {
            console.log("[AUTH] No Firestore doc for this user");
          }
        } catch (err) {
          console.log("[AUTH] Error loading user doc:", err.message);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
      console.log("[AUTH] loading set to false");
    });
    return unsubscribe;
  }, []);

  const register = async (email, password, nombres, apellidos) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const u = userCredential.user;
    await updateProfile(u, { displayName: `${nombres} ${apellidos}` });
    await setDoc(doc(db, "users", u.uid), {
      uid: u.uid,
      email,
      nombres,
      apellidos,
      displayName: `${nombres} ${apellidos}`,
      photoURL: null,
      provider: "email",
      createdAt: new Date().toISOString(),
      nivel: 1,
      xpActual: 0,
      leccionesCompletadas: 0,
      progresoTotal: 0,
      rachaActual: 0,
    });
    return u;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleAuth = async (idToken) => {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    const u = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", u.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", u.uid), {
        uid: u.uid,
        email: u.email,
        nombres: u.displayName?.split(" ")[0] || "",
        apellidos: u.displayName?.split(" ").slice(1).join(" ") || "",
        displayName: u.displayName || "",
        photoURL: u.photoURL,
        provider: "google",
        createdAt: new Date().toISOString(),
        nivel: 1,
        xpActual: 0,
        leccionesCompletadas: 0,
        progresoTotal: 0,
        rachaActual: 0,
      });
    }
    return u;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        register,
        login,
        handleGoogleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
