const Joi = require('joi');

const createLoan = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    repayment_month: Joi.number().required(),
    monthly_payment: Joi.number().required(),
  }),
};

module.exports = {
  createLoan,
};
