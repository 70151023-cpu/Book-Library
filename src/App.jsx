import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import CreateBook from "./pages/CreateBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/books"          element={<AllBooks />} />
        <Route path="/books/new"      element={<CreateBook />} />
        <Route path="/books/:id"      element={<BookDetail />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}