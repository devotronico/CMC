const express = require('express');
const controllers = require('../controllers/profiles-controllers');
const router = express.Router();

/// MIDDLEWARE
const authJwt = require('../middleware/auth-jwt');
const { check } = require('express-validator');

/**
 * @route   GET /api/profiles/test
 * @desc    TEST
 * @action  test
 * @access  public
 */
router.get(
  '/test',
  [
    authJwt,
    check('name', 'La Username è richiesta').not().isEmpty(),
    check('email', 'Includere una email valida').normalizeEmail().isEmail()
  ],
  controllers.test
);

/**
 * @route   GET /api/profiles/prova
 * @desc    Prova
 * @action  prova
 * @access  public
 */
router.get('/prova', authJwt, controllers.prova);

/**
 * @route   POST /api/profiles
 * @desc    Crea Profili
 * @webpage /profiles
 * @action  createProfile
 * @access  private
 */
router.post('/', authJwt, controllers.createProfiles);

/**
 * @route   POST /api/profiles/fake
 * @desc    Crea Profili Fake
 * @webpage /profiles/create
 * @action  createFakeProfiles
 * @access  private
 */
router.post('/fake', authJwt, controllers.createFakeProfiles);

/**
 * @route   GET /api/profiles
 * @desc    Ottiene i Profili
 * @webpage /profiles
 * @action  readProfiles
 * @access  public
 */
router.get('/', controllers.readProfiles);

/**
 * @route   GET /api/profiles/fake
 * @desc    Ottiene i Profili finti
 * @webpage /profiles
 * @action  readFakeProfiles
 * @access  public
 */
router.get('/fake', controllers.readFakeProfiles);

/**
 * @route   PUT /api/profiles
 * @desc    Modifica tutti i Profili
 * @webpage /profiles
 * @action  updateProfiles
 * @access  private
 */
router.put('/', authJwt, controllers.updateProfiles);

/**
 * @route   PUT /api/profiles/selected
 * @desc    Modifica i Profili selezionati
 * @webpage /profiles
 * @action  updateSelectedProfiles
 * @access  private
 */
router.put(
  '/selected',
  [
    authJwt,
    check('selected', 'Id dei profili sono richiesti').not().isEmpty(),
    check('prop', 'La proprietà da modificare è richiesta').not().isEmpty(),
    check('value', 'Includere il nuovo valore per la proprietà').not().isEmpty()
  ],
  controllers.updateSelectedProfiles
);

/**
 * @route   DELETE /api/profiles
 * @desc    Cancellare tutti i Profili
 * @webpage /profiles
 * @action  deleteProfiles
 * @access  private
 */
router.delete('/', authJwt, controllers.deleteProfiles);

/**
 * @route   DELETE /api/profiles/selected
 * @desc    Cancellare i Profili selezionati
 * @webpage /profiles
 * @action  deleteSelectedProfiles
 * @access  private
 */
router.delete(
  '/selected',
  [authJwt, check('selected', 'Id dei profili sono richiesti').not().isEmpty()],
  controllers.deleteSelectedProfiles
);

/**
 * @route   DELETE /api/profiles/fake
 * @desc    Cancellare i Profili fake
 * @webpage /profiles
 * @action  deleteFakeProfiles
 * @access  private
 */
router.delete('/fake', authJwt, controllers.deleteFakeProfiles);

module.exports = router;
