import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, googleSignIn } from "../../firebase/authService";

export default function SignUp() {
  const [form,    setForm]    = useState({ name: "", email: "", password: "" });
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
      await signUp(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
        <h2 style={{ marginBottom: 24, textAlign: "center" }}>Create Account</h2>

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
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", margin: "16px 0", color: "var(--text-muted)" }}>or</div>

        <button className="btn btn-outline btn-full" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </main>
  );
}
