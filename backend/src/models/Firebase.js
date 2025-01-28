const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBak-OP0C8GDS29e_eUfVJt6ugJnYa7phQ",
  authDomain: "tweenty-question.firebaseapp.com",
  projectId: "tweenty-question",
  storageBucket: "tweenty-question.firebasestorage.app",
  messagingSenderId: "819108968599",
  appId: "1:819108968599:web:ff53dbcb2925aa347211d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

module.exports = db;
