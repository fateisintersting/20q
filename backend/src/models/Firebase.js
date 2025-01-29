const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

module.exports = db;
