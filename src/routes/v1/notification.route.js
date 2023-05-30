const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router();
router.get('/', auth(), validate(), notificationController.getNotification);
router.post('/', auth(), validate(), notificationController.addNotification);
router.post('/:id', auth(), validate(), notificationController.addNotificationByAdmin);

module.exports = router;
