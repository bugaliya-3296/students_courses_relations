// const authRoutes = require('./auth.route');
const userRoutes = require('./user');
const studentController = require('./studentController');
const courseController = require('./courseController');
const authController = require('./authController');

module.exports = {
    studentController,
    courseController,
    authController,
}