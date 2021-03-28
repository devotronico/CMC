const express = require('express');
const commentsController = require('../controllers/comments-controllers');

const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/comments/test
 * @desc    TEST
 * @webpage /test
 * @action  test
 * @access  Public
 */
router.get('/test', commentsController.test);

/**
 * @route   POST /api/comments
 * @desc    Crea articoli
 * @webpage /comments
 * @action  createComments
 * @access  Public
 */
router.post(
  '/',
  [
    authJwt,
    check('title', 'Il Titolo è richiesto').exists(),
    check('text', 'Il Testo è richiesto').exists(),
  ],
  commentsController.createComments
);

/**
 * @route   GET /api/comments
 * @desc    Ottiene tutti i post
 * @webpage /comments
 * @action  getComments
 * @access  Public
 */
router.get('/', commentsController.getComments);

/**
 * @route   DELETE /api/comments
 * @desc    Cancella tutti i post
 * @webpage /comments
 * @action  deleteComments
 * @access  Public
 */
router.delete('/', authJwt, commentsController.deleteComments);

module.exports = router;
