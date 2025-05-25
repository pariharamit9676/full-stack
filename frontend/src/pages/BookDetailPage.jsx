// pages/BookDetailsPage.jsx
import { Link } from "react-router-dom";
import { useBookDetails } from "../hooks/useBookDetails";

const BookDetailsPage = () => {
  const {
    book,
    reviews,
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
  } = useBookDetails();

  if (!book) return <div className="text-center mt-10 text-lg">Book not found.</div>;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <Link to="/books" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Book List
        </Link>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={"/"+book.thumbnail}
            alt={book.title}
            className="w-full md:w-64 h-96 object-cover rounded"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600 mt-1">by {book.author}</p>
            <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {book.genre}
            </span>
            <p className="mt-4 text-gray-700 text-base">{book.description}</p>
          </div>
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reviews</h2>

        {reviews.length > 0 && (
          <div className="text-gray-700 mb-4">
            Average Rating:{" "}
            <span className="text-yellow-500 font-semibold">
              {averageRating.toFixed(1)} ★
            </span>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{review.reviewer_name}</span>
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}{" "}
                    <span className="text-gray-400">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a Review</h2>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">

          <div>
            <label className="block mb-1 font-medium" htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[5, 4, 3, 2, 1].map((rate) => (
                <option key={rate} value={rate}>
                  {rate} Star{rate > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetailsPage;
