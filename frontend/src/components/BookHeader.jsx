const BookHeader = ({ isAdmin, onAddClick }) => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Book Library</h1>
    {isAdmin && (
      <div className="text-right mb-4">
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          + Add Book
        </button>
      </div>
    )}
  </>
);

export default BookHeader;
