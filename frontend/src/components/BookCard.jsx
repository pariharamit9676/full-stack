import { Link } from "react-router-dom";

const BookCard = ({ book }) => (
  <Link
    to={`/books/${book.id}`}
    className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
  >
    <img src={book.thumbnail} alt={book.title} className="w-full h-56 object-cover" />
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
      <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full w-fit mb-2">
        {book.genre}
      </span>
      <p className="text-sm text-gray-700 line-clamp-3">{book.description}</p>
    </div>
  </Link>
);

export default BookCard;
