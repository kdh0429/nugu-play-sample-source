const express = require('express');
const nugu = require('../nugu');
const router = express.Router();

router.post(`/ThrowDiceAction`, nugu);
router.post(`/ThrowYesAction`, nugu);


module.exports = router;
