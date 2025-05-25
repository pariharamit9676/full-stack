// src/hooks/useBooks.js
import { useEffect, useState } from "react";
import { getAllBooks, addBook } from "../api/bookService";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    thumbnail: "",
    description: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
      
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

const handleAddBook = async () => {
  try {
    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("genre", newBook.genre);
    formData.append("description", newBook.description);
    formData.append("thumbnail", newBook.thumbnail);

    await addBook(formData); 
    setShowModal(false);
    setNewBook({ title: "", author: "", genre: "", thumbnail: "", description: "" });
    setPage(1);
  } catch (error) {
    console.error("Failed to add book", error);
  }
};


  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (genreFilter === "" || book.genre === genreFilter)
  );

  return {
    books,
    filteredBooks,
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
    showModal,
    setShowModal,
    newBook,
    setNewBook,
    handleAddBook,
  };
};

export default useBooks;
