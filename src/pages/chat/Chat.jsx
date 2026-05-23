import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllUsers, getChatRoomId,
  sendMessage, subscribeToMessages,
} from "../../firebase/chatService";

export default function Chat() {
  const { currentUser, userData } = useAuth();
  const [users,       setUsers]       = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages,    setMessages]    = useState([]);
  const [text,        setText]        = useState("");
  const [loading,     setLoading]     = useState(true);
  const bottomRef = useRef(null);

  // Load all users except self
  useEffect(() => {
    getAllUsers().then((all) => {
      setUsers(all.filter((u) => u.uid !== currentUser.uid));
      setLoading(false);
    });
  }, [currentUser]);

  // Subscribe to messages when user is selected
  useEffect(() => {
    if (!selectedUser) return;
    const roomId = getChatRoomId(currentUser.uid, selectedUser.uid);
    const unsub  = subscribeToMessages(roomId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    });
    return unsub;
  }, [selectedUser, currentUser]);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const roomId = getChatRoomId(currentUser.uid, selectedUser.uid);
    await sendMessage(roomId, currentUser.uid, userData?.name || currentUser.email, text.trim());
    setText("");
  }

  return (
    <main className="container page">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Chat</h1>
          <p>Real-time messaging with other users</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, height: 520 }}>

        {/* User list */}
        <div className="card" style={{ padding: 0, overflowY: "auto" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
            Users
          </div>
          {loading ? (
            <div style={{ padding: 20 }}><div className="spinner" style={{ margin: "0 auto" }} /></div>
          ) : users.length === 0 ? (
            <p style={{ padding: 16, fontSize: "0.88rem" }}>No other users found.</p>
          ) : (
            users.map((u) => (
              <div
                key={u.uid}
                onClick={() => { setSelectedUser(u); setMessages([]); }}
                style={{
                  padding: "12px 16px", cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                  background: selectedUser?.uid === u.uid ? "var(--bg-elevated)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                  {u.name || u.email}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{u.role}</div>
              </div>
            ))
          )}
        </div>

        {/* Chat window */}
        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>
            {selectedUser ? `Chat with ${selectedUser.name || selectedUser.email}` : "Select a user to start chatting"}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {!selectedUser && (
              <p style={{ margin: "auto", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                👈 Select a user from the list
              </p>
            )}
            {selectedUser && messages.length === 0 && (
              <p style={{ margin: "auto", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                No messages yet. Say hi!
              </p>
            )}
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUser.uid;
              return (
                <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "70%", padding: "9px 14px", borderRadius: 12,
                    background: isMe ? "var(--accent)" : "var(--bg-elevated)",
                    color:      isMe ? "#0d0d0d"       : "var(--text-primary)",
                    fontSize: "0.9rem", lineHeight: 1.5,
                  }}>
                    {!isMe && (
                      <div style={{ fontSize: "0.72rem", fontWeight: 600, marginBottom: 4, color: isMe ? "#0d0d0d" : "var(--text-muted)" }}>
                        {msg.senderName}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {selectedUser && (
            <form onSubmit={handleSend} style={{ display: "flex", gap: 10, padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
              <input
                className="form-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message…"
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" type="submit" disabled={!text.trim()}>
                Send
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
