const Question = require('../models/Question');

exports.getTodayQuestion = async (req, res) => {
  const question = await Question.findOne({ where: { id: 1 } }); // example for fetching today's question
  res.send(question);
};
