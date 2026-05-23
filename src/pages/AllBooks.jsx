import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks, deleteBook } from "../firebase/bookService";
import { useAuth } from "../context/AuthContext";

function ConfirmModal({ book, onConfirm, onCancel, loading }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Book?</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong style={{ color: "var(--text-primary)" }}>"{book.title}"</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}  disabled={loading}>Cancel</button>
          <button className="btn btn-danger"  onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AllBooks() {
  const { currentUser, userData } = useAuth();
  const [books,    setBooks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message,  setMessage]  = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    try {
      const data = await getAllBooks(userData?.role, currentUser?.uid);
      setBooks(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load books. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteBook(toDelete.id);
      setBooks((prev) => prev.filter((b) => b.id !== toDelete.id));
      setMessage(`"${toDelete.title}" deleted successfully.`);
      setToDelete(null);
    } catch (err) {
      console.error(err);
      setMessage("Delete failed. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  const filtered = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase()) ||
      b.genre?.toLowerCase().includes(search.toLowerCase())
  );

  const stars = (r) =>
    r ? "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r)) : "";

  return (
    <main className="container page">

      <div className="page-header">
        <div className="page-header-text">
          <h1>All Books</h1>
          <p>{books.length} book{books.length !== 1 ? "s" : ""} in your library</p>
        </div>
        <Link to="/books/new" className="btn btn-primary">+ Add Book</Link>
      </div>

      {message && (
        <div className={`alert ${message.includes("Failed") || message.includes("failed") ? "alert-error" : "alert-success"}`}>
          {message}
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => setMessage("")}>X</button>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="search-bar" style={{ marginTop: 20 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by title, author, genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading && (
        <div className="spinner-wrap"><div className="spinner" /></div>
      )}

      {!loading && books.length === 0 && (
        <div className="empty-state">
          <h2>No books yet</h2>
          <p>Add your first book to get started.</p>
          <Link to="/books/new" className="btn btn-primary">Add Book</Link>
        </div>
      )}

      {!loading && books.length > 0 && filtered.length === 0 && (
        <div className="empty-state">
          <h2>No results found</h2>
          <p>Try a different search term.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card-grid">
          {filtered.map((book) => (
            <div key={book.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
              {book.genre  && <span className="card-genre">{book.genre}</span>}
              <h3 className="card-title">{book.title}</h3>
              <p  className="card-author">by {book.author}</p>
              {book.rating && (
                <div className="stars" style={{ fontSize: "0.85rem", marginBottom: 8 }}>
                  {stars(book.rating)}
                </div>
              )}
              {book.description && <p className="card-desc">{book.description}</p>}
              <div className="card-actions">
                <Link to={`/books/${book.id}`}      className="btn btn-outline btn-sm">View</Link>
                <Link to={`/books/${book.id}/edit`} className="btn btn-ghost   btn-sm">Edit</Link>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginLeft: "auto" }}
                  onClick={() => setToDelete(book)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toDelete && (
        <ConfirmModal
          book={toDelete}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          loading={deleting}
        />
      )}

    </main>
  );
}