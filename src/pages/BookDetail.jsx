import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { getBook, deleteBook } from "../firebase/bookService";

export default function BookDetail() {
  const { id }  = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [book,     setBook]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [error,    setError]    = useState("");

  const successMsg = location.state?.message || "";

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const data = await getBook(id);
        if (!data) { setError("Book not found."); return; }
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load book.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteBook(id);
      navigate("/books", { state: { message: `"${book.title}" deleted.` } });
    } catch (err) {
      console.error(err);
      setError("Delete failed.");
      setDeleting(false);
    }
  }

  const stars = (r) =>
    r ? "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r)) : null;

  if (loading) return (
    <main className="container page">
      <div className="spinner-wrap"><div className="spinner" /></div>
    </main>
  );

  if (error) return (
    <main className="container page">
      <div className="alert alert-error">{error}</div>
      <Link to="/books" className="btn btn-outline">← Back</Link>
    </main>
  );

  return (
    <main className="container page">

      <Link to="/books" className="btn btn-ghost" style={{ marginBottom: 8, display: "inline-flex" }}>
        ← Back to Library
      </Link>

      {successMsg && (
        <div className="alert alert-success" style={{ marginTop: 12 }}>{successMsg}</div>
      )}

      <div className="detail-card">
        {book.genre && (
          <div className="detail-genre">
            <span className="card-genre">{book.genre}</span>
          </div>
        )}

        <h1 className="detail-title">{book.title}</h1>
        <p  className="detail-author">by <strong>{book.author}</strong></p>

        <div className="detail-meta">
          {book.year && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Published</span>
              <span className="detail-meta-value">{book.year}</span>
            </div>
          )}
          {book.rating && (
            <div className="detail-meta-item">
              <span className="detail-meta-label">Rating</span>
              <span className="detail-meta-value">
                <span className="stars">{stars(book.rating)}</span>
                <span style={{ marginLeft: 6, color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                  ({book.rating}/5)
                </span>
              </span>
            </div>
          )}
          <div className="detail-meta-item">
            <span className="detail-meta-label">Document ID</span>
            <span className="detail-meta-value"
              style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {book.id}
            </span>
          </div>
        </div>

        {book.description && (
          <p className="detail-description">{book.description}</p>
        )}

        <div className="detail-actions">
          <Link to={`/books/${id}/edit`} className="btn btn-primary">Edit Book</Link>
          <button className="btn btn-danger" onClick={() => setConfirm(true)}>Delete</button>
        </div>
      </div>

      {confirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Book?</h3>
            <p>
              Permanently delete{" "}
              <strong style={{ color: "var(--text-primary)" }}>"{book.title}"</strong>?
              This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirm(false)} disabled={deleting}>Cancel</button>
              <button className="btn btn-danger"  onClick={handleDelete}            disabled={deleting}>
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
