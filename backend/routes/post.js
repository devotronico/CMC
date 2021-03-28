const express = require('express');
const postController = require('../controllers/post-controllers');

const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/post/test
 * @desc    TEST
 * @webpage /test
 * @action  test
 * @access  public
 */
router.get('/test', postController.test);

/**
 * @route   POST /api/post
 * @desc    Crea articolo
 * @webpage /post/create
 * @action  createPost
 * @access  private
 */
router.post(
  '/',
  [
    authJwt,
    check('title', 'Il Titolo è richiesto').exists(),
    check('text', 'Il Testo è richiesto').exists()
  ],
  postController.createPost
);

/**
 * @route   GET /api/post/:id
 * @desc    Ottiene un post
 * @webpage /post
 * @action  readPost
 * @access  public
 */
router.get('/:id', postController.readPost);

/**
 * @route   PUT /api/post
 * @desc    Modifica un articolo
 * @webpage /post
 * @action  updatePost
 * @access  private
 */
router.put(
  '/:id',
  [
    authJwt,
    check('title', 'Il Titolo è richiesto').exists(),
    check('text', 'Il Testo è richiesto').exists()
  ],
  postController.updatePost
);

/**
 * @route   DELETE /api/post/:id
 * @desc    Cancellare un Post
 * @webpage /post
 * @action  deletePost
 * @access  private
 */
router.delete('/:id', authJwt, postController.deletePost);

module.exports = router;
