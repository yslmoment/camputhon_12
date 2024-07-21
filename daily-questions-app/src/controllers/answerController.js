const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
  const { answer, questionId } = req.body;

  const newAnswer = new Answer({
    answer,
    QuestionId: questionId,
    UserId: req.user.id,
  });

  try {
    await newAnswer.save();
    res.send('Answer saved');
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserAnswers = async (req, res) => {
  const answers = await Answer.findAll({ where: { UserId: req.user.id } });
  res.send(answers);
};
