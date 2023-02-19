const httpStatus = require('http-status');
const { userService } = require('../services');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const addLoan = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.loans.push(req.body);
  user.save();
  res.send(user.loans);
});

const updateLoan = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  //   console.log(user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await user.loans.id(req.params.loanId);
  Object.assign(result, req.body);
  user.save();
  res.send(user.loans);
});

module.exports = {
  addLoan,
  updateLoan,
};
