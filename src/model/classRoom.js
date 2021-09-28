// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('./index')

// Define method takes two arrguments
// 1st - name of table
// 2nd - columns inside the table
const classRoom = sequelize.define('classRoom', {

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	courseId:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		// To increment user_id automatically.
		// autoIncrement:true,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
		// defaultValue: 0
	},
	mobile:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.STRING(10),

		// To increment user_id automatically.
		// autoIncrement:true,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
		// defaultValue: 0
	},

	// Column-2, studentName
	courseName: { type: Sequelize.STRING, allowNull:false },
	studentName: { type: Sequelize.STRING, allowNull:false },


	// Column-4, default values for
	// dates => current time
	// myDate: { type: Sequelize.DATE,
	// 		defaultValue: Sequelize.NOW },

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
sequelize.sync()//({force: true}) 
module.exports = classRoom;
