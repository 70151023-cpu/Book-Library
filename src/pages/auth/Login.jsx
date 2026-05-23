import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, googleSignIn } from "../../firebase/authService";

export default function Login() {
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await signIn(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(""); setLoading(true);
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container page">
      <div className="form-card" style={{ marginTop: 60 }}>
        <h2 style={{ marginBottom: 24, textAlign: "center" }}>Sign In</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" name="password"
              value={form.password} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", margin: "16px 0", color: "var(--text-muted)" }}>or</div>

        <button className="btn btn-outline btn-full" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem" }}>
          <Link to="/reset-password">Forgot password?</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, fontSize: "0.9rem" }}>
          No account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
