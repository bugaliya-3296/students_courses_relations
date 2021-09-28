


// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('./index')

// Define method takes two arrguments
// 1st - name of table
// 2nd - columns inside the table
const userNamePassword = sequelize.define('userNamePassword', {


	password: { type: Sequelize.STRING, allowNull:false },
	phone: { type: Sequelize.STRING, allowNull:false, primaryKey: true },

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
sequelize.sync()//({force: true}) 
module.exports = userNamePassword;
