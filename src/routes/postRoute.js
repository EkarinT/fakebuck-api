const express = require('express');

const likeController = require('../controllers/likeController');
const postController = require('../controllers/postController');
const upload = require('../middleware/upload');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.route('/').post(upload.single('image'), postController.createPost);
router.post('/:id/likes', likeController.toggleLike);
router.post('/:id/comments', commentController.createComment);
module.exports = router;
