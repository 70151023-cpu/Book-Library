import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../firebase/authService";

export default function ResetPassword() {
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Check the email address.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container page">
      <div className="form-card" style={{ marginTop: 60 }}>
        <h2 style={{ marginBottom: 8, textAlign: "center" }}>Reset Password</h2>
        <p style={{ textAlign: "center", marginBottom: 24, fontSize: "0.9rem" }}>
          Enter your email and we will send you a reset link.
        </p>

        {message && <div className="alert alert-success">{message}</div>}
        {error   && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.9rem" }}>
          <Link to="/login">← Back to Sign In</Link>
        </p>
      </div>
    </main>
  );
}
