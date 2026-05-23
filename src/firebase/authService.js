import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";

const googleProvider = new GoogleAuthProvider();

// ── Save user to Firestore (no duplicates) ──────────────────
export async function saveUserToFirestore(user, role = "user") {
  const ref  = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid:       user.uid,
      email:     user.email,
      name:      user.displayName || "",
      role,
      createdAt: serverTimestamp(),
    });
  }
  return (await getDoc(ref)).data();
}

// ── Email Sign Up ───────────────────────────────────────────
export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const data = await saveUserToFirestore(cred.user, "user");
  return { user: cred.user, userData: data };
}

// ── Email Sign In ───────────────────────────────────────────
export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const ref  = doc(db, "users", cred.user.uid);
  const snap = await getDoc(ref);
  return { user: cred.user, userData: snap.data() };
}

// ── Google Sign In ──────────────────────────────────────────
export async function googleSignIn() {
  const cred = await signInWithPopup(auth, googleProvider);
  const data = await saveUserToFirestore(cred.user, "user");
  return { user: cred.user, userData: data };
}

// ── Sign Out ────────────────────────────────────────────────
export async function logOut() {
  return signOut(auth);
}

// ── Reset Password ──────────────────────────────────────────
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

// ── Delete Account ──────────────────────────────────────────
export async function deleteAccount() {
  const user = auth.currentUser;
  if (user) await deleteUser(user);
}

// ── Get user role from Firestore ────────────────────────────
export async function getUserRole(uid) {
  const ref  = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().role : "user";
}
