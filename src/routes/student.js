const express = require('express');
const { studentController } = require('../controller/index');
const authenticator = require('../middilewares/authenticator');
const router = express.Router();

// router.route('/signup')
// .post(authController.getAuthToken(r))
router.route('/info')
.get(studentController.getingStudentData);

router.route('/course')
.post(studentController.getStudents)
.get(studentController.getStudentsCourseList)

router.route('/')
.post(studentController.addstudent)
.get(studentController.getingStudentsData)
.put(studentController.updateStudentDetails)
.delete(studentController.deleteStudentInfo);

// router.route('/info').get(authenticator, userController.getUserInfo);

module.exports = router;

