const express = require('express');
// const userController = require('../controller/user');
const authenticator = require('../middilewares/authenticator');
const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))

router.route('/student')
.post(authenticator, userController.addUser)
.put(authenticator, userController.updateDetails)
.get(authenticator, userController.getingAllUserData)
.delete(authenticator, userController.deleteDetails);

router.route('/info').get(authenticator, userController.getUserInfo);

module.exports = router;

