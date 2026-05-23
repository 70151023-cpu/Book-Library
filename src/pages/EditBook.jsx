import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BookForm from "../components/bookForm";
import { getBook, updateBook } from "../firebase/bookService";

export default function EditBook() {
  const { id }  = useParams();
  const navigate = useNavigate();

  const [book,    setBook]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");

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

  async function handleSubmit(data) {
    setSaving(true);
    setError("");
    try {
      await updateBook(id, data);
      navigate(`/books/${id}`, {
        state: { message: "Book updated successfully!" },
      });
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
      setSaving(false);
    }
  }

  if (loading) return (
    <main className="container page">
      <div className="spinner-wrap"><div className="spinner" /></div>
    </main>
  );

  if (error && !book) return (
    <main className="container page">
      <div className="alert alert-error">{error}</div>
      <Link to="/books" className="btn btn-outline">← Back</Link>
    </main>
  );

  return (
    <main className="container page">

      <div className="page-header">
        <div className="page-header-text">
          <h1>Edit Book</h1>
        </div>
        <Link to={`/books/${id}`} className="btn btn-outline">← Back</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <BookForm
          initialData={{
            title:       book.title       || "",
            author:      book.author      || "",
            genre:       book.genre       || "",
            year:        book.year        || "",
            rating:      book.rating      || "",
            description: book.description || "",
          }}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>

    </main>
  );
}
