import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllBooks } from "../../firebase/bookService";
import { deleteAccount, logOut } from "../../firebase/authService";

export default function UserDashboard() {
  const { currentUser, userData } = useAuth();
  const [books,    setBooks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [confirm,  setConfirm]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks("user", currentUser.uid)
      .then(setBooks)
      .finally(() => setLoading(false));
  }, [currentUser]);

  async function handleDeleteAccount() {
    try {
      await deleteAccount();
      await logOut();
      navigate("/login");
    } catch (err) {
      alert("Please sign in again before deleting your account.");
    }
  }

  return (
    <main className="container page">
      <div className="page-header">
        <div className="page-header-text">
          <h1>My Dashboard</h1>
          <p>Welcome, {userData?.name || currentUser.email}</p>
        </div>
        <Link to="/books/new" className="btn btn-primary">+ Add Book</Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, margin: "28px 0" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent)" }}>
            {loading ? "…" : books.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            My Books
          </div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent)" }}>
            {userData?.role || "user"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Role
          </div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent)", wordBreak: "break-all" }}>
            {currentUser.email}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Email
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 40 }}>
        <Link to="/books"    className="card" style={{ display: "block" }}><h3>📚 My Library</h3><p style={{ fontSize: "0.85rem", marginTop: 6 }}>View and manage your books</p></Link>
        <Link to="/chat"     className="card" style={{ display: "block" }}><h3>💬 Chat</h3><p style={{ fontSize: "0.85rem", marginTop: 6 }}>Message other users</p></Link>
        <Link to="/books/new" className="card" style={{ display: "block" }}><h3>➕ Add Book</h3><p style={{ fontSize: "0.85rem", marginTop: 6 }}>Add a new book</p></Link>
      </div>

      {/* Danger zone */}
      <div className="card" style={{ borderColor: "var(--danger)" }}>
        <h3 style={{ color: "var(--danger)", marginBottom: 8 }}>Danger Zone</h3>
        <p style={{ fontSize: "0.9rem", marginBottom: 16 }}>
          Permanently delete your account. This cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={() => setConfirm(true)}>
          Delete My Account
        </button>
      </div>

      {confirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Account?</h3>
            <p>This will permanently delete your account and all your data.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirm(false)}>Cancel</button>
              <button className="btn btn-danger"  onClick={handleDeleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
