import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAllBooks } from "../../firebase/bookService";

export default function AdminDashboard() {
  const [users,   setUsers]   = useState([]);
  const [books,   setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [userSnap, bookData] = await Promise.all([
        getDocs(collection(db, "users")),
        getAllBooks("admin", null),
      ]);
      setUsers(userSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setBooks(bookData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount  = users.filter((u) => u.role === "user").length;

  return (
    <main className="container page">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Admin Dashboard</h1>
          <p>Full system overview and management</p>
        </div>
        <Link to="/books" className="btn btn-primary">Manage Books</Link>
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, margin: "28px 0" }}>
            {[
              { label: "Total Users",  value: users.length },
              { label: "Admins",       value: adminCount   },
              { label: "Normal Users", value: userCount    },
              { label: "Total Books",  value: books.length },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent)" }}>{s.value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Users table */}
          <h2 style={{ marginBottom: 16 }}>Registered Users</h2>
          <div className="card" style={{ overflowX: "auto", padding: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Name", "Email", "Role", "UID"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 16px", fontSize: "0.9rem" }}>{u.name || "—"}</td>
                    <td style={{ padding: "12px 16px", fontSize: "0.9rem" }}>{u.email}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: "0.75rem", fontWeight: 600, padding: "2px 10px",
                        borderRadius: 999,
                        background: u.role === "admin" ? "var(--accent-dim)" : "var(--bg-elevated)",
                        color:      u.role === "admin" ? "var(--accent)"     : "var(--text-secondary)",
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{u.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
