import useBooks from "../hooks/useBooks";
import { useUser } from "../context/UserContext";
import BookHeader from "../components/BookHeader";
import BookSearchFilter from "../components/BookSearchFilter";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";

const BookListPage = () => {
  const {
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
    showModal,
    setShowModal,
    newBook,
    setNewBook,
    handleAddBook,
    filteredBooks,
    books,
  } = useBooks();

  const { isAdmin } = useUser();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <BookHeader isAdmin={isAdmin} onAddClick={() => setShowModal(true)} />
        <BookSearchFilter
          search={search}
          setSearch={setSearch}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          books={books}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        {showModal && (
          <AddBookModal
            newBook={newBook}
            setNewBook={setNewBook}
            onClose={() => setShowModal(false)}
            onAdd={handleAddBook}
          />
        )}
      </div>
    </div>
  );
};

export default BookListPage;
