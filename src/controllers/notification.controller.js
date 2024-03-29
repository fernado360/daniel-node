const httpStatus = require('http-status');
const { userService } = require('../services');
const { emailService } = require('../services');
// const pick = require('../utils/pick');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const addNotification = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.notification.push({ ...req.body });
  user.save();
  await emailService.sendNotificationEmail(user.email, req.body.message).then((resp) => {
    logger.info('Email Sent');
    logger.info(resp);
  });
  await emailService.sendNotificationEmail(user.email, req.body.message).then((resp) => {
    logger.info('Email Sent again');
    logger.info(resp);
  });
  res.send(user.notification);
});
const addNotificationByAdmin = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.notification.push({ ...req.body });
  user.save();
  await emailService.sendNotificationEmail(user.email, req.body.message).then((resp) => {
    logger.info('Email Sent');
    logger.info(resp);
  });
  await emailService.sendNotificationEmail(user.email, req.body.message).then((resp) => {
    logger.info('Email Sent again');
    logger.info(resp);
  });
  res.send(user.notification);
});

const getNotification = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  //   console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user.notification);
});

module.exports = {
  addNotification,
  getNotification,
  addNotificationByAdmin,
};
