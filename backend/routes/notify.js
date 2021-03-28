const express = require('express');
const notifyController = require('../controllers/notify-controllers');
const router = express.Router();

router.post('/subscribe', notifyController.subscriptionToNotify);
router.post('/send', notifyController.sendNotify);
router.post('/click', notifyController.clickNotify);

module.exports = router;
