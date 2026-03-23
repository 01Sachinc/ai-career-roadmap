const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.join(__dirname, '../ca.pem')).toString(),
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected (Aiven Cloud)');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
  }
};

module.exports = { sequelize, connectDB };
