import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById, submitReview } from "../api/bookService";
import { useUser } from "../context/UserContext";

export const useBookDetails = () => {
  const { id } = useParams();
  const { currentUser } = useUser();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData.book);
        setReviews(bookData.reviews || []);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please fill in your comment.");
      return;
    }

    const optimisticReview = {
      review_id: Date.now(),
      rating: parseInt(rating),
      comment: comment.trim(),
      review_date: new Date().toISOString(),
      user_id: currentUser.id,
      reviewer_name: currentUser.name,
      reviewer_email: currentUser.email,
    };

    setReviews((prev) => [optimisticReview, ...prev]);

    setRating(5);
    setComment("");

    try {
      const savedReview = await submitReview(id, {
        rating: optimisticReview.rating,
        comment: optimisticReview.comment,
      });

      setReviews((prev) => {
        const filtered = prev.filter(r => r.review_id !== optimisticReview.review_id);
        return [savedReview, ...filtered];
      });
    } catch (error) {
      console.error("Failed to post review:", error);
      alert("Failed to add review. Please try again.");

      setReviews((prev) => prev.filter(r => r.review_id !== optimisticReview.review_id));
    }
  };

  return {
    book,
    reviews,
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
  };
};
