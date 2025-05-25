const Pagination = ({ page, totalPages, onPrev, onNext, setPage }) => (
  <div className="flex justify-center items-center gap-4 mt-8">
    <button
      onClick={onPrev}
      disabled={page === 1}
      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setPage(i + 1)}
        className={`px-3 py-2 rounded ${
          page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={onNext}
      disabled={page === totalPages}
      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
