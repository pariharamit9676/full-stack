const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/multer');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/admin');

router.use(verifyToken);
router.get('/', bookController.getBooks);
router.get('/getAllBooks', bookController.getAllBooks);
router.get('/:id', bookController.getBook);
router.post('/reviews/:id', bookController.addReview);
router.post('/', isAdmin, upload.single('thumbnail'), bookController.addBook);

module.exports = router;
