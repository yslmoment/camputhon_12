const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Question = require('./Question');

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Answer.belongsTo(User);
Answer.belongsTo(Question);

module.exports = Answer;
