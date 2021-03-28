const express = require('express');
const commentController = require('../controllers/comment-controllers');

const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/comment/test
 * @desc    TEST
 * @webpage /test
 * @action  test
 * @access  Public
 */
router.get('/test', commentController.test);

/**
 * @route   POST /api/comment
 * @desc    Crea Commento del Post
 * @webpage /post
 * @action  createComment
 * @access  private
 */
// router.post('/', authJwt, commentController.createComment);
router.post(
  '/',
  [
    authJwt,
    check('text', 'Il Testo è richiesto').exists(),
    check('post_id', `L id del Post è richiesto`).exists()
  ],
  commentController.createComment
);

/**
 * @route   GET /api/comment/:id
 * @desc    Ottiene un comment
 * @webpage /comment
 * @action  readComment
 * @access  Public
 */
router.get('/:id', commentController.readComment);

/**
 * @route   PUT /api/comment
 * @desc    Modifica un articolo
 * @webpage /comment
 * @action  updateComment
 * @access  Public
 */
router.put(
  '/:id',
  [
    authJwt,
    check('title', 'Il Titolo è richiesto').exists(),
    check('text', 'Il Testo è richiesto').exists()
  ],
  commentController.updateComment
);

/**
 * @route   DELETE /api/comment/:id
 * @desc    Cancellare un comment
 * @webpage /comment
 * @action  deleteComment
 * @access  Public
 */
router.delete('/:id', authJwt, commentController.deleteComment);

module.exports = router;
