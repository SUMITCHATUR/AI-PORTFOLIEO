import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration with fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAIczJnBEQLhkWevg2m6U5-6gDaDs7cmfI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ai-portfolieo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai-portfolieo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ai-portfolieo.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "275064492509",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:275064492509:web:b2344c86eca4de52fd6634",
};

// Initialize Firebase with error handling
let app, db, auth, storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Create fallback objects for development
  app = null;
  db = null;
  auth = null;
  storage = null;
}

export { db, auth, storage, app };
