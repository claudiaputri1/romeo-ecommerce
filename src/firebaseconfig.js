// Firebase Configuration for ROMEO E-commerce

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyAWXBm0LdGwJLMZxcr9wy2jGYO0m-9_458",
  authDomain: "romeo-id.firebaseapp.com",
  projectId: "romeo-id",
  storageBucket: "romeo-id.firebasestorage.app",
  messagingSenderId: "601438261526",
  appId: "1:601438261526:web:8575b91c22ea73f0910037",
  measurementId: "G-R8W1LWRGKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const addProduct = async (product) => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
};

export { db, auth, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, addProduct };