const express = require("express");
const router = express.Router();
const db = require("../config/database");

// 오늘의 질문 라우트
router.get("/today-question", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 랜덤 질문 조회
  const randomQuestionQuery =
    "SELECT id, question FROM questions ORDER BY RAND() LIMIT 1";
  db.query(randomQuestionQuery, (err, questionResults) => {
    if (err) {
      console.error("SQL 쿼리 오류:", err);
      return res
        .status(500)
        .json({ message: "질문을 가져오는 도중 오류가 발생했습니다." });
    }

    if (questionResults.length > 0) {
      const question = questionResults[0];
      res.json(question);
    } else {
      res.json({ id: null, question: "질문을 가져올 수 없습니다." });
    }
  });
});

// 답변 저장 라우트
router.post("/save-answer", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { question_id, answer } = req.body;
  const answerDate = new Date().toISOString().slice(0, 10);
  const query =
    "INSERT INTO answers (user_id, question_id, answer, answer_date) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, question_id, answer, answerDate], (err, results) => {
    if (err) {
      console.error("SQL 쿼리 오류:", err);
      return res
        .status(500)
        .json({ message: "답변을 저장하는 도중 오류가 발생했습니다." });
    }
    res.json({ success: true });
  });
});

// 나의 기록 라우트
router.get("/my-records", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const query =
    "SELECT a.answer, q.question FROM answers a JOIN questions q ON a.question_id = q.id WHERE a.user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("SQL 쿼리 오류:", err);
      return res
        .status(500)
        .json({ message: "기록을 가져오는 도중 오류가 발생했습니다." });
    }
    res.json({ records: results });
  });
});

module.exports = router;
