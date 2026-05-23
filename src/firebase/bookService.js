import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy, where,
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION = "books";

// ── CREATE ──────────────────────────────────────────────────
export async function createBook(bookData, userId) {
  return addDoc(collection(db, COLLECTION), {
    ...bookData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ── READ ALL (admin sees all, user sees own) ─────────────────
export async function getAllBooks(role, userId) {
  let q;
  if (role === "admin") {
    q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(db, COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── READ ONE ────────────────────────────────────────────────
export async function getBook(id) {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ── UPDATE ──────────────────────────────────────────────────
export async function updateBook(id, updates) {
  return updateDoc(doc(db, COLLECTION, id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

// ── DELETE ──────────────────────────────────────────────────
export async function deleteBook(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
