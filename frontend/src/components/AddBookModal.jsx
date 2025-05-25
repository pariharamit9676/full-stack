const AddBookModal = ({ newBook, setNewBook, onClose, onAdd }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          className="w-full p-2 border rounded"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => setNewBook({ ...newBook, thumbnail: e.target.files[0] })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={onAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Book
        </button>
      </div>
    </div>
  </div>
);

export default AddBookModal;
