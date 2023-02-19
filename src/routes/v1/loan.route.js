const express = require('express');
const { updateUserById } = require('../../services/user.service');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const loanValidation = require('../../validations/loan.validation');
const loanController = require('../../controllers/loan.controller');

const router = express.Router();

router.post('/set-user-as-admin', async (req, res) => {
  const { id } = req.body;
  const data = await updateUserById(id, {
    role: 'admin',
  });

  res.send(data);
});

router.post('/', auth(), validate(loanValidation.createLoan), loanController.addLoan);
router.get('/', auth(), validate(), loanController.getLoan);
router.patch('/:loanId', auth(), validate(loanValidation.createLoan), loanController.updateLoan);

module.exports = router;
