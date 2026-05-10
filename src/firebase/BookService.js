import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION = "books";

// ── CREATE ──────────────────────────────────────────
export async function createBook(bookData) {
  return addDoc(collection(db, COLLECTION), {
    ...bookData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ── READ ALL ─────────────────────────────────────────
export async function getAllBooks() {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ── READ ONE ─────────────────────────────────────────
export async function getBook(id) {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ── UPDATE ───────────────────────────────────────────
export async function updateBook(id, updates) {
  const docRef = doc(db, COLLECTION, id);
  return updateDoc(docRef, { ...updates, updatedAt: serverTimestamp() });
}

// ── DELETE ───────────────────────────────────────────
export async function deleteBook(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}