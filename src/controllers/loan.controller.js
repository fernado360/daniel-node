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
  user.loans.push({ ...req.body, approved: false, status: 'PENDING_APPROVAL' });
  user.save();
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

  if (result) {
    Object.assign(result, req.body);
    user.save();
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
