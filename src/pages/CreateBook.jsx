import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookForm from "../components/bookForm";
import { createBook } from "../firebase/bookService";

export default function CreateBook() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const navigate = useNavigate();

  async function handleSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const docRef = await createBook(data);
      navigate(`/books/${docRef.id}`, {
        state: { message: "Book added successfully!" },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to save. Check your Firebase configuration and try again.");
      setLoading(false);
    }
  }

  return (
    <main className="container page">

      <div className="page-header">
        <div className="page-header-text">
          <h1>Add New Book</h1>
        </div>
        <Link to="/books" className="btn btn-outline">← Back</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <BookForm onSubmit={handleSubmit} loading={loading} />
      </div>

    </main>
  );
}
