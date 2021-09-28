const jwt = require('jsonwebtoken');
const dbDataUser = require('../model/admin');
const bcrypt = require('bcryptjs');
const course = require('../model/course');
const classRoom = require('../model/classRoom');
const student = require('../model/student')

const userService = {
    getToken: (req) => {

        const user = {
            // id: req.id,
            phone: req,
            // mailId: req.mailId,
        }
        return jwt.sign(user, 'privateKey', { expiresIn: '1d' });
    },
    addNewCourse: async (req) => {
        try {
            let courseData = {};
            courseData.courseName = req.body.courseName;
            courseData.courseId = req.body.courseId;

            await course.create(courseData)
                .then(data => {
                    console.log(JSON.stringify(data));
                })
                .catch(err => {
                    return "Some error occurred while creating the Tutorial." + err;
                });
            courseData.message = 'course is added successfully';
            return courseData;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    getAllCourses: async (req) => {
        try {
            console.log('getting all user...');
            const result = await course.findAll();

            return result;

        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    updateCourseInfo: async (req) => {
        try {
            const courseId = req.query.courseId;
            let result = await course.findAll({ where: { courseId: courseId } });

            if (result.length < 1) {
                return ('User not found');
            }

            let courseData = {};
            courseData.courseName = req.body.courseName;
            courseData.courseId = req.body.courseId;

            result = await course.update(courseData, {
                where: {
                    courseId: courseId
                }
            });
            return courseData;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },

    deleteCourseDetails: async (req) => {
        try {
            const courseId = req.query.courseId;
            let result = await course.findAll({ where: { courseId: courseId } });

            if (result.length < 1) {
                return ('User not found');
            }
            
            await course.destroy({
                where: {
                    courseId: courseId
                }
            });
            return "user is deleted...!";
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    userInfo: async (req) => {
        try {
            const courseId = req.query.courseId;
            const result = await course.findAll({ where: { courseId: courseId } });

            if (result.length == 0) {
                return 'user not found';
            }
            return result;
        } catch (error) {
            console.log('----', error);
            throw Error(error);
        }
    },
    takeCourse: async (req) => {
        try {
            req = req.body;
            const mobile = req.studentDetails.mobile;
            let result = await student.findAll({ where: { mobile: mobile } });
            let objVal;
            if (result.length == 0) {
                return 'record not found, So please do register before involving in any course';
            }
            let newValues = [];
            for (let index = 0; index < req.courseDetails.length; index += 1) {
                let result = await course.findAll({ where: { courseId: `${req.courseDetails[index].courseId}` } });

                if (result.length == 0) {
                    return `invalid input: course name(${req.courseDetails[index].courseName}) or courseId(${req.courseDetails[index].courseId})`;
                } else {

                    let objVal = {
                        courseId: `${req.courseDetails[index].courseId}`,
                        mobile: `${mobile}`,
                        courseName: `${req.courseDetails[index].courseName}`,
                        studentName: `${req.studentDetails.fullName}`
                    }

                    newValues.push(objVal);
                }
            }
            let courseData = {};

            await classRoom.bulkCreate(newValues)

            courseData.message = 'course is added successfully';
            return courseData;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }


    },
    studentList: async (req) => {
        try {
            const courseId = req.query.courseId;
            let result = await course.findAll({ where: { courseId: courseId } });


            if (result.length == 0) {
                return 'course not found';
            }
            result = await classRoom.findAll({ where: { courseId: courseId } });

            return result;
        } catch (error) {
            console.log('----', error);
            throw Error(error);
        }
    },
}
module.exports = userService;