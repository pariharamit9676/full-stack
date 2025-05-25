const BookSearchFilter = ({ search, setSearch, genreFilter, setGenreFilter, books }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input
      className="flex-1 border border-gray-300 p-3 rounded shadow-sm"
      placeholder="Search books..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <select
      className="flex-1 border border-gray-300 p-3 rounded shadow-sm"
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
    >
      <option value="">All Genres</option>
      {[...new Set(books.map((b) => b.genre))].map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  </div>
);

export default BookSearchFilter;
