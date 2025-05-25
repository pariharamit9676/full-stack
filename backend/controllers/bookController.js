const db = require("../config/db");



exports.getAllBooks = async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books");
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching all books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Total books count query
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM books");
    const totalBooks = countResult[0].total;
    const totalPages = Math.ceil(totalBooks / limit);

    // Paginated books query
    const [books] = await db.query("SELECT * FROM books LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);

    res.json({
      books,
      totalPages,
      currentPage: page,
      totalBooks,
    });
  } catch (error) {
    console.error("Error fetching books with pagination:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const [rows] = await db.query(
      `SELECT 
        b.id AS book_id,
        b.title AS book_title,
        b.author,
        b.genre,
        b.description,
        b.thumbnail,
        r.id AS review_id,
        r.rating,
        r.comment,
        r.created_at AS review_date,
        u.id AS user_id,
        u.name AS reviewer_name,
        u.email AS reviewer_email
      FROM books b
      LEFT JOIN reviews r ON b.id = r.book_id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE b.id = ? ORDER BY r.created_at DESC;`,
      [bookId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Extract book data from the first row
    const bookData = {
      id: rows[0].book_id,
      title: rows[0].book_title,
      author: rows[0].author,
      genre: rows[0].genre,
      description: rows[0].description,
      thumbnail: rows[0].thumbnail,
      average_rating: rows[0].average_rating,
    };

    // Extract reviews separately
    const reviews = rows
      .filter(row => row.review_id) // filter rows having reviews
      .map(row => ({
        review_id: row.review_id,
        rating: row.rating,
        comment: row.comment,
        review_date: row.review_date,
        user_id: row.user_id,
        reviewer_name: row.reviewer_name,
        reviewer_email: row.reviewer_email,
      }));

      console.log("Book data:", bookData);
    console.log("Reviews:", reviews);
    res.status(200).json({
      book: bookData,
      reviews: reviews,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre } = req.body;

    const thumbnail = req.file.filename;

    console.log("thumbnail:", thumbnail);
    // Validation (basic)
    if (!title || !author || !genre || !description || !thumbnail) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const [result] = await db.query(
      "INSERT INTO books (title, author, genre, description, thumbnail) VALUES (?, ?, ?, ?,?)",
      [title, author, genre, description || "", thumbnail || ""]
    );

    res.status(201).json({
      message: "Book added successfully",
      bookId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/reviewController.js
exports.addReview = async (req, res) => {

   console.log("adding review:", req.params);
  try {
    const bookId = req.params.id;
    const userId = req.user?.id || 1; // Use req.user.id if using auth middleware; fallback for testing
    const { rating, comment } = req.body;


    if (!bookId || !rating || !comment) {
      return res.status(400).json({ message: "Book ID, rating, and comment are required." });
    }

    // Insert new review
    const [result] = await db.query(
      `INSERT INTO reviews (book_id, user_id, rating, comment, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [bookId, userId, rating, comment]
    );

    // Fetch the inserted review with user info
    const [reviewData] = await db.query(
      `SELECT 
        r.id AS review_id,
        r.rating,
        r.comment,
        r.created_at AS review_date,
        u.id AS user_id,
        u.name AS reviewer_name,
        u.email AS reviewer_email
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [result.insertId]
    );

    res.status(201).json(reviewData[0]);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

