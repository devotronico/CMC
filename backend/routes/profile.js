const express = require('express');
const profileController = require('../controllers/profile-controllers');
const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/profile/test
 * @desc    TEST
 * @action  test
 * @access  public
 */
router.get('/test', profileController.test);

/**
 * @route   POST /api/profile
 * @desc    Crea un Profilo
 * @webpage /profile/create
 * @action  createProfile
 * @access  private
 */
router.post(
  '/',
  [authJwt, check('name', 'Il Nome è richiesto').exists()],
  profileController.createProfile
);

/**
 * @route   GET /api/profile/:id
 * @desc    Ottiene un Profilo
 * @webpage /profile
 * @action  readProfile
 * @access  public
 */
router.get('/:id', profileController.readProfile);

/**
 * @route   PUT /api/profile
 * @desc    Modifica un Profilo
 * @webpage /profile
 * @action  updateProfile
 * @access  private
 */
router.put('/:id', authJwt, profileController.updateProfile);

/**
 * @route   DELETE /api/profile/:id
 * @desc    Cancellare un Profilo
 * @webpage /profile
 * @action  deleteProfile
 * @access  private
 */
router.delete('/:id', authJwt, profileController.deleteProfile);

module.exports = router;
