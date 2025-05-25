import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BookListPage from "./pages/BookListPage";
// import BookDetailPage from "./pages/BookDetailPage";
// import AddReviewPage from "./pages/AddReviewPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
         <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
        {/* <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/books/:id/review" element={<AddReviewPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
