const express = require('express');
const { createUser, getAllUsers } = require('../controllers/UserControllers');

const router = express.Router();
router.route('/sign-up').post(createUser);
router.route('/').get(getAllUsers);

module.exports = router;
