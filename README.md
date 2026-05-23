# 📚 BookShelf — React + Firebase CRUD & Auth SPA

**Web Engineering — Assignment 03 & 04**
**University of Lahore | BSCS | Spring 2026**

---

## 🔗 Links

- **Live URL:** https://book-library-4004.web.app
- **GitHub:** https://github.com/70151023-cpu/Book-Library

---

## 📖 About

BookShelf is a Single Page Application (SPA) built with React and Firebase.
It allows users to manage a personal book library with full CRUD operations,
Firebase Authentication, Role-Based Access Control, and Real-Time Chat.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI framework |
| React Router DOM v6 | SPA Routing & Protected Routes |
| Firebase Authentication | Email, Password & Google Sign-In |
| Firebase Firestore | NoSQL Database (CRUD + Chat) |
| Firebase Hosting | Live Deployment |
| Vite | Build Tool |

---

## 🗺️ Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/signup` | Sign Up | Public |
| `/reset-password` | Reset Password | Public |
| `/dashboard` | User Dashboard | Logged-in users |
| `/books` | All Books | Logged-in users |
| `/books/new` | Add Book | Logged-in users |
| `/books/:id` | Book Detail | Logged-in users |
| `/books/:id/edit` | Edit Book | Logged-in users |
| `/chat` | Chat | Logged-in users |
| `/admin` | Admin Dashboard | Admin only |

---

## ✅ Features

### Assignment 03 — CRUD
- Create a book with form validation
- Read all books in card grid layout
- Read single book via dynamic route `/books/:id`
- Update a book with pre-filled form
- Delete a book with confirmation modal
- Search and filter books

### Assignment 04 — Auth & Security
- Email & Password Sign Up / Sign In
- Google Sign-In
- Reset Password via email
- Delete Account
- User data stored in Firestore
- No duplicate user records
- Role-Based Protected Routing
- Admin Dashboard — view all users and books
- User Dashboard — view own books and stats
- Admin can manage all books
- User can manage only their own books
- Real-time chat between registered users

---

## 📁 Project Structure

```
book-library/
├── index.html
├── package.json
├── vite.config.js
├── firebase.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── context/
    │   └── AuthContext.jsx
    ├── firebase/
    │   ├── config.js
    │   ├── authService.js
    │   ├── bookService.js
    │   └── chatService.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── BookForm.jsx
    │   └── ProtectedRoute.jsx
    └── pages/
        ├── Home.jsx
        ├── AllBooks.jsx
        ├── CreateBook.jsx
        ├── BookDetail.jsx
        ├── EditBook.jsx
        ├── auth/
        │   ├── Login.jsx
        │   ├── SignUp.jsx
        │   └── ResetPassword.jsx
        ├── user/
        │   └── UserDashboard.jsx
        ├── admin/
        │   └── AdminDashboard.jsx
        └── chat/
            └── Chat.jsx
```

---

## 🚀 How to Run Locally

**1. Clone the repository:**
```
git clone https://github.com/70151023-cpu/Book-Library.git
```

**2. Install dependencies:**
```
npm install
```

**3. Add Firebase config in `src/firebase/config.js`**

**4. Start the app:**
```
npm run dev
```

**5. Open in browser:**
```
http://localhost:5173
```

---

## 🌐 Deployment

**Build:**
```
npm run build
```

**Deploy to Firebase Hosting:**
```
firebase deploy
```

---

## 👑 How to Set Admin Role

1. Go to Firebase Console
2. Open Firestore Database
3. Open `users` collection
4. Find your user document
5. Change `role` field from `"user"` to `"admin"`
6. Refresh the app

---

## 👤 Student Info

- **Name:** Haid Ali
- **Roll No:** 70151023
- **Subject:** Web Engineering
- **Assignments:** 03 & 04
- **University:** University of Lahore
- **Semester:** Spring 2026
