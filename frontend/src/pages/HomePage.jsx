import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../components/Pagination'; // adjust path if needed

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/books?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            BookStore
          </Link>
          <div>
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3">Home</Link>
            <Link to="/books" className="text-gray-700 hover:text-blue-600 px-3">All Books</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <header className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover Your Next Favorite Book</h1>
        <p className="text-lg max-w-xl mx-auto">
          Explore our curated collection of books and dive into new adventures, stories, and knowledge.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Featured Books</h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading books...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {books.map((book) => (
                <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {book.thumbnail && (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-700 text-sm mb-2">by {book.author}</p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{book.description}</p>
                    <Link
                      to={`/books/${book.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
                setPage={setPage}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
