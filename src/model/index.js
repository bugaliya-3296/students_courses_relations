const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('test', 'root', 'Zaq123!@#!@#', {
    host: 'localhost',
    dialect: 'mysql' // | 'mariadb' | 'postgres' | 'mssql' */
  });
  (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;