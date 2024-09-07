
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

import { config } from 'dotenv';
config();

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??  process.env.FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  ??  process.env.FIREBASE_API_KEY,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??  process.env.FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID  ??  process.env.FIREBASE_API_KEY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??  process.env.FIREBASE_API_KEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??  process.env.FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??  process.env.FIREBASE_API_KEY,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? process.env.FIREBASE_API_KEY,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Optional: Initialize Analytics (if you need it)
if (typeof window !== 'undefined') {
    const analytics = getAnalytics(firebaseApp);
}

const database = getDatabase(firebaseApp);

export { database };