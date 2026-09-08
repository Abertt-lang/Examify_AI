import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  if (e.code === "app/duplicate-app") {
    app = initializeApp(firebaseConfig);
  } else {
    console.error("[FIREBASE] App init error:", e.code, e.message);
    throw e;
  }
}

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  if (e.code === "auth/duplicate-app" || e.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    console.error("[FIREBASE] Auth init error:", e.code, e.message);
    throw e;
  }
}

try {
  db = getFirestore(app);
} catch (e) {
  console.error("[FIREBASE] Firestore init error:", e.code, e.message);
  throw e;
}

export { app, auth, db };
