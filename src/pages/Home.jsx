import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../firebase/bookService";

export default function Home() {
  const [count, setCount] = useState("…");

  useEffect(() => {
    getAllBooks()
      .then((books) => setCount(books.length))
      .catch(() => setCount("?"));
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <span className="hero-eyebrow">Your Personal Library</span>
        <h1>Manage Your Book<br />Collection with Ease</h1>
        <p>
          Add, organize, and track every book you have read or want to read.
          Built with React and Firebase Firestore.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/books/new" className="btn btn-primary btn-lg">
            + Add First Book
          </Link>
          <Link to="/books" className="btn btn-outline btn-lg">
            Browse Library →
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">{count}</div>
            <div className="hero-stat-label">Books in Library</div>
          </div>
          <div>
            <div className="hero-stat-value">CRUD</div>
            <div className="hero-stat-label">Full Operations</div>
          </div>
          <div>
            <div className="hero-stat-value">SPA</div>
            <div className="hero-stat-label">React Router DOM</div>
          </div>
          <div>
            <div className="hero-stat-value">🔥</div>
            <div className="hero-stat-label">Firebase Firestore</div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 60,
        }}
      >
        {[
          { icon: "📖", title: "Browse All Books",  desc: "View your entire collection in a clean card grid.",                       to: "/books"     },
          { icon: "✍️", title: "Add a Book",         desc: "Fill in a form and save directly to Firestore.",                          to: "/books/new" },
          { icon: "🔍", title: "Single Book View",  desc: "Click any book to see its full details page via dynamic route.",          to: "/books"     },
          { icon: "✏️", title: "Edit & Delete",      desc: "Update or remove any book with instant UI feedback.",                     to: "/books"     },
        ].map((f) => (
          <Link to={f.to} key={f.title} className="card" style={{ display: "block" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p style={{ fontSize: "0.88rem", marginTop: 6 }}>{f.desc}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}