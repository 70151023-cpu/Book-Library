import { useState } from "react";

const GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
  "Mystery", "Thriller", "Romance", "Horror",
  "Biography", "Self-Help", "History", "Science",
];

const DEFAULT = { title: "", author: "", genre: "", year: "", rating: "", description: "" };

export default function BookForm({ initialData = DEFAULT, onSubmit, loading }) {
  const [form,   setForm]   = useState({ ...DEFAULT, ...initialData });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim())  errs.title  = "Title is required";
    if (!form.author.trim()) errs.author = "Author is required";
    if (!form.genre)         errs.genre  = "Genre is required";
    if (form.year && (isNaN(form.year) || form.year < 1000 || form.year > 2100))
      errs.year = "Enter a valid year";
    if (form.rating && (isNaN(form.rating) || form.rating < 1 || form.rating > 5))
      errs.rating = "Rating must be between 1 and 5";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({
      ...form,
      year:   form.year   ? Number(form.year)   : null,
      rating: form.rating ? Number(form.rating) : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" name="title" value={form.title} onChange={handleChange} />
          {errors.title && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 4 }}>{errors.title}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Author *</label>
          <input className="form-input" name="author" value={form.author} onChange={handleChange} />
          {errors.author && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 4 }}>{errors.author}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Genre *</label>
          <select className="form-select" name="genre" value={form.genre} onChange={handleChange}>
            <option value="">Select genre</option>
            {GENRES.map((g) => <option key={g}>{g}</option>)}
          </select>
          {errors.genre && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 4 }}>{errors.genre}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Year Published</label>
          <input className="form-input" type="number" name="year" value={form.year}
            onChange={handleChange} min="1000" max="2100" />
          {errors.year && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 4 }}>{errors.year}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Rating (1–5)</label>
        <input className="form-input" type="number" name="rating" value={form.rating}
          onChange={handleChange} min="1" max="5" step="0.5" />
        {errors.rating && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 4 }}>{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving…" : "Save Book"}
        </button>
      </div>

    </form>
  );
}
