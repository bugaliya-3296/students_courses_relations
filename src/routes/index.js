const express = require('express');
const authRoutes = require('./auth.route');
// const userRoutes = require('./user');
const studentRoutes = require('./student');
const courseRoutes = require('./course');
const router = express.Router();
const authenticator = require('../middilewares/authenticator');
 

router.use('/api/auth', authRoutes);
// router.use('/user/admin', userRoutes);
// router.use('/', userRoutes);
router.use('/api/student',authenticator, studentRoutes);
router.use('/api/course',authenticator, courseRoutes);

module.exports = router;