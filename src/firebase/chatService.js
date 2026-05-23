import {
  collection, addDoc, query, orderBy,
  onSnapshot, serverTimestamp, getDocs,
} from "firebase/firestore";
import { db } from "./config";

export function getChatRoomId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

export async function sendMessage(roomId, senderId, senderName, text) {
  return addDoc(collection(db, "chats", roomId, "messages"), {
    senderId,
    senderName,
    text,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(roomId, callback) {
  const q = query(
    collection(db, "chats", roomId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

export async function getAllUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}