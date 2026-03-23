const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Roadmap = sequelize.define('Roadmap', {
  studentClass: {
    type: DataTypes.STRING,
    allowNull: false
  },
  interests: {
    type: DataTypes.JSON, // Use JSON for arrays in MySQL
    allowNull: false
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true
  },
  marks: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true // Allow null for anonymous roadmaps if needed, or false to force auth
  },
  aiSuggestions: {
    type: DataTypes.JSON, // Store the structured AI output here
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Roadmap;
