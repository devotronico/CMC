const express = require('express');
const logsController = require('../controllers/logs-controllers');
// const authJwt = require('../middleware/auth-jwt');
// const { check } = require('express-validator');
const router = express.Router();

/**
 * @route   GET /api/logs/test
 * @desc    TEST
 * @webpage /test
 * @action  test
 * @access  Private
 */
// router.get('/test', logsController.test);

/**
 * @route   POST /api/logs
 * @desc    Crea log finti
 * @webpage /logs
 * @action  createFakeLogs
 * @access  Private
 */
router.post('/fake', logsController.createFakeLogs);

/**
 * @route   GET /api/logs
 * @desc    Ottiene tutti i log
 * @webpage /logs
 * @action  getLogs
 * @access  Private
 */
router.get('/', logsController.getLogs);

/**
 * @route   GET /api/logs/:id
 * @desc    Ottiene un log
 * @webpage /logs
 * @action  getLog
 * @access  Private
 */
router.get('/:id', logsController.getLog);

/**
 * @route   DELETE /api/logs/fake
 * @desc    Cancella tutti i log finti
 * @webpage /logs
 * @action  deleteFakeLogs
 * @access  Private
 */
router.delete('/fake', logsController.deleteFakeLogs);

/**
 * @route   DELETE /api/logs/:id
 * @desc    Cancellare un log
 * @webpage /logs
 * @action  deleteLog
 * @access  Private
 */
router.delete('/:id', logsController.deleteLog);

/**
 * @route   DELETE /api/logs/
 * @desc    Cancella tutti i log
 * @webpage /logs
 * @action  deleteLogs
 * @access  Private
 */
router.delete('/', logsController.deleteLogs);

module.exports = router;
