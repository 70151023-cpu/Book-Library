import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Auth pages
import Login          from "./pages/auth/Login";
import SignUp         from "./pages/auth/SignUp";
import ResetPassword  from "./pages/auth/ResetPassword";

// Dashboard pages
import UserDashboard  from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Book pages
import Home       from "./pages/Home";
import AllBooks   from "./pages/AllBooks";
import CreateBook from "./pages/CreateBook";
import BookDetail from "./pages/BookDetail";
import EditBook   from "./pages/EditBook";

// Chat
import Chat from "./pages/chat/Chat";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* Public routes */}
          <Route path="/"               element={<Home />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/signup"         element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected — any logged-in user */}
          <Route path="/dashboard"      element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/books"          element={<ProtectedRoute><AllBooks /></ProtectedRoute>} />
          <Route path="/books/new"      element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
          <Route path="/books/:id"      element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
          <Route path="/books/:id/edit" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
          <Route path="/chat"           element={<ProtectedRoute><Chat /></ProtectedRoute>} />

          {/* Admin only */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}