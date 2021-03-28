const express = require('express');
const usersController = require('../controllers/users-controllers');
const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/fake', usersController.getfakeUsers);

router.post('/', usersController.createUsers);
router.post('/fake', usersController.createFakeUsers);

router.put('/', usersController.updateUsers);
router.put('/selected', usersController.updateSelectedUsers);

router.delete('/', usersController.deleteUsers);
router.delete('/selected', usersController.deleteSelectedUsers);
router.delete('/fake', usersController.deleteFakeUsers);
// router.delete('/all', auth, usersController.deleteAllUsers);

module.exports = router;
