const express = require('express');
const { authController } = require('../controller/index');

const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))

router.route('/send/otp').post(authController.register)
router.route('/verify/otp').post(authController.logIn)
router.route('/token').post(authController.getAuthToken)

//router.route('/').post(authController.getAuthToken)

module.exports = router;

