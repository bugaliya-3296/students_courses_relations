const express = require('express');
const userController = require('../controller/user');
const authenticator = require('../middilewares/authenticator');
const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))

router.route('/')
.post(authenticator, userController.addUser)
.put(authenticator, userController.updateDetails);

router.route('/info').get(authenticator, userController.getingAllUserData);
router.route('/info/:phone').get(authenticator, userController.getingAllUserData);

module.exports = router;

