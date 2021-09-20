const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/user/admin', userRoutes);
router.use('/users', userRoutes);

module.exports = router;