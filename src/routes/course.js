const express = require('express');
const { courseController } = require('../controller/index');
const authenticator = require('../middilewares/authenticator');
const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))
router.route('/info')
.get(authenticator, courseController.getingCourseData);

//registering for a course
router.route('/register')
.post(courseController.registerCourse)
.get(courseController.getCourseStudentList)


router.route('/')
.post(courseController.addCourse)
.get(courseController.getingCoursesData)
.put(courseController.updateCourseDetails)
.delete(courseController.deleteCourseInfo);

// router.route('/info').get(authenticator, userController.getUserInfo);

module.exports = router;

