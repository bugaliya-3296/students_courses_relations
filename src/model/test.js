
const classRoom = require('./classRoom');


let userDetails = {};
userDetails.courseId = 1;
userDetails.courseName = "maths";
userDetails.studentId = 2;

classRoom.create(userDetails)
.then(data => {
  console.log(JSON.stringify(data));
})
.catch(err => {
  console.log("Some error occurred while creating the Tutorial.", err)
  });
