const express = require('express');
const authController = require('../controller/getTokenAuth');

const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))

router.route('/').post(authController.getAuthToken)

module.exports = router;

