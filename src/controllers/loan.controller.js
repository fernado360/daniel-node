const httpStatus = require('http-status');
const { userService } = require('../services');
const { emailService } = require('../services');
const logger = require('../config/logger');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const addLoan = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const message = `Good day ${user.first_name},
  <br>
  Your loan application of ${req.body.amount} was successful.
  <br>
  It is now under review for approval. Please check your dashboard for current status. 
  `;
  user.loans.push({ ...req.body, approved: false, status: 'PENDING_APPROVAL' });
  user.save();
  await emailService.sendLoanEmail(user.email, message).then((resp) => {
    logger.info('Email Sent');
    logger.info(resp);
  });
  await emailService.sendLoanEmail(user.email, message).then((resp) => {
    logger.info('Email Sent again');
    logger.info(resp);
  });
  res.send(user.loans);
});

const updateLoan = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userID);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // eslint-disable-next-line no-console

  const result = await user.loans.id(req.params.loanId);

  // const result = await user.loans.find((item) => item.id === req.params.loanId);
  // const resultIndex = await user.loans.findIndex((item) => item.id === req.params.loanId);
  const message = `Good day ${user.first_name},
  <br>
  Your loan application of ${req.body.amount} has been approved.
  <br>
  Please check your dashboard for more information. 
  `;
  if (result) {
    Object.assign(result, req.body);
    user.save();
    await emailService.sendLoanEmail(user.email, message).then((resp) => {
      logger.info('Email Sent');
      logger.info(resp);
    });
    await emailService.sendLoanEmail(user.email, message).then((resp) => {
      logger.info('Email Sent again');
      logger.info(resp);
    });
    res.send(user.loans);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loan not found');
  }
});

const getLoan = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  //   console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user.loans);
});

module.exports = {
  addLoan,
  updateLoan,
  getLoan,
};
