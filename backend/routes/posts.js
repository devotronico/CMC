const express = require('express');
const postsController = require('../controllers/posts-controllers');

const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/posts/test
 * @desc    TEST
 * @webpage /test
 * @action  test
 * @access  public
 */
router.get('/test', postsController.test);

/**
 * @route   POST /api/posts
 * @desc    Crea articoli
 * @webpage /posts
 * @action  createPosts
 * @access  private
 */
router.post(
  '/',
  [
    authJwt,
    check('title', 'Il Titolo è richiesto').exists(),
    check('text', 'Il Testo è richiesto').exists()
  ],
  postsController.createPosts
);

/**
 * @route   GET /api/posts
 * @desc    Ottiene tutti i post
 * @webpage /posts
 * @action  getPosts
 * @access  public
 */
router.get('/', postsController.getPosts);

/**
 * @route   DELETE /api/posts
 * @desc    Cancella tutti i post
 * @webpage /posts
 * @action  deletePosts
 * @access  private
 */
router.delete('/', authJwt, postsController.deletePosts);

module.exports = router;
