import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration — values are loaded from Vite environment variables.
// Create a .env file in the project root with these variables:
//   VITE_FIREBASE_API_KEY=your_api_key
//   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
//   VITE_FIREBASE_PROJECT_ID=your_project_id
//   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
//   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
//   VITE_FIREBASE_APP_ID=your_app_id

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
