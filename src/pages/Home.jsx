import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../firebase/bookService";

export default function Home() {
  const [count, setCount] = useState("…");

  useEffect(() => {
    getAllBooks()
      .then((books) => setCount(books.length))
      .catch(() => setCount("0"));
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <span className="hero-eyebrow">Your Personal Library</span>
        <h1>BookShelf</h1>
        <p>Your personal book management system.</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/books/new" className="btn btn-primary btn-lg">+ Add Book</Link>
          <Link to="/books"     className="btn btn-outline btn-lg">View Library →</Link>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">{count}</div>
            <div className="hero-stat-label">Total Books</div>
          </div>
        </div>
      </section>
    </main>
  );
}
