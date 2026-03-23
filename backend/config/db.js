const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected (Aiven Cloud - SSL Enabled)');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error.message);
  }
};

module.exports = { sequelize, connectDB };
