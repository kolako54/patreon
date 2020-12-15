const express = require('express');
const {
    signUp,
    login,
    forgotPassword,
} = require('../controllers/AuthControllers');

const router = express.Router();
router.route('/sign-up').post(signUp);
// router.route('/').get(getAllUsers);
router.route('/login').post(login);
router.route('/forgot-password').post(forgotPassword);
router.route('/resetpassword/:resetToken').post(forgotPassword);
module.exports = router;
