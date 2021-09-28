const jwt = require('jsonwebtoken');
const dbDataUser = require('../model/admin');
const bcrypt = require('bcryptjs');
const student = require('../model/student')
const course = require('../model/course');
const classRoom = require('../model/classRoom');

const userService = {
    getToken: (req) => {

        const user = {
            // id: req.id,
            phone: req,
            // mailId: req.mailId,
        }
        return jwt.sign(user, 'privateKey', { expiresIn: '1d' });
    },
    addNewStudent: async (req) => {
        try {
            const authHeader = req.get('Authorization');
            let userDetails = {};
            userDetails.studentName = req.body.fullName;
            userDetails.email = req.body.email;
            userDetails.mobile = req.body.mobile;
            userDetails.gender = req.body.gender;
            userDetails.address = req.body.address;

            await student.create(userDetails)
                .then(data => {
                    console.log(JSON.stringify(data));
                })
                .catch(err => {
                    console.log("Some error occurred while creating the Tutorial.", err)
                });
            userDetails.message = 'user is added successfully';
            return userDetails;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    getAllStudents: async (req) => {
        try {
            console.log('getting all user...')
            const usersData = await student.findAll();

            return usersData;

        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    updateStudentInfo: async (req) => {
        try {
            const mobileNumber = req.query.mobile;
            let result = await student.findAll({ where: { mobile: mobileNumber } });

            if (result.length < 1) {
                return ('User not found');
            }


            let userDetails = {};
            userDetails.studentName = req.body.fullName;
            userDetails.email = req.body.email;
            userDetails.mobile = req.body.mobile;
            userDetails.gender = req.body.gender;
            userDetails.address = req.body.address;

            result = await student.update(userDetails, {
                where: {
                    mobile: mobileNumber
                }
            });

            return result;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },

    deleteStudentDetails: async (req) => {
        try {
            const mobileNumber = req.query.mobile;


            let result = await student.findAll({ where: { mobile: mobileNumber } });

            if (result.length < 1) {
                return ('User not found');
            }
            await student.destroy({
                where: {
                    mobile: mobileNumber
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
            const mobileNumber = req.query.mobile;

            const result = await student.findAll({ where: { mobile: mobileNumber } });


            if (result.length == 0) {
                return 'user not found';
            }
            return result;
        } catch (error) {
            console.log('----', error);
            throw Error(error);
        }
    },
    getingStudents: async (req) => {
        try {
            req = req.body;
            const courseId = req.courseDetails.courseId;
            let result = await course.findAll({ where: { courseId: courseId } });

            if (result.length == 0) {
                return `record not found with course Id ${courseId}, So please pass a correct courseID`;
            }
            let newValues = [];
            for (let index = 0; index < req.studentDetails.length; index += 1) {
                let mobile = `${req.studentDetails[index].mobile}`;
                // [result, _] = await dbDataUser.execute(sql); //, function (err, result) {
                result = await student.findAll({ where: { mobile: mobile } });

                if (result.length == 0) {
                    return `record not found with mobile number ${courseId}, So please pass a correct courseID`;
                } else {

                    let objVal = {
                        courseId: courseId,
                        mobile: `${req.studentDetails[index].mobile}`,
                        courseName: `${req.courseDetails.courseName}`,
                        studentName: `${req.studentDetails[index].fullName}`
                    }

                    newValues.push(objVal);
                }
            }
            let userDetails = {};
            userDetails.studentId = req.courseDetails.mobile;
            userDetails.courseId = req.courseId;

            await classRoom.bulkCreate(newValues)

            userDetails.message = 'course is added successfully';
            return userDetails;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    courseList: async (req) => {
        try {
            const mobileNumber = req.query.mobile;

            let result = await student.findAll({ where: { mobile: mobileNumber } });


            if (result.length == 0) {
                return 'user not found';
            }
            result = await classRoom.findAll({ where: { mobile: mobileNumber } });

            return result;
        } catch (error) {
            console.log('----', error);
            throw Error(error);
        }
    },
}
module.exports = userService;