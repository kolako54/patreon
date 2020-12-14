const express = require('express');
const { signUp, login } = require('../controllers/AuthControllers');

const router = express.Router();
router.route('/sign-up').post(signUp);
// router.route('/').get(getAllUsers);
router.route('/login').post(login);
module.exports = router;
