const express = require('express');
const userController = require('../controllers/user-controllers');
const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/user/test
 * @desc    TEST
 * @action  test
 * @access  public
 */
router.get('/test', userController.test);

/**
 * @route   POST /api/user
 * @desc    Crea un Utente
 * @webpage /user/create
 * @action  createUser
 * @access  private
 */
router.post('/create', authJwt, userController.createUser);

/**
 * @route   GET /api/user/:id
 * @desc    Ottiene un Utente
 * @webpage /user
 * @action  getUser
 * @access  public
 */
router.get('/:id', userController.getUser);

/**
 * @route   PUT /api/user
 * @desc    Modifica un Utente
 * @webpage /user
 * @action  updateUser
 * @access  private
 */
router.put('/:id', authJwt, userController.updateUser);

/**
 * @route   DELETE /api/user/:id
 * @desc    Cancellare un Utente
 * @webpage /user
 * @action  deleteUser
 * @access  private
 */
router.delete('/:id', authJwt, userController.deleteUser);

module.exports = router;
