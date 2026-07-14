import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCj392pk_auJrqRwQouMcGUuIpq7KmydlQ",
  authDomain: "ecomifyai.firebaseapp.com",
  projectId: "ecomifyai",
  storageBucket: "ecomifyai.firebasestorage.app",
  messagingSenderId: "102549506268",
  appId: "1:102549506268:web:f220a103de5b15afc18c19"
};

let app;
let auth;
let db;

try {
  console.log("[FIREBASE] Initializing app...");
  app = initializeApp(firebaseConfig);
  console.log("[FIREBASE] App initialized OK");
} catch (e) {
  if (e.code === "app/duplicate-app") {
    console.log("[FIREBASE] App already initialized, getting existing");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("[FIREBASE] App init error:", e.code, e.message);
    throw e;
  }
}

try {
  console.log("[FIREBASE] Initializing auth...");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log("[FIREBASE] Auth initialized OK (fresh)");
} catch (e) {
  if (e.code === "auth/duplicate-app" || e.code === "auth/already-initialized") {
    console.log("[FIREBASE] Auth already initialized, using getAuth");
    auth = getAuth(app);
  } else {
    console.log("[FIREBASE] Auth init error:", e.code, e.message);
    throw e;
  }
}

try {
  console.log("[FIREBASE] Initializing Firestore...");
  db = getFirestore(app);
  console.log("[FIREBASE] Firestore initialized OK");
} catch (e) {
  console.log("[FIREBASE] Firestore init error:", e.code, e.message);
  throw e;
}

export { app, auth, db };
