const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected (Local Instance)');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the local database:', error.message);
    console.log('Make sure MySQL is running and the "career_roadmap" database exists.');
  }
};

module.exports = { sequelize, connectDB };
