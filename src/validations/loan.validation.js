const Joi = require('joi');

const createLoan = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    repayment_month: Joi.number().required(),
    monthly_payment: Joi.number().required(),
  }),
};

const updateLoan = {
  body: Joi.object().keys({
    amount: Joi.number(),
    repayment_month: Joi.number(),
    monthly_payment: Joi.number(),
    approved: Joi.boolean(),
    status: Joi.string(),
  }),
};

module.exports = {
  createLoan,
  updateLoan,
};
